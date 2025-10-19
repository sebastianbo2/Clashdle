'use client';

import Image from "next/image"
import { useDebouncedCallback } from "use-debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import troopData from '@/assets/troops';
import { useEffect, useState, useMemo } from "react";

interface SearchBarProps {
    submitFunction: Function,
}

export default function SearchBar(Props: { value: string, onChange: Function }) {
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
    }, 0);

    return (
        <div className="relative">
            <div className="bg-[#d1d0c5] rounded-xl">
                <input className="p-5 w-[400px] placeholder:text-[#2c2e31] placeholder:opacity-[0.8] text-[#2c2e31] focus:border-none"
                type="text"
                placeholder="Search any troop..."
                onChange={(e) => {
                    handleSearch(e.target.value);
                    Props.onChange(e.target.value);
                }} 
                value={Props.value}/>
                {/* <button className=""> </button> */}
            </div>
        </div>
    )
}