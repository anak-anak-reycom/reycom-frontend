import Image from "next/image"
import Card from "../../../public/card.png"
import proaktif from "@/public/companyCulture/culture3.png"
import integritas from "@/public/companyCulture/culture1.png"
import servcie from "@/public/companyCulture/culture2.png"
import belajar from "@/public/companyCulture/service5.png"


export const CorporateCulture = () => {
  return (
    <section className="py-10">
      <div className="max-w-[1400px] mx-auto px-4">
        
        {/* ===== TITLE ===== */}
        <h2 className="text-4xl font-semibold mb-16 text-center ">
          Corporate Culture
        </h2>

        {/* ===== GRID ===== */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* CARD 1 */}
          <div className="bg-[#ededed] rounded-xl shadow-sm overflow-hidden max-w-[300px]">
            <div className="px-2 py-3">
            <Image
              src={proaktif}
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
              src={servcie}
              alt="Cirrust Lite"
              width={200}
              height={300}
              className="w-full object-cover rounded-[20px] "
            />

            <div className="p-5">
              <h3 className="font-semibold flex justify-center text-3xl mb-2">
                Service No. 1
              </h3>

              <p className="text-secondary flex justify-center text-center text-[16px] mb-4">
              Keinginan untuk membantu atau melayani orang lain untuk memenuhi kebutuhan pelanggan internal atau eksternal dengan pelayanan yang prima.​​
              </p>

            </div>
            </div>
          </div>
          <div className="bg-[#ededed] rounded-xl shadow-sm overflow-hidden max-w-[300px]">
            <div className="px-2 py-3">
            <Image
              src={belajar}
              alt="Cirrust Lite"
              width={200}
              height={300}
              className="w-full object-cover rounded-[20px] "
            />

            <div className="p-5">
              <h3 className="font-semibold flex justify-center text-3xl mb-2">
                Terus Belajar
              </h3>

              <p className="text-secondary flex justify-center text-center text-[16px] mb-4">
             Kemauan untuk belajar terus menerus dalam mengembangkan dan memperbaiki kualitas pribadi yaitu pengetahuan, keterampilan dan sikap kerja.
              </p>

            </div>
            </div>
          </div>
          <div className="bg-[#ededed] rounded-xl shadow-sm overflow-hidden max-w-[300px]">
            <div className="px-2 py-3">
            <Image
              src={integritas}
              alt="Cirrust Lite"
              width={200}
              height={300}
              className="w-full object-cover rounded-[20px] "
            />

            <div className="p-5">
              <h3 className="font-semibold flex justify-center text-3xl mb-2">
                Integritas
              </h3>

              <p className="text-secondary flex justify-center text-center text-[16px] mb-4">
              Kemampuan untuk bertindak konsisten sesuai dengan nilai-nilai budaya dan peraturan perusahaan, serta kode etik profesi, walaupun dalam keadaan yang sulit untuk melakukannya.
              </p>

            </div>
            </div>
          </div>
        

        </div>
      </div>
    </section>
  )
}
