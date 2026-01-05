'use client'
import image from "next/image";
import test from "../public/test.jpg"
import Image from "next/image";

const Hero = () => {
  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 py-10 md:py-20 gap-4">
      <div className="mb-4 break-inside-avoid">
       <Image
        src={test}
        alt="test"
        className="w-full object-cover rounded-xl"
       />
      </div>
      <div className="mb-4 break-inside-avoid">
       <Image
        src={test}
        alt="test"
        className="w-full object-cover rounded-xl"
       />
      </div>
      <div className="mb-4 break-inside-avoid">
       <Image
        src={test}
        alt="test"
        className="w-full object-cover rounded-xl"
       />
      </div>
      <div className="mb-4 break-inside-avoid">
       <Image
        src={test}
        alt="test"
        className="w-full object-cover rounded-xl"
       />
      </div>
      <div className="mb-4 break-inside-avoid">
       <Image
        src={test}
        alt="test"
        className="w-full object-cover rounded-xl"
       />
      </div>
      <div className="mb-4 break-inside-avoid">
       <Image
        src={test}
        alt="test"
        className="w-full object-cover rounded-xl"
       />
      </div>
    </div>
  )
}

export default Hero