"use client";

import Image from "next/image";
import card from "@/public/systemIntegration/businessApp/businessApp.png";

export default function CardBusiness() {
  return (
    <section className="w-full py-10">
        <div className="max-w-[1000px] mx-auto">
            <div className="grid grid-cols-1 gap-3">

                <div className="mx-auto w-full flex justify-center">
                    <div className="relative w-full mx-auto max-w-[740px]">
                        <Image
                        src={card}
                        alt="storage"
                        width={740}
                        height={400}
                        className="rounded-3xl shadow-2xl object-cover w-full h-auto"
                        priority
                        sizes="(min-width:1024px) 740px, 100vw"
                        />
                    </div>
                </div>

                <div className="text-center mx-auto max-w-[700px]">
                    <div className="mx-auto w-24 h-0.5 rounded mb-1 bg-gray-300" />
            
                        <p className="text-sm text-gray-700 leading-relaxed">
                        Peripheral as an auxiliary device that gives a computer additional functionality, peripheral will enhance your user’s experience, we provide kind of peripheral: Scanner, Large Format Scanner, Printer, Multifunction Printer, Projector, E-KTP Reader, Video Conference System, AllinOne PC, CCTV, Interactive Panel, etc
                        </p>

                </div>


                
            </div>
        </div>

    </section>
  )};
            
