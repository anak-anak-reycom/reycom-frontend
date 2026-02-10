'use client';

import React from "react"
import Image from "next/image";

interface CompanyItem {
  name: string;
  title: string;
  logo: React.ReactNode;
  description: string;
}

export function ClientExperience() {
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
      name: 'Opentext',
      title: 'OpenText | Secure Information Management for AI',
      logo: (
        <div className="flex items-center gap-2">
                  <Image src="/systemIntegration/experience/opentext.png" alt="OpenText Logo" width={150} height={150} />   
        </div>
      ),
      description:
        'OpenText, a global leader in Information Management, partners with RDS to deliver a comprehensive cloud ecosystem designed to master digital transformation and secure enterprise data. By integrating OpenText’s advanced AI, cybersecurity, and content services into our RDS solutions, we empower organizations to bridge information silos, streamline complex workflows, and turn vast data into actionable insights for smarter, more efficient decision-making.',
    },
    {
      name: 'BLUERUSH',
      title: 'BLUERUSH : The power of digital engagement',
      logo: (
        <div className="flex items-center gap-2">
                  <Image src="/systemIntegration/experience/bluerush.png" alt="BlueRush Logo" width={150} height={150} />   
        </div>
      ),
      description:
        'BlueRush, a leading provider of interactive personalized video solutions, partners with RDS to transform how organizations engage with their customers. Through its flagship IndiVideo platform, BlueRush enables our clients to convert complex data into high-impact, tailored video experiences that drive higher conversion rates and customer loyalty. By integrating these innovative digital tools into the RDS ecosystem, we empower businesses to deliver personalized journeys at scale, ensuring every customer interaction is meaningful, measurable, and results-driven.',
    },
    {
      name: 'ObjectifLune',
      title: 'OBJECTIFLUNE',
      logo: (
        <div className="flex items-center gap-2">
                  <Image src="/systemIntegration/experience/objectiflune.png" alt="ObjectifLune Logo" width={150} height={150} />   
        </div>
      ),
      description:
        '',
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
