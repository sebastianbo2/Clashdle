'use client';

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { useState } from "react";
import Image from "next/image";
import troopData from "@/assets/troops";

interface TroopData {
    troop_name: string,
    category: string,
    preferred_target: string,
    attack_type: string,
    housing_space: number,
    movement_speed: number,
    attack_speed: number,
    range: number,
}

export default function GuessDisplay(Props: { inputText: string, onClear: Function }) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const params = new URLSearchParams(searchParams);

    const inputText = Props.inputText

    const lines: string[] = troopData.trim().split('\n');
    const headers: string[] = lines[0].split(',');

    const parsedTroops: TroopData[] = lines.slice(1).map((line: string) => {
        const values: string[] = line.split(',');

        return {
            troop_name: values[headers.findIndex(header => header === "troop_name")],
            category: values[headers.findIndex(header => header === "category")],
            preferred_target: values[headers.findIndex(header => header === "preferred_target")],
            attack_type: values[headers.findIndex(header => header === "attack_type")],
            housing_space: Number.parseFloat(values[headers.findIndex(header => header === "housing_space")]),
            movement_speed: Number.parseFloat(values[headers.findIndex(header => header === "movement_speed")]),
            attack_speed: Number.parseFloat(values[headers.findIndex(header => header === "attack_speed")]),
            range: Number.parseFloat(values[headers.findIndex(header => header === "range")]),
        }
    });

    const originalNames = ["troop_name", "category", "preferred_target", "attack_type", "housing_space", "movement_speed", "attack_speed", "range"]
    const convertedNames = ["Troop", "Category", "Target Priority", "Attack Type", "Housing Space", "Movement Speed", "Attack Speed", "Range"]

    const [guesses, setGuesses] = useState<TroopData[]>([]);

    const handleSubmission = (troop: TroopData) => {
        setGuesses(prev => [...prev, troop]);
        const params = new URLSearchParams(searchParams.toString());

        params.delete('query');

        replace(`${pathname}?${params.toString()}`);
    }

    return (
        <div>
            {inputText.length != 0 && parsedTroops.filter((troop: TroopData) => troop.troop_name.toLowerCase().includes(inputText.toLowerCase())).length != 0 &&
                <div className="border-[3px] border-solid border-red-500 pr-5 pl-2 h-78 overflow-y-scroll custom-scrollbar mt-5 bg-[#d1d0c5] rounded-2xl absolute left-[40%] w-[20%]">
                    {parsedTroops.filter((troop: TroopData) => troop.troop_name.toLowerCase().includes(inputText.toLowerCase())).map((troop) => {
                        return (
                            <button key={troop.troop_name} className="block hover:opacity-[0.7] hover:cursor-pointer select-none pl-2 pr-2 pt-5 pb-5"
                             onClick={() => {
                                handleSubmission(troop);
                                Props.onClear();
                                }}>
                                <Image src={"/troop_icons/" + troop.troop_name.toLowerCase().replace(/ /g, "_") + ".png"} alt={"Temp"} width={60} height={70}
                                className="inline mr-5 border-[2px] border-white rounded-xl"/>
                                <p className="text-[#2c2e31] inline">{troop.troop_name.includes("Pekka") ? troop.troop_name.substring(0, troop.troop_name.indexOf("Pekka")) + "P.E.K.K.A.": troop.troop_name}</p>
                            </button>
                        )
                    })}
                </div>
            }

            <div className="border-[2px] border-white mt-15 flex flex-row">
                {convertedNames.map((name) => {
                return (
                    <div key={name} className="flex flex-col m-5 text-wrap w-[130px] text-center border-b-white border-b-[3px] pl-3 pr-3 text-[16px] h-[67px] justify-center">
                    <p className="align-bottom text-center">{name}</p>
                    </div>
                )
                })}
            </div>

            {guesses.map((guess) => {
                return (
                    <div className="border-[2px] border-white mt-5">
                        {guess.troop_name}
                    </div>
                )
            })}
        </div>
    )
}