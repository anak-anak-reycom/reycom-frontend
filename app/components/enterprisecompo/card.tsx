"use client";

import Image from "next/image";
import card from "@/public/systemIntegration/enterprise/enterprise.png";

export default function CardEnterprise() {
  return (
    <section className="w-full">
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

          {/* teks di bawah, juga dibatasi lebar supaya rapi */}
          <div className="text-center mx-auto max-w-[700px]">
            <div className="mx-auto w-24 h-0.5 rounded mb-1 bg-gray-300" />
            <p className="text-[16px] text-start text-gray-700 leading-relaxed pt-4">
              Enterprise Content Management (ECM) tools and strategies allow the management of an organization’s unstructured information, wherever that information exists. ECM is the strategies, methods, and tools used to capture, manage, store, preserve, and deliver content and documents related to organizational processes.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
