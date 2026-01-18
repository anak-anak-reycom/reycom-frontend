"use client";

import Image from "next/image";
import marketShare from "../../../public/marketShare.png"

export default function CoverageMap() {
  return (
    <section className="w-full py-24 bg-white">
      <div className="max-w-[1400px] mx-auto px-6">

        
        <h2 className="text-3xl md:text-4xl font-semibold text-center mb-14">
          Coverage Area & Market Share
        </h2>

        
        <div className="flex justify-center">
          <div className="relative w-full max-w-[900px]">
            <Image
              src={marketShare}
              alt="Coverage Area Map"
              width={900}
              height={500}
              className="w-full h-auto"
              priority
            />
          </div>
        </div>

      </div>
    </section>
  );
}
