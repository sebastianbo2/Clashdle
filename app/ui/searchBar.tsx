import Image from "next/image"

export default function SearchBar() {
    return (
        <div className="bg-[#d1d0c5] rounded-xl">
            <input className="p-5 w-[400px] placeholder:text-[#2c2e31] placeholder:opacity-[0.8] text-[#2c2e31] focus:border-none" type="text" placeholder="Search any troop..."/>
            {/* <button className=""> </button> */}
        </div>
    )
}