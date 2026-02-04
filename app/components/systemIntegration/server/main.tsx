"use client"

import Image from "next/image"
import card from "@/public/systemIntegration/server/mainimg.png"

export default function CardServer () {
    return (

    <section className="w-full py-12">
      <div className="max-w-[720px] mx-auto px-6">
        <div className="grid grid-cols-1 gap-1">

          <div className="relative rounded-xl overflow-hidden p-1">
            <div className="rounded-lg overflow-hidden bg-amber-200">
              <Image
                src={card}
                alt="System Integration"
                width={700}
                height={420}
                className="w-full h-auto object-cover rounded-lg"
                priority
              />
            </div>
          </div>

          <div className="text-center">
            <div className="mx-auto w-24 h-0.5 rounded mb-1" />
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
