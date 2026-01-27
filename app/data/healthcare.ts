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
   {
    id: "cob",
    title: "Coordination Of Benefit (COB)",
    body:
      "A healthcare financing method in which two or more insurers share responsibility for covering the same individual for the same healthcare benefits. This coordination of benefits may be managed by the insurance company or other payers, ensuring that the total benefits do not exceed the actual cost of the healthcare services provided.",
    img: "/tpa.png",
  },

   {
    id: "bpo",
    title: "Business Process Outsourcing (BPO) Healthcare",
    body:
      "A healthcare financing method in which two or more insurers share responsibility for covering the same individual for the same healthcare benefits. This coordination of benefits may be managed by the insurance company or other payers, ensuring that the total benefits do not exceed the actual cost of the healthcare services provided.",
    img: "/tpa.png",
  },  

  {
    id: "medicEquipment",
    title: "Medical Equipment Distribution",
    body:
      "Third-Party Administration (TPA) are designed to support insurance companies and corporations in delivering comprehensive healthcare solutions for policyholders and employees. Our TPA services manage healthcare products for commercial insurers and corporate entities.",
    img: "/tpa.png",
  },  

  {
    id: "medicEquipment",
    title: "Medical Equipment Distribution",
    body:
      "Syntech is a trusted distributor of medical equipment, offering a wide range of products for clinics, hospitals, laboratories, corporations, and individual needs. We provide competitively priced solutions with the best quality standards, all fully licensed and approved by the Ministry of Health.",
    img: "/tpa.png",
  }, 

  {
    id: "medicConc",
    title: "Medical Concierge",
    body:
      "Our Medical Concierge service is designed to assist patients in planning and coordinating their medical journeys—from scheduling doctor appointments at hospitals to facilitating additional treatments as needed, covering the entire process from departure to return. This service is tailored to help manage healthcare costs while ensuring patient comfort and convenience throughout the course of treatment.",
    img: "/tpa.png",
  },
  
  {
    id: "medicSecond",
    title: "Medical Second Opinion",
    body:
      "Provision of a written opinion from a specialist doctor as a second opinion following the primary hospital diagnosis, offering insights on the patient’s condition and treatment plan based on the available data and medical information.",
    img: "/tpa.png",
  },
  
  {
    id: "worldwide",
    title: "Worldwide Hospitalization",
    body:
      "Syntech provides cashless inpatient care services at partner hospitals worldwide, allowing patients to receive medical treatment without the need for large upfront payments. Through this service, clients are relieved from the burden of handling hospital administration or billing processes, as all coordination is managed directly by Syntech. To access this benefit, patients are required to complete a Pre-Authorization Form.",
    img: "/tpa.png",
  }, 

  {
    id: "paf",
    title: "Pre-Authorization Form (PAF)",
    body:
      "The pre-authorization form serves as a cost-control measure for healthcare packages, requiring doctors and healthcare providers to obtain prior approval before delivering services to patients. This process ensures that the proposed treatments, along with their scope of services and payment terms, are reviewed and authorized in advance.",
    img: "/tpa.png",
  }, 
  
   {
    id: "evacuation",
    title: "Medical Evacuation",
    body:
      " Our Medical Evacuation service provides patient referrals across cities, regions, or countries via land, sea, or air, with full medical team assistance and advanced medical equipment to ensure patient stability throughout the journey and prevent fatal risks during transfer. Transportation is arranged from the point of incident to the nearest advanced healthcare facility for immediate further treatment. This service is strictly available for emergency cases.",
    img: "/tpa.png",
  },     
  
   

];
