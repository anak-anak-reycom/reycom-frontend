"use client";

import React from "react";
import Image from "next/image";

interface CompanyItem {
  name: string;
  title: string;
  logoSrc: string;
  description: string;
}

export function DualCardServer() {
  const companies: CompanyItem[] = [
    {
      name: "Server Business",
      title: "Business Server",
      logoSrc: "/systemIntegration/server/card1.png",
      description:
        "This machine designed from small, medium to high business environment, this machine will be more powerful to support your business, with kind of feature like hardware redundancy such as dual power supplies, RAID disk system, ECC memory, etc will allowing technicians to replace them on the running server without shutting it down.",
    },
    {
      name: "Hyper",
      title: "Hyper Converged Infrastructure (HCI)",
      logoSrc: "/systemIntegration/server/card2.png",
      description:
        "This machine designed for enterprise business, Hyper Converged Infrastructure (HCI) effectively eliminates storage as a tier of infrastructure in the data center. Rather than existing as a separate resource, storage and compute resources are added to server hosts and managed by software. Like most modern workloads, HCI leverages virtualization technology, HCI consolidates servers, storage, the hypervisor, and some network functions into a software-centric solution deployed on commodity hardware",
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
            <div className="w-36 h-36 rounded-lg overflow-hidden bg-white/0 mx-auto md:mx-0">
              <Image
                src={company.logoSrc}
                alt={`${company.title} logo`}
                width={144}
                height={144}
                className="object-contain"
              />
            </div>
          </div>

          
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-bold text-gray-900 mb-2 font-sans">{company.title}</h2>
            <p className="text-lg text-gray-700 leading-relaxed break-words font-sans">
              {company.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}