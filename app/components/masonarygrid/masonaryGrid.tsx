import React from 'react'
import Image from "next/image";
import test from "../../public/test.jpg";

const masonaryGrid = () => {
  return (
   <div className="grid grid-cols-2 grid-rows-2 gap-4
                        min-h-[300px] lg:min-h-[360px]">
          
          <div className="relative rounded-xl overflow-hidden">
            <Image src={test} alt="image 1" fill className="object-cover" />
          </div>

          <div className="relative rounded-xl overflow-hidden row-span-2">
            <Image src={test} alt="image big" fill className="object-cover" />
          </div>

          <div className="relative rounded-xl overflow-hidden">
            <Image src={test} alt="image 2" fill className="object-cover" />
          </div>
        </div>
  )
}

export default masonaryGrid