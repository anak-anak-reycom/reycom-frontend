// jobDetails.tsx
'use client'

import Image from "next/image"
import { Timer, Calendar } from "lucide-react"
import jobImage from "@/public/jobImage.png"

export default function JobDetails () {
  return (
    <div className='mx-auto max-w-[1400px] p-4'>
    
      <div className="flex flex-col md:flex-row items-center gap-4">
        <div className="w-[120px] h-[120px] md:w-[110px] md:h-[110px] flex-shrink-0 flex items-center">
          <Image
            src={jobImage}
            alt="Quadrant Synergy"
            width={110}
            height={110}
            className="object-cover rounded"
          />
        </div>

        <div className="flex-1 flex flex-col justify-center text-center md:text-left">
          <h3 className="text-xl md:text-2xl font-semibold">
            Quadrant Synergy International
          </h3>
        </div>
      </div>

      <div className="mt-10">
        <div className="grid grid-cols-2 gap-4 max-w-[420px] mx-auto md:mx-0">
          <div className="flex items-center justify-center gap-3 px-5 py-2 border-2 rounded-full border-[#214B62]">
            <Timer size={18} />
            <span className="text-sm font-medium">Full Time</span>
          </div>

          <div className="flex items-center justify-center gap-3 px-5 py-2 border-2 rounded-full border-[#214B62]">
            <Calendar size={18} />
            <span className="text-sm font-medium">Date Release</span>
          </div>
        </div>
      </div>
 
      <div className="mt-5 grid grid-cols-1 md:grid-cols-1 gap-5">

        <div>
          <h4 className="text-2xl font-semibold mb-4">Responsibilities</h4>
          <ul className="list-disc list-inside space-y-2 text-sm">
            <li>Provide API with service-side logic</li>
            <li>Develop reusable framework (code and library)</li>
            <li>Optimization API for speed and scalability</li>
            <li>Implement data security and data protection</li>
            <li>Designing and implementing solutions for data storage and database structure</li>
            <li>Integration with back-end and third-party API</li>
            <li>Writing an easily developed and easy-to-understand code with performance and quality in mind</li>
          </ul>
        </div>

        <div>
          <h4 className="text-2xl font-semibold mb-4">Job Requirements</h4>
          <ul className="list-disc list-inside space-y-2 text-sm">
            <li>Candidate must possess at least a Diploma or Bachelor’s Degree in Computer Science/Information Technology, Science & Technology, or equivalent.</li>
            <li>Having at least 1 year of working experience in the related field is required for this position as proven hands-on software development experience.</li>
            <li>Having strong knowledge of OOP.</li>
            <li>Having knowledge of .NET and .NET Framework.</li>
            <li>Having knowledge in Code Versioning, API Versioning, Message Queueing (RabbitMQ), JWT Authentication, Microservices (plus points).</li>
          </ul>
        </div>
      </div>

      {/* Apply */}
       <div className="mt-6 flex justify-center md:justify-start">
        <div className="relative">
          <button
            type="button"
            className="px-6 py-2 text-sm font-medium rounded-full border-2 border-[#214B62] min-w-[140px] text-black bg-white"
          >
            Apply Now
          </button>

        </div>
    </div>
    </div>
  )
}