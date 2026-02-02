// app/components/system/SystemIntegration.tsx
"use client";

import Image from "next/image";
import image1 from "@/public/systemIntegration/gettinStarted/systemInt.png"
import image2 from "@/public/systemIntegration/gettinStarted/bion.png"



export default function SystemIntegration() {
  return (
    <section className="w-full py-12">
      <div className="max-w-[720px] mx-auto px-6">
        <div className="grid grid-cols-1 gap-8">

          {/* TOP IMAGE */}
          <div className="relative rounded-xl overflow-hidden border-2 border-[#3b8ed6] p-4">
            <div className="rounded-lg overflow-hidden bg-white">
              <Image
                src={image1}
                alt="System Integration"
                width={700}
                height={420}
                className="w-full h-auto object-cover rounded-lg"
                priority
              />
            </div>
          </div>

          {/* TITLE */}
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-semibold mb-2">System Integration</h1>
            <div className="mx-auto w-24 h-0.5 bg-[#3b8ed6] rounded mb-4" />
            <p className="text-sm text-gray-700 leading-relaxed">
              At RDS, we go far beyond traditional document management to act as your ultimate
              IT-driven growth partner. By blending our deep-rooted expertise with cutting-edge
              technology, we’ve evolved to provide a vibrant suite of integrated solutions that
              turn complex data into seamless, high-energy workflows. We don’t just handle your
              files; we build the digital backbone your business needs to thrive.
            </p>
          </div>

          {/* SUB-SECTION: RDS System Integrator + LOGO */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-xl font-semibold mb-4">RDS System Integrator</h2>

            <div className="flex flex-col items-center gap-6">
              <div className="w-[180px] h-[120px] rounded-lg overflow-hidden border-2 border-dashed border-[#cfdff0] flex items-center justify-center bg-white p-3">
                <Image
                  src={image2}
                  alt="BION logo"
                  width={160}
                  height={100}
                  className="object-contain"
                  priority
                />
              </div>

              <p className="text-sm text-gray-700 leading-relaxed text-center">
                BION — RDS System Integrator is present as the business focus of the RDS Group
                to provide comprehensive information technology–based services armed with
                experience in several industries, such as insurance, banking, government
                institutions, encouraging BION to provide innovative solutions that are
                continuously updated along with technological developments.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
