"use client";

import Image from "next/image";
import test from "../../public/test.jpg";

export default function CompanyHero() {
  return (
    <section className="w-full py-24">
      <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-16 items-center">

        {/* LEFT TEXT */}
        <div>
          <h1 className="text-[64px] font-serif font-bold leading-none mb-6">
            ABOUT <br /> US
          </h1>

          <div>
            <h3 className="font-semibold mb-2">Vision</h3>
            <p className="text-sm text-gray-700 max-w-xs">
              To be the Best Document Solution Provider in Asia
            </p>
          </div>
        </div>

        {/* CENTER IMAGE */}
        <div className="rounded-2xl overflow-hidden">
          <Image
            src={test}
            alt="About Us"
            className="object-cover w-full h-full"
          />
        </div>

        {/* RIGHT CARD */}
        <div className="bg-[#234b68] text-white rounded-2xl p-6">
          <h3 className="font-semibold mb-2">Mission</h3>
          <p className="text-sm leading-relaxed">
            Peace of mind <br />
            Cost efficiency <br />
            Productivity
          </p>
        </div>

      </div>
    </section>
  );
}
