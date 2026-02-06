"use client";
import Image from "next/image";
import card from "@/public/systemIntegration/experience/customerx.png";

export default function CardExperience() {
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

                <div className="text-center mx-auto max-w-[700px]">
                    <div className="mx-auto w-24 h-0.5 rounded mb-1 bg-gray-300" />
            
                        <p className="text-sm text-gray-700 leading-relaxed">
                        Today’s customers demand personalized, relevant communications that are available in real-time and accessible through the channel of their choice.
The Customer Experience software allows organizations to deploy a new approach to information exchange thereby improving the ability to maintain relationships with customers and other stakeholders. By using the software, messages disseminated are no longer generic but tailored according to customers’ needs and specific platforms (Web, email, SMS, print] and devices (mobile, laptop, tablet, PC).
                        </p>

                </div>


                
            </div>
        </div>

    </section>

  )}