// app/data/healthcare.ts
import syntech from "../../public/healthcareimg/syntech.png"
import bpo from "../../public/healthcareimg/bpo.png"
import tpa from "../../public/healthcareimg/tpa.png"
import paf from "../../public/healthcareimg/paf.png"
import woroldwideOption from "../../public/healthcareimg/worldwideOption.png"
import healthcareManagement from "../../public/healthcareimg/worldwideOption.png"


export type Slide = {
  id: string;
  title: string;
  body: string;
  img: string; // path relative to /public, e.g. "/syntech.jpg"
  link?: string;
};

export const healthcareSlides: Slide[] = [
  {
    id: "syntech",
    title: "Healthcare Management",
    body:
      "Syntech Mitra Integrasi (SMI) is a leading provider of Business Process Outsourcing and System Integration services for the insurance industry. We deliver comprehensive Healthcare Management Services including Claim Administration, Inventory Monitoring, Healthcare IoT, Delivery, and Distribution.",
    img: "syntech.jpg",
    link: "https://syntechmi.com",
  },
  {
    id: "tpa",
    title: "Third Party Administration (TPA)",
    body:
      "Third-Party Administration (TPA) are designed to support insurance companies and corporations in delivering comprehensive healthcare solutions for policyholders and employees. Our TPA services manage healthcare products for commercial insurers and corporate entities.",
    img: "/tpa.png",
  },
  
];
