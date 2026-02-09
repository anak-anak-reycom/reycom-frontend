"use client";

import Image from "next/image";
import printing1 from "../../../public/printing1.png";
import printing2 from "../../../public/printing2.png";

export default function PrintingServicesPage() {
  return (
    <section className="py-10">
      <div className="max-w-[1400px] mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2  items-center">
          {/* Gambar Kiri */}
          <div className="py-5 px-5 rounded-[20px]  flex justify-start">
            <div className="w-full max-w-[500px]">
              <Image
                src={printing1}
                alt="Printing 1"
                width={500}
                height={300}
              
              />
            </div>
          </div>

          {/* Gambar Kanan */}
          <div className="py-5 px-5 rounded-[20px]  flex justify-end">
            <div className="w-full max-w-[500px]">
              <Image
                src={printing2}
                alt="Printing 2"
                width={500}
                height={300}
              
              />
            </div>
          </div>
        </div>

         <h2 className="text-3xl font-semibold mt-16">
          Printing and Creative Services
        </h2>
      </div>
    </section>
  );
}
