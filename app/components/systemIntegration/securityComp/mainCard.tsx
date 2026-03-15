"use client";

import Image from "next/image";
import card from "@/public/systemIntegration/security/security.png";


export default function CardSecurityComp() {
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
                    <div className="mx-auto w-24 h-0.5 rounded mb-5 bg-gray-300" />
            
                        <p className="text-lg text-gray-700 leading-relaxed font-sans" >
                        Storage is important think on the component of the infrastructure, storage will support your system on the complete lifecycle of data, same as another technology storage had evolution from the old version until modern version, following the technology update we provide comprehensive storage: All-flash system, Hybrid disk and flash storage arrays, Tape Storage
                        </p>

                </div>


                
            </div>
        </div>

    </section>


    )
}