import Image from "next/image"
import Card from "../../../public/news-img.png"

export const NewsDetail = () => {
  return (
    <section className="py-10">
      <div className="max-w-[1400px] mx-auto px-4">

        <h2 className="text-2xl font-semibold mb-8">
          Read our other <span className="text-primary">News</span>
        </h2>
      

        {/* ===== GRID ===== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16">
          
          {/* CARD 1 */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <Image
              src={Card}
              alt="Cirrust Lite"
              width={400}
              height={250}
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

              <div className="grid grid-cols-2 gap-3">
                <button className="bg-linear-to-br from-blue-700 to-blue-500 px-1 py-2 text-white font-semibold rounded-xl"> Edit </button>
                <button className="bg-linear-to-br from-red-700 to-red-500 px-1 py-2 text-white font-semibold rounded-xl"> Delete </button>
              </div>
            </div>
          </div>

          {/* CARD 2 */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <Image
              src={Card}
              alt="Cirrust Lite"
              width={400}
              height={250}
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

              <div className="grid grid-cols-2 gap-3">
                <button className="bg-linear-to-br from-blue-700 to-blue-500 px-1 py-2 text-white font-semibold rounded-xl"> Edit </button>
                <button className="bg-linear-to-br from-red-700 to-red-500 px-1 py-2 text-white font-semibold rounded-xl"> Delete </button>
              </div>
            </div>
          </div>

          {/* CARD 3 */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <Image
              src={Card}
              alt="Cirrust Lite"
              width={400}
              height={250}
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

              <div className="grid grid-cols-2 gap-3">
                <button className="bg-linear-to-br from-blue-700 to-blue-500 px-1 py-2 text-white font-semibold rounded-xl"> Edit </button>
                <button className="bg-linear-to-br from-red-700 to-red-500 px-1 py-2 text-white font-semibold rounded-xl"> Delete </button>
              </div>
            </div>
          </div>

        </div>
      </div>
        <div className="flex justify-start mt-8">
          <button className="bg-linear-to-br from-green-700 to-green-500 px-4 py-2 text-white font-semibold rounded-xl">+ Add News</button>
        </div>
    </section>
  )
}
