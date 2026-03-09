// components/clientAi.tsx
"use client";

import React from "react";
import Image from "next/image";

interface CompanyItem {
  name: string;
  title: string;
  logoSrc: string;
  description: string;
}

export function ClientAi() {
  const companies: CompanyItem[] = [
    {
      name: "3Dolphins",
      title: "3Dolphins: Customer Experience with AI Touch in Indonesia",
      logoSrc: "/systemIntegration/ai/dolphin.png",
      description:
        "3Dolphins AI is a premier AI and Omnichannel platform that empowers businesses to master customer engagement by seamlessly integrating 20+ communication channels into one unified interface. By leveraging advanced Generative AI and intelligent automation, we simplify complex workflows, enhance response accuracy, and deliver personalized interactions that drive both operational efficiency and sustainable business growth.",
    },
    {
      name: "Automation Anywhere",
      title: "Automation Anywhere: The Leading Agentic Process Automation",
      logoSrc: "/systemIntegration/ai/aa.png",
      description:
        "Automation Anywhere is a leader in Agentic AI and Robotic Process Automation (RPA), partnering with RDS to redefine enterprise efficiency through intelligent digital workforces. By combining our specialized AI agents and end-to-end process orchestration into our service offering, we enable clients to automate high-volume tasks with 99.9% accuracy and seamless human-agent collaboration. Together, we bridge the gap between legacy systems and the autonomous enterprise, transforming complex workflows into high-speed, data-driven engines for business growth.",
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
            <div className="w-36 h-36 rounded-md overflow-hidden bg-white/0 mx-auto md:mx-0">
              <Image
                src={company.logoSrc}
                alt={`${company.name} logo`}
                width={144}
                height={144}
                className="object-contain"
              />
            </div>
          </div>

         
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-bold text-gray-900 mb-2">{company.title}</h2>
            <p className="text-sm text-gray-700 leading-relaxed break-words">
              {company.description || "—"}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}