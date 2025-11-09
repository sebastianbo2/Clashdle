"use client";

import Image from "next/image";
import SearchBar from "./ui/searchBar";
import GuessDisplay from "./ui/guessDisplay";
import { useState } from "react";
import { Suspense } from "react";

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const handleClear = () => setInputValue("");

  return (
    <div className="h-screen bg-[url('/clashdle_bg.png')] bg-cover bg-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-[#0e0e0e]/72"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center h-full text-white p-10 text-[#e2b714] overflow-y-scroll pb-50">
        <h1 className="text-5xl text-[#e2b714] font-bold">
          Clashdle - Clash of Clans
        </h1>
        <h3 className="mt-4 text-[#d1d0c5] text-lg mb-20">
          Guess today's Clash of Clans troop!
        </h3>

        <SearchBar value={inputValue} onChange={setInputValue} />

        <Suspense fallback={<div>Loading...</div>}>
          <GuessDisplay inputText={inputValue} onClear={handleClear} />
        </Suspense>
      </div>
    </div>
  );
}
