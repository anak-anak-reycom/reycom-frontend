"use client";

import Image from "next/image";
import card from "@/public/systemIntegration/server/mainimg.png";

export default function CardServer() {
  return (
    <section className="w-full py-12">
      <div className="max-w-[1000px] mx-auto">
        <div className="grid grid-cols-1 gap-3">

          {/* wrapper yang ukurannya persis gambar */}
          <div className="mx-auto w-full flex justify-center">
            <div className="relative w-full mx-auto max-w-[720px]">
            <Image
              src={card}
              alt="System Integration"
              width={700}
              height={400}
              className="rounded-3xl shadow-2xl object-cover w-full h-auto"
              priority
              sizes="(min-width:1024px) 700px, 100vw"
            />
            </div>
          </div>

          
          <div className="text-center mx-auto max-w-[700px]">
            <div className="mx-auto w-24 h-0.5 rounded mb-1 bg-gray-300" />
            <p className="text-sm text-gray-700 leading-relaxed font-sans">
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
