import Image from "next/image"
import Card from "../../../public/card.png"
import { getCategoryById } from "@/app/data/category"
import { getCareerById } from "@/app/data/career"
import { Timer, Calendar } from "lucide-react"
import jobImage from "@/public/jobImage.png"


export const JobCard = () => {
  return (
    <section >
      <div className="max-w-[1400px] px-4">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">

          {/* Card Image */}
          <div className="py-5 px-5 rounded-md bg-white cursor-pointer hover:bg-gray-100 duration-300 shadow-[0px_0px_10px_1px_#cbd5e0]  "> 
            
            <div className="grid grid-cols-1 text-center">
              <div className="flex flex-col md:flex-row items-center gap-4">
                <div className="flex gap-4 border-b-2 border-gray-200 pb-3 w-full"> 
                      <div className="w-[120px] h-[120px] md:w-[70px] md:h-[70px] flex-shrink-0 flex items-center">
                        <Image
                          src={jobImage}
                          alt="Quadrant Synergy"
                          width={70}
                          height={70}
                          className="object-cover rounded"
                        />
                      </div>
              
                      <div className="flex-1 flex flex-col justify-center text-center md:text-left">
                        <h3 className="text-lg md:text-2xl font-semibold">
                          Software Engineer
                        </h3>
                      </div>
                      </div>
                </div>

                <div className="mt-4 flex items-center gap-2  py-1 text-sm">
                      <Timer size={25} />
                      <span className="text-md font-bold">Full Time</span>
                </div>
                <div>
                <h2 className="text-md text-left font-semibold">Requrirement</h2>
                <p className="text-left">Responsibilities: Provide API with service-side logic Develop reusable framework (code and library) Optimization API for speed and scalability Implement data security and data protection Designing and...</p>
                </div>

                <div className="mt-4 flex items-center gap-2  py-1 text-sm">
                      <Calendar size={25} className="text-gray-400" />
                      <span className="text-md text-gray-400 font-medium">Date Release</span>
                </div>
              <div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
