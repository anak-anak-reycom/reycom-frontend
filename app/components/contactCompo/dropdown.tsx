"use client";

import React, { useState } from "react";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import Image from "next/image";
import { StaticImageData } from "next/image";
import inonesia from "../../../public/country/indo.png";
import vietnam from "../../../public/country/viet.png";
import singapore from "../../../public/country/sngpore.png";



type BranchKey = "indonesia" | "singapore" | "vietnam" | null;

const BRANCHES = [
  {
    key: "indonesia",
    flag: inonesia,
    title: { highlight: "Indonesian", normal: "Branch" },
    locations: [
      {
        title: "Headquarter",
        address:
          "Jl. Cempaka. No.77 KM38, Kel. Jatimulya, Kec. Tambun Sel., Kabupaten Bekasi, Jawa Barat 17510",
        phone: "(62-21) 3831 9999",
        
        mapEmbed:
          "https://www.google.com/maps?q=Jl.+Cempaka+No.77+Bekasi&output=embed",
      },
      {
        title: "Office 2",
        address:
          "Jl. Contoh No.2, Kec. Contoh, Kota Contoh, Jawa Barat 17100",
        phone: "(62-21) 3831 1111",
        mapEmbed:
          "https://www.google.com/maps?q=Jalan+Contoh+Bekasi&output=embed",
      },
    ],
  },
  {
    key: "singapore",
    flag: singapore,
    title: { highlight: "Singapore", normal: "Branch" },
    locations: [
      {
        title: "Singapore Office",
        address: "10 Example Street, #01-01, Singapore 010101",
        phone: "+65 6123 4567",
        mapEmbed: "https://www.google.com/maps?q=Singapore&output=embed",
      },
    ],
  },
  {
    key: "vietnam",
    flag: vietnam,
    title: { highlight: "Vietnam", normal: "Branch" },
    locations: [
      {
        title: "Vietnam Office",
        address: "123 Example Rd, Ho Chi Minh City, Vietnam 700000",
        phone: "+84 28 1234 5678",
        mapEmbed: "https://www.google.com/maps?q=Ho+Chi+Minh+City&output=embed",
      },
    ],
  },
];

export default function BranchDropdown() {
  const [open, setOpen] = useState<BranchKey>(null);

  const toggle = (key: BranchKey) => {
    setOpen((prev) => (prev === key ? null : key));
  };

  return (
    <section className="w-full py-12">
      <div className="max-w-[1200px] mx-auto space-y-4 px-4">
        {BRANCHES.map((b) => (
          <BranchPanel
            key={b.key}
            id={b.key}
            flagSrc={b.flag}
            titleHighlight={b.title.highlight}
            titleNormal={b.title.normal}
            isOpen={open === (b.key as BranchKey)}
            onToggle={() => toggle(b.key as BranchKey)}
            locations={b.locations}
          />
        ))}
      </div>
    </section>
  );
}

/* ---------- BranchPanel ---------- */
function BranchPanel({
  id,
  flagSrc,
  titleHighlight,
  titleNormal,
  isOpen,
  onToggle,
  locations,
}: {
  id: string;
  flagSrc: StaticImageData;
  titleHighlight: string;
  titleNormal: string;
  isOpen: boolean;
  onToggle: () => void;
  locations: {
    title: string;
    address: string;
    phone: string;
    mapEmbed?: string;
  }[];
}) {
  return (
    <div className="rounded-2xl bg-gray-100 overflow-hidden border border-gray-200">
        <button
            type="button"
            aria-expanded={isOpen}
            aria-controls={`branch-${id}`}
            onClick={onToggle}
            className="w-full flex items-center px-6 py-4 text-lg font-medium focus:outline-none"
            >
            
            <div className="w-10 h-10 relative mr-4 flex-shrink-0">
                <Image src={flagSrc} alt={`${titleHighlight} flag`} fill style={{ objectFit: "contain" }} />
            </div>

            <h3 className="flex-1 text-center text-xl font-semibold">
                <span className="text-red-600">{titleHighlight}</span>{" "}
                <span className="text-black">{titleNormal}</span>
            </h3>

            <span className="text-gray-600 ml-4 flex-shrink-0" aria-hidden>
                {isOpen ? <UpOutlined /> : <DownOutlined />}
            </span>
        </button>

      <div
        id={`branch-${id}`}
        role="region"
        aria-labelledby={id}
        className={`px-6 overflow-hidden transition-[max-height,opacity,padding] duration-300 ease-in-out ${
          isOpen ? "max-h-[1200px] opacity-100 py-6" : "max-h-0 opacity-0 py-0"
        }`}
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            
            {titleHighlight} branch locations — click a card for details or use the contact phone to reach the office.
          </p>

          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {locations.map((loc, idx) => (
              <article
                key={idx}
                className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex flex-col"
              >
                <h4 className="text-lg font-semibold mb-2">{loc.title}</h4>
                <p className="text-sm text-gray-700 mb-3 leading-relaxed">{loc.address}</p>

                <p className="text-sm font-semibold mb-3">Phone : <span className="font-normal">{loc.phone}</span></p>

                
                {loc.mapEmbed ? (
                  <div className="mt-auto">
                    <div className="w-full rounded-md overflow-hidden border">
                      <iframe
                        title={`${loc.title} map`}
                        src={loc.mapEmbed}
                        className="w-full h-36"
                        loading="lazy"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="mt-auto h-36 rounded-md bg-gray-50 border border-dashed border-gray-200 flex items-center justify-center text-xs text-gray-400">
                    Map preview not available
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
