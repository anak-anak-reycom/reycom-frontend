import Image from "next/image"
import Card from "../../../public/card.png"

export const CorporateCulture = () => {
  return (
    <section className="py-10">
      <div className="max-w-[1400px] mx-auto px-4">
        
        {/* ===== TITLE ===== */}
        <h2 className="text-4xl font-semibold mb-16 text-center ">
          Corporate Culture
        </h2>

        {/* ===== GRID ===== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* CARD 1 */}
          <div className="bg-[#ededed] rounded-xl shadow-sm overflow-hidden max-w-[300px]">
            <div className="px-2 py-3">
            <Image
              src={Card}
              alt="Cirrust Lite"
              width={200}
              height={300}
              className="w-full object-cover rounded-[20px] "
            />

            <div className="p-5">
              <h3 className="font-semibold flex justify-center text-3xl mb-2">
                Proaktif
              </h3>

              <p className="text-secondary flex justify-center text-center text-[16px] mb-4">
              Kesadaran diri untuk bertanggungjawab atas situasi yang akan muncul dan mampu untuk mengantisipasi serta menindaklanjuti situasi tersebut tanpa harus diminta terlebih dahulu.​​
              </p>

            </div>
            </div>
          </div>
          <div className="bg-[#ededed] rounded-xl shadow-sm overflow-hidden max-w-[300px]">
            <div className="px-2 py-3">
            <Image
              src={Card}
              alt="Cirrust Lite"
              width={200}
              height={300}
              className="w-full object-cover rounded-[20px] "
            />

            <div className="p-5">
              <h3 className="font-semibold flex justify-center text-3xl mb-2">
                Proaktif
              </h3>

              <p className="text-secondary flex justify-center text-center text-[16px] mb-4">
              Kesadaran diri untuk bertanggungjawab atas situasi yang akan muncul dan mampu untuk mengantisipasi serta menindaklanjuti situasi tersebut tanpa harus diminta terlebih dahulu.​​
              </p>

            </div>
            </div>
          </div>
          <div className="bg-[#ededed] rounded-xl shadow-sm overflow-hidden max-w-[300px]">
            <div className="px-2 py-3">
            <Image
              src={Card}
              alt="Cirrust Lite"
              width={200}
              height={300}
              className="w-full object-cover rounded-[20px] "
            />

            <div className="p-5">
              <h3 className="font-semibold flex justify-center text-3xl mb-2">
                Proaktif
              </h3>

              <p className="text-secondary flex justify-center text-center text-[16px] mb-4">
              Kesadaran diri untuk bertanggungjawab atas situasi yang akan muncul dan mampu untuk mengantisipasi serta menindaklanjuti situasi tersebut tanpa harus diminta terlebih dahulu.​​
              </p>

            </div>
            </div>
          </div>
          <div className="bg-[#ededed] rounded-xl shadow-sm overflow-hidden max-w-[300px]">
            <div className="px-2 py-3">
            <Image
              src={Card}
              alt="Cirrust Lite"
              width={200}
              height={300}
              className="w-full object-cover rounded-[20px] "
            />

            <div className="p-5">
              <h3 className="font-semibold flex justify-center text-3xl mb-2">
                Proaktif
              </h3>

              <p className="text-secondary flex justify-center text-center text-[16px] mb-4">
              Kesadaran diri untuk bertanggungjawab atas situasi yang akan muncul dan mampu untuk mengantisipasi serta menindaklanjuti situasi tersebut tanpa harus diminta terlebih dahulu.​​
              </p>

            </div>
            </div>
          </div>
        

        </div>
      </div>
    </section>
  )
}
