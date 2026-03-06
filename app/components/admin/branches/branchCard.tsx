import { Calendar, Timer } from "lucide-react";
import Image from "next/image"
import jobImage from "@/public/jobImage.png"

export default function branchCard () {
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
                          alt="Quadrant"
                          width={70}
                          height={70}
                          className="object-cover rounded"
                        />  
                      </div>
              
                      <div className="flex-1 flex flex-col justify-center text-center md:text-left">
                        <h3 className="text-lg md:text-2xl font-semibold">
                           nama negara
                        </h3>
                      </div>
                      </div>
                </div>

                <div className="mt-4 flex items-center gap-2  py-1 text-sm">
                      
                      <span className="text-md font-bold">nama cabang</span>
                </div>
                <div>
                <h2 className="text-md text-left font-semibold">nomer telfon</h2>
                <iframe className="border-2 w-full h-auto" src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d63355.20806500845!2d110.46582034878408!3d-7.044438538265611!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sid!2sid!4v1772696759930!5m2!1sid!2sid" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
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