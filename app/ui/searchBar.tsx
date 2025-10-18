'use client';

import Image from "next/image"
import { useDebouncedCallback } from "use-debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import troopData from '@/assets/troops';
import { useState } from "react";

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

export default function SearchBar() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const params = new URLSearchParams(searchParams);

    const handleSearch = useDebouncedCallback((term : string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (term) {
        params.set('query', term);
    } else {
        params.delete('query');
    }

    console.log("TERM: ", term);

    replace(`${pathname}?${params.toString()}`);
    }, 200);

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

    const [inputText, setInputText] = useState("");
    
    return (
        <div className="relative">
            <div className="bg-[#d1d0c5] rounded-xl">
                <input className="p-5 w-[400px] placeholder:text-[#2c2e31] placeholder:opacity-[0.8] text-[#2c2e31] focus:border-none"
                type="text"
                placeholder="Search any troop..."
                onChange={(e) => {
                    handleSearch(e.target.value);
                    setInputText(e.target.value);
                }} />
                {/* <button className=""> </button> */}
            </div>

            {inputText.length != 0 && parsedTroops.filter((troop) => troop.troop_name.toLowerCase().includes(inputText.toLowerCase())).length != 0 ?
                <div className="border-[3px] border-solid border-red-500 pr-5 pl-2 h-78 overflow-y-scroll custom-scrollbar mt-5 bg-[#d1d0c5] rounded-2xl absolute top-[167%] left-[0%] w-100">
                    {parsedTroops.filter((troop) => troop.troop_name.toLowerCase().includes(inputText.toLowerCase())).map((troop) => {
                        return (
                            <button key={troop.troop_name} className="block hover:opacity-[0.7] hover:cursor-pointer select-none pl-2 pr-2 pt-5 pb-5">
                                <Image src={"/troop_icons/" + troop.troop_name.toLowerCase().replace(/ /g, "_") + ".png"} alt={"Temp"} width={60} height={70}
                                className="inline mr-5 border-[2px] border-white rounded-xl"/>
                                <p className="text-[#2c2e31] inline">{troop.troop_name.includes("Pekka") ? troop.troop_name.substring(0, troop.troop_name.indexOf("Pekka")) + "P.E.K.K.A.": troop.troop_name}</p>
                            </button>
                        )
                    })}
                </div>
            : ""}
        </div>
    )
}