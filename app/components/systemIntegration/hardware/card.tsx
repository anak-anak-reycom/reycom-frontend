"use client";

import Image from "next/image"
import iot from "@/public/systemIntegration/hardware/iot.png"


 export const HardwareContent = () => {
    return (
    <section className="w-full py-12">
      <div className="max-w-[720px] mx-auto px-6">
        <div className="grid grid-cols-1 gap-8">

         
          <div className="relative rounded-xl overflow-hidden p-4">
            <div className="rounded-lg overflow-hidden bg-white">
              <Image
                src={iot}
                alt="System Integration"
                width={700}
                height={420}
                className="w-full h-auto object-cover rounded-lg"
                priority
              />
            </div>
          </div>

          
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-semibold mb-2">IoT</h1>
            <div className="mx-auto w-24 h-0.5 rounded mb-4" />
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

    )
}
