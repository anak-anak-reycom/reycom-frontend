import React from 'react'
import Image from "next/image";
import test from "@/public/test.jpg";

import image1 from "@/public/home card/vaulty1.png"
import image2 from "@/public/home card/vaulty.png"
import image3 from "@/public/home card/vaulty2.png"


const masonaryGrid = () => {
  return (
   <div className="grid grid-cols-2 grid-rows-2 gap-4
                        min-h-[300px] lg:min-h-[360px]">
          
          <div className="relative rounded-xl overflow-hidden">
            <Image src={image2} alt="image 1" fill className="object-cover" />
          </div>

          <div className="relative rounded-xl overflow-hidden row-span-2">
            <Image src={image1} alt="image big" fill className="object-cover" />
          </div>

          <div className="relative rounded-xl overflow-hidden">
            <Image src={image3} alt="image 2" fill className="object-cover" />
          </div>
        </div>
  )
}

export default masonaryGrid