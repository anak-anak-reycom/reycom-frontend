// components/clientExperience.tsx  (ganti nama file sesuai lokasi kamu)
"use client";

import React from "react";
import Image from "next/image";

interface CompanyItem {
  name: string;
  title: string;
  logoSrc: string;
  description: string;
}

export function ClientExperience() {
  const companies: CompanyItem[] = [
    {
      name: "3Dolphins",
      title: "3Dolphins: Customer Experience with AI Touch in Indonesia",
      logoSrc: "/systemIntegration/ai/dolphin.png",
      description:
        "3Dolphins AI is a premier AI and Omnichannel platform that empowers businesses to master customer engagement by seamlessly integrating 20+ communication channels into one unified interface. By leveraging advanced Generative AI and intelligent automation, we simplify complex workflows, enhance response accuracy, and deliver personalized interactions that drive both operational efficiency and sustainable business growth.",
    },
    {
      name: "Opentext",
      title: "OpenText | Secure Information Management for AI",
      logoSrc: "/systemIntegration/experience/opentext.png",
      description:
        "OpenText, a global leader in Information Management, partners with RDS to deliver a comprehensive cloud ecosystem designed to master digital transformation and secure enterprise data. By integrating OpenText’s advanced AI, cybersecurity, and content services into our RDS solutions, we empower organizations to bridge information silos, streamline complex workflows, and turn vast data into actionable insights for smarter, more efficient decision-making.",
    },
    {
      name: "BLUERUSH",
      title: "BLUERUSH : The power of digital engagement",
      logoSrc: "/systemIntegration/experience/bluerush.png",
      description:
        "BlueRush, a leading provider of interactive personalized video solutions, partners with RDS to transform how organizations engage with their customers. Through its flagship IndiVideo platform, BlueRush enables our clients to convert complex data into high-impact, tailored video experiences that drive higher conversion rates and customer loyalty. By integrating these innovative digital tools into the RDS ecosystem, we empower businesses to deliver personalized journeys at scale, ensuring every customer interaction is meaningful, measurable, and results-driven.",
    },
    {
      name: "ObjectifLune",
      title: "OBJECTIFLUNE",
      logoSrc: "/systemIntegration/experience/objectiflune.png",
      description: "",
    },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 space-y-8">
      {companies.map((company, index) => (
        
        <div
          key={index}
          className="flex flex-col md:flex-row gap-4 md:gap-6 items-start md:items-center"
        >
          
          <div className="flex-shrink-0 pt-2">
            <div className=" w-36 h-36 rounded-md overflow-hidden bg-white/0">
             
              <Image
                src={company.logoSrc}
                alt={`${company.name} logo`}
                width={144}
                height={144}
                className="object-cover"
              />
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <h2 className="text-base md:text-lg font-bold text-gray-900 mb-2 font-sans">
              {company.title}
            </h2>
            <p className="text-sm text-gray-700 leading-relaxed break-words font sans" >
              {company.description || "—"}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}