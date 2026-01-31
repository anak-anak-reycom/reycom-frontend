// app/data/healthcare.ts

import syntech from "@/public/healthcareimg/syntech.png" 
import bpo from "@/public/healthcareimg/bpo.png" 
import tpa from "@/public/healthcareimg/tpa.png" 
import paf from "@/public/healthcareimg/paf.png" 
import medicSecond from "@/public/healthcareimg/medicalSecond.png" 
import woroldwideOption from "@/public/healthcareimg/worldwideOption.png" 
import healthcareManagement from "@/public/healthcareimg/worldwideOption.png" 
import medicEvacuation from "@/public/healthcareimg/medicalEvacuation.png" 
import medicEquip from "@/public/healthcareimg/medicalEquipment.png"
import medCon from "@/public/healthcareimg/medicalConcierge.png" 
import cob from "@/public/healthcareimg/cob.png"



export const healthcareSlides = [
  {
    id: "syntech",
    title: "Healthcare Management",
    body:
      "Syntech Mitra Integrasi (SMI) is a leading provider of Business Process Outsourcing and System Integration services for the insurance industry. We deliver comprehensive Healthcare Management Services including Claim Administration, Inventory Monitoring, Healthcare IoT, Delivery, and Distribution.",
    img: syntech,
    link: "https://syntechmi.com",
  },
  {
    id: "tpa",
    title: "Third Party Administration (TPA)",
    body:
      "Third-Party Administration (TPA) are designed to support insurance companies and corporations in delivering comprehensive healthcare solutions for policyholders and employees. Our TPA services manage healthcare products for commercial insurers and corporate entities.",
    img: tpa,
  },
  {
    id: "cob",
    title: "Coordination Of Benefit (COB)",
    body:
      "A healthcare financing method in which two or more insurers share responsibility for covering the same individual for the same healthcare benefits.",
    img: cob,
  },
  {
    id: "bpo",
    title: "Business Process Outsourcing (BPO) Healthcare",
    body:
      "BPO services for healthcare operations — claims handling, back office processing, and customer support to improve efficiency and reduce cost.",
    img: bpo,
  },
  {
    id: "medicEquipment",
    title: "Medical Equipment Distribution",
    body:
      "Syntech is a trusted distributor of medical equipment, offering a wide range of products for clinics, hospitals, laboratories, corporations, and individual needs.",
    img: medicEquip,
  },
  {
    id: "medicConc",
    title: "Medical Concierge",
    body:
      "Our Medical Concierge service assists patients in planning and coordinating medical journeys—from scheduling appointments to facilitating additional treatments as needed.",
    img: medCon,
  },
  {
    id: "medicSecond",
    title: "Medical Second Opinion",
    body:
      "Provision of a written opinion from a specialist doctor as a second opinion following the primary hospital diagnosis.",
    img: medicSecond,
  },
  {
    id: "worldwide",
    title: "Worldwide Hospitalization",
    body:
      "Syntech provides cashless inpatient care services at partner hospitals worldwide, allowing patients to receive medical treatment without large upfront payments.",
    img: woroldwideOption,
  },
  {
    id: "paf",
    title: "Pre-Authorization Form (PAF)",
    body:
      "The pre-authorization form serves as a cost-control measure requiring prior approval before delivering services to patients.",
    img: paf,
  },
  {
    id: "evacuation",
    title: "Medical Evacuation",
    body:
      "Medical Evacuation provides patient referrals across cities, regions, or countries with full medical team assistance.",
    img: medicEvacuation,
  },
];
