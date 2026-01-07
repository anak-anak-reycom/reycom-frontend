"use client";

import Masonary from "../masonarygrid/masonaryGrid";

const Hero = () => {
  return (
    <section className="w-full">
      <div className="max-w-[1400px] grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div className="mb-">
          <h1 className="text-[68px] font-semibold font-sans text-black mb-6">
            Your Vault of <br /> Confidentiality
          </h1>
          <p className="text-black mb-4 font-sans text-[16px] font-medium">The fortress for your secrets.</p>

          <p className="text-gray-700 font-sans text-[16px] mb-4">
            Control who sees what. Track every move. Lock it down.
            Because trust is silent, secure, and total.
          </p>
          <p className="text-black text-[16px] font-sans font-medium mb-6">
            Contact us today—before your private word leaves your hands.
          </p>

          <button className="border-3 text-black font-sans border-[#456882] px-6 py-2 rounded-3xl hover:bg-black hover:text-white transition">
            Contact Us
          </button>
        </div>
          <Masonary/>
      </div>
    </section>
  );
};

export default Hero;
