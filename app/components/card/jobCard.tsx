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

        <div className="grid grid-cols-1 lg:grid-cols-1 items-center">

          {/* Card Image */}
          <div className="py-5 px-5 rounded-[20px] bg-[#ededed] shadow-md w-110 h-62 "> 
            
            <div className="grid grid-cols-1 text-center">
              <div className="flex flex-col md:flex-row items-center gap-4">
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
                        <h3 className="text-xl md:text-4xl font-semibold">
                          OB
                        </h3>
                      </div>
                </div>

                <div className="mt-4 flex items-center gap-2  py-1 text-sm">
                      <Timer size={25} />
                      <span className="text-md font-bold">Full Time</span>
                </div>

                <h2 className="text-md text-left ">Requrirement</h2>

                <div className="mt-4 flex items-center gap-2  py-1 text-sm">
                      <Calendar size={25} />
                      <span className="text-md font-bold">Date Release</span>
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
