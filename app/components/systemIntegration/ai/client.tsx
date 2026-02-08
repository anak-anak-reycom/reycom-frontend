'use client';

import React from "react"
import Image from "next/image";

interface CompanyItem {
  name: string;
  title: string;
  logo: React.ReactNode;
  description: string;
}

export function ClientAi() {
  const companies: CompanyItem[] = [
    {
      name: '3Dolphins',
      title: '3Dolphins: Customer Experience with AI Touch in Indonesia',
      logo: (
        <div className="flex items-center gap-2">
         <Image src="/systemIntegration/ai/dolphin.png" alt="3Dolphins Logo" width={150} height={150} />
        </div>
      ),
      description:
        '3Dolphins AI is a premier AI and Omnichannel platform that empowers businesses to master customer engagement by seamlessly integrating 20+ communication channels into one unified interface. By leveraging advanced Generative AI and intelligent automation, we simplify complex workflows, enhance response accuracy, and deliver personalized interactions that drive both operational efficiency and sustainable business growth.',

    },
    {
      name: 'Automation Anywhere',
      title: 'Automation Anywhere: The Leading Agentic Process Automation',
      logo: (
        <div className="flex items-center gap-2">
                  <Image src="/systemIntegration/ai/aa.png" alt="3Dolphins Logo" width={150} height={150} />   
        </div>
      ),
      description:
        'Automation Anywhere is a leader in Agentic AI and Robotic Process Automation (RPA), partnering with RDS to redefine enterprise efficiency through intelligent digital workforces. By combining our specialized AI agents and end-to-end process orchestration into our service offering, we enable clients to automate high-volume tasks with 99.9% accuracy and seamless human-agent collaboration. Together, we bridge the gap between legacy systems and the autonomous enterprise, transforming complex workflows into high-speed, data-driven engines for business growth.',
    },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 space-y-12">
      {companies.map((company, index) => (
        <div key={index} className="flex gap-6 items-start">
          <div className="flex-shrink-0 pt-2">{company.logo}</div>
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              {company.title}
            </h2>
            <p className="text-sm text-gray-700 leading-relaxed">
              {company.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
