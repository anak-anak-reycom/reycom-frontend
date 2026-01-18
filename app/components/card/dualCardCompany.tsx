import Image from "next/image"
import Card from "../../../public/card.png"

export const DualCard = () => {
  return (
    <section className="py-10">
      <div className="max-w-[1400px] mx-auto px-4">
        
        {/* ===== TITLE ===== */}
        <h2 className="text-2xl font-semibold mb-8">
          Read our other <span className="text-primary">Details</span>
        </h2>

        {/* ===== GRID ===== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-16">
          
          {/* CARD 1 */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <Image
              src={Card}
              alt="Cirrust Lite"
              width={300}
              height={500}
              className="w-full object-cover"
            />

            <div className="p-5">
              <h3 className="font-semibold text-lg mb-2">
                Cirrust Lite: Light But Powerful
              </h3>

              <p className="text-secondary text-sm mb-4">
                Experience the simplicity and efficiency of Cirrust Lite
                without sacrificing any of the power
              </p>

              <a
                href="#"
                className="text-primary font-medium text-sm hover:underline"
              >
                Learn More
              </a>
            </div>
          </div>

          {/* CARD 2 */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <Image
              src={Card}
              alt="Cirrust Lite"
              width={300}
              height={500}
              className="w-full object-cover"
            />

            <div className="p-5">
              <h3 className="font-semibold text-lg mb-2">
                Cirrust Lite: Light But Powerful
              </h3>

              <p className="text-secondary text-sm mb-4">
                Experience the simplicity and efficiency of Cirrust Lite
                without sacrificing any of the power
              </p>

              <a
                href="#"
                className="text-primary font-medium text-sm hover:underline"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
