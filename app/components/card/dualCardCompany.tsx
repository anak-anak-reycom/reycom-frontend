import Image from "next/image"
import Card from "@/public/joint-ventures.jpg"

export const DualCard = () => {
  return (
    <section className="py-10">
      <div className="max-w-[1400px] mx-auto px-4">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Card Image */}
          <div className="py-5 px-5 rounded-[20px] bg-[#ededed] shadow-md">
            
            <Image
              src={Card}
              alt="Cirrust Lite"
              width={500}
              height={300}
              className="w-full object-cover rounded-[20px]"
            />

            <div className="grid grid-cols-2 mt-6 text-center">
              <div>
                <h2 className="text-2xl font-bold font-sans">+150</h2>
                <p className="text-sm text-gray-600 font-sans">Website Visits</p>
              </div>
              <div>
                <h2 className="text-2xl font-bold font-sans">+1000</h2>
                <p className="text-sm text-gray-600 font-sans">Our Client Around World</p>
              </div>
            </div>
          </div>


          <div className="py-10 px-8 rounded-[20px] bg-[#ededed] shadow-md">
            <div className="space-y-6">
            <h1 className="font-semibold text-4xl text-center font-sans">
              Joint Ventures with Toppan Forms
            </h1>

            <p className="text-center pt-6 text-lg leading-relaxed text-gray-700 font-sans">
              RDS Group has now become an affiliate company of TOPPAN FORMS CO., LTD,
              a prominent hybrid digital information management company from Japan.
              This strategic alliance and investment mark the synergy between RDS and
              TOPPAN FORMS with TOPPAN FORMS as the minority shareholders, which will
              lead to RDS`s further expansion of business in Indonesia and other markets
              in Asia. RDS Group aims to continue to be the best Document Solution and
              System Integration provider in Asia and also strengthening their
              collaboration with TOPPAN FORMS and its alliances, as well as emphasizing
              its presence in the industry going forwards.
            </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
