"use client";

import Image from "next/image"
import iot from "@/public/systemIntegration/hardware/iot.png"

export const HardwareContent = () => {
  return (
    <section className="w-full py-8">
      <div className="w-full px-3 sm:px-6 md:px-8 lg:max-w-[720px] lg:mx-auto">
        <div className="grid grid-cols-1 gap-6">

          {/* wrapper gambar: pastikan ukuran container sama dengan gambar */}
          <div className="mx-auto w-full max-w-[700px]">
            <div className="relative w-full h-[350px] overflow-hidden bg-amber-500 shadow-sm">
              <Image
                src={iot}
                alt="System Integration"
                fill
                sizes="(min-width:700px) 700px, 100vw"
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* teks, biarkan juga lebar sama dengan gambar */}
          <div className="mx-auto w-full max-w-[700px] text-center">
            <h1 className="text-3xl md:text-4xl font-semibold mb-2">IoT</h1>
            <div className="mx-auto w-24 h-0.5 rounded mb-4 bg-gray-200" />
            <p className="text-sm text-gray-700 leading-relaxed">
              At RDS, we go far beyond traditional document management to act as your ultimate
              IT-driven growth partner. By blending our deep-rooted expertise with cutting-edge
              technology, we’ve evolved to provide a vibrant suite of integrated solutions that
              turn complex data into seamless, high-energy workflows. We don’t just handle your
              files; we build the digital backbone your business needs to thrive.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
