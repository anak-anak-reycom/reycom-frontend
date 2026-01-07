"use client";

import Image from "next/image";
import test from "../../public/test.jpg";

const Hero = () => {
  return (
    <section className="w-full py-20">
      <div className="max-w-[1400px] mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

        {/* TEXT KIRI */}
        <div className="mb-">
          <h1 className="text-4xl lg:text-5xl font-bold text-black mb-6 leading-tight">
            Your Vault of <br /> Confidentiality
          </h1>

          <p className="text-gray-700 mb-4">The fortress for your secrets.</p>

          <p className="text-gray-700 mb-4">
            Control who sees what. Track every move. Lock it down.
            Because trust is silent, secure, and total.
          </p>

          <p className="text-gray-700 mb-6">
            Contact us today—before your private word leaves your hands.
          </p>

          <button className="border text-black border-black px-6 py-2 rounded-full hover:bg-black hover:text-white transition">
            Contact Us
          </button>
        </div>

              {/* IMAGE GRID KANAN */}
        <div className="grid grid-cols-2 grid-rows-2 gap-4
                        min-h-[300px] lg:min-h-[360px]">
          
          <div className="relative rounded-xl overflow-hidden">
            <Image src={test} alt="image 1" fill className="object-cover" />
          </div>

          <div className="relative rounded-xl overflow-hidden row-span-2">
            <Image src={test} alt="image big" fill className="object-cover" />
          </div>

          <div className="relative rounded-xl overflow-hidden">
            <Image src={test} alt="image 2" fill className="object-cover" />
          </div>
        </div>


      </div>
    </section>
  );
};

export default Hero;
