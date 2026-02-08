"use client";
import Image from "next/image";
import card from "@/public/systemIntegration/ai/ai.png";

export default function CardAi() {
  return (

     <section className="w-full">
        <div className="max-w-[1000px] mx-auto">
            <div className="grid grid-cols-1 gap-3">

                <div className="mx-auto w-full flex justify-center">
                    <div className="relative w-full mx-auto max-w-[720px]">
                        <Image
                        src={card}
                        alt="storage"
                        width={700}
                        height={400}
                        className="rounded-3xl shadow-2xl object-cover w-full h-auto"
                        priority
                        sizes="(min-width:1024px) 700px, 100vw"
                        />
                    </div>
                </div>

                <div className="text-center mx-auto max-w-[700px] pt-5 ">
                    <div className="mx-auto w-24 h-0.5 rounded mb-1 bg-gray-300" />
            
                        <p className="text-sm text-gray-700 leading-relaxed">
                        When you hear the term “artificial intelligence” or “AI,” however, it’s more likely you have visions of Skynet and the rise of our inevitable robot overlords.
                        </p>
                        <p className="pt-5">But, the truth of artificial intelligence and particularly machine learning is far less sinister, and it’s actually not something of the far-off future. It’s here today, and it’s shaping and simplifying the way we live, work, travel and communicate. RDS is one of the AI & machine learning solution provider especially to optimize corporate doing the business as usual</p>

                </div>


                
            </div>
        </div>

    </section>

  )}