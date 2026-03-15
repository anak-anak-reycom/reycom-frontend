"use client";
import Image from "next/image";
import card from "@/public/systemIntegration/hardware/image.png";

export default function HardwareContent() {
  return (

     <section className="w-full py-10">
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

                <div className="text-center mx-auto max-w-[700px]">
                    <div className="mx-auto w-24 h-0.5 rounded mb-1 bg-gray-300" />
                    <h2 className="text-3xl pt-5 font-bold mb-4 font-sans">IOT</h2>
                        <p className="text-sm text-gray-700 leading-relaxed font-sans">
                         Nowadays digital transformation is encouraging more organizations to adopt initiatives driven by the Internet of Things (IoT). with the IoT,
                          we can monitor and control devices and objects with built-in sensors are connected to an Internet of Things platform, which integrates data
                           from the different devices and applies analytics to share the most valuable information with applications built to address specific needs.
                            We provide IoT solutions for the water sensor that can provide information about pH, turbidity, dissolved oxygen, salinity, etc. we also 
                            have an IoT solution for the modern meeting room, smart city, etc</p>
                </div>


                
            </div>
        </div>

    </section>

  )}