"use client"

import Image from "next/image"
import test from "@/app/public/test.jpg"

interface CompanyHeroProps {
  imageSrc: string
  imageAlt?: string
  title: string
  description: string
}

export default function CompanyHero({ imageSrc, imageAlt = "Company", title, description }: CompanyHeroProps) {
  return (
    <section className="w-full py-12 px-4 md:px-8">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
        {/* Left Image*/}
        <div className="flex justify-center md:justify-start">
          <div className="relative w-full max-w-sm">
            <Image
              src={test}
              alt={imageAlt}
              width={400}
              height={400}
              className="rounded-3xl shadow-2xl object-cover w-full h-auto"
              priority
            />
          </div>
        </div>

        {/*  Text */}
        <div className="flex flex-col justify-center space-y-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{title}</h1>
            <p className="text-lg text-gray-600 leading-relaxed">{description}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
