 "use client";
 
import {useState} from "react";
import Link from "next/link";
import Image from "next/image";


const NAV_ITEMS = [
  { label: "Home" },
  { label: "TheCompany" },
  { label: "News" },
  { label: "Career" },
  { label: "Line" },
];

 export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <header className="w-full sticky top-0 bg-white backdrop-blur border-b border-gray-200">
        <div className= "max-w-[1200px] mx-auto flex justify-between items-center p-4">   
          <div className="">

          </div>

        </div>
      </header>
    );
}