"use client";

import image1 from "@/public/systemIntegration/server/card1.png";
import image2 from "@/public/systemIntegration/server/card2.png";
import Image from "next/image";

export default function DualCardServer() {
  return (
    <section className="py-16">
      <div className="max-w-720px] mx-auto px-6">

        {/* GRID 2 KOLOM */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

          {/* CARD 1 */}
          <div className="bg-white rounded-[20px] shadow-md p-6 text-center">

            <div className="rounded-[15px] overflow-hidden mb-5">
              <Image
                src={image1}
                alt="Business Server"
                width={500}
                height={300}
                className="w-full object-cover"
              />
            </div>

            <h2 className="text-xl font-bold mb-3">
              Business Server
            </h2>

            <p className="text-sm text-gray-600 leading-relaxed">
              This machine designed from small, medium to high business
              environment, this machine will be more powerful to support
              your business, with kind of feature like hardware redundancy
              such as dual power supplies, RAID disk system, ECC memory, etc.
            </p>

          </div>


          {/* CARD 2 */}
          <div className="bg-white rounded-[20px] shadow-md p-6 text-center">

            <div className="rounded-[15px] overflow-hidden mb-5">
              <Image
                src={image2}
                alt="Hyper Converged"
                width={500}
                height={300}
                className="w-full object-cover"
              />
            </div>

            <h2 className="text-xl font-bold mb-3">
              Hyper Converged Infrastructure
            </h2>

            <p className="text-sm text-gray-600 leading-relaxed">
              This machine designed from small, medium to high business
              environment, this machine will be more powerful to support
              your business, with kind of feature like hardware redundancy
              such as dual power supplies, RAID disk system, ECC memory, etc.
            </p>

          </div>

        </div>

      </div>
    </section>
  );
}
