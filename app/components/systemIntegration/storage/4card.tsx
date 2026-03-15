"use client";

import Image from "next/image";
import card1 from "@/public/systemIntegration/storage/card1.png";   
import card2 from "@/public/systemIntegration/storage/card2.png"; 
import card3 from "@/public/systemIntegration/storage/card3.png"; 
import card4 from "@/public/systemIntegration/storage/card4.png"; 


export default function FourCardStorage() {

    return (
        <section className="py-5">
      <div className="max-w-[720px] mx-auto px-6">
        
        {/* ===== GRID ===== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          
          {/* CARD 1 */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden max-w-[300px]">
            <div className="px-2 py-3">
            <Image
              src={card1}
              alt="Cirrust Lite"
              width={200}
              height={300}
              className="w-full object-cover rounded-[20px] "
            />

            <div className="p-5">
              <h3 className="font-semibold flex justify-center text-3xl mb-2">
                All Flash
              </h3>

              <p className="text-secondary flex justify-center text-center text-[16px] mb-4 font-sans">
              All-flash is a storage infrastructure that contains only flash memory drives instead of spinning-disk drives. All-flash storage is also referred to as a Solid-State Array (SSA). all-flash offers speed, performance, and agility for your business applications.​​
              </p>

            </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm overflow-hidden max-w-[300px]">
            <div className="px-2 py-3">
            <Image
              src={card2}
              alt="Cirrust Lite"
              width={200}
              height={300}
              className="w-full object-cover rounded-[20px] "
            />

            <div className="p-5">
              <h3 className="font-semibold flex justify-center text-3xl mb-2 font-sans">
                Hybrid
              </h3>

              <p className="text-secondary flex justify-center text-center text-[16px] mb-4 font-sans">
              Hybrid storage combines both traditional hard disk drives (HDDs) and solid-state drives (SSDs) in a single system. This approach leverages the cost-effectiveness of HDDs and the performance benefits of SSDs, providing a balanced solution for data storage needs. Hybrid storage systems automatically move frequently accessed data to faster SSDs while keeping less-used data on slower HDDs. This intelligent data placement ensures optimal performance without sacrificing capacity or cost-efficiency.​​
              </p>

            </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm overflow-hidden max-w-[300px]">
            <div className="px-2 py-3">
            <Image
              src={card3}
              alt="Cirrust Lite"
              width={200}
              height={300}
              className="w-full object-cover rounded-[20px] "
            />

            <div className="p-5">
              <h3 className="font-semibold flex justify-center text-center text-3xl mb-2 font-sans">
                Traditional Storage
              </h3>

              <p className="text-secondary flex justify-center text-center text-[16px] mb-4 font-sans">
              Tape Storage keeps on evolving, Tape storage is one of the best solutions for archiving large volumes of data, with data volumes growing rapidly, tape storage is a suitable system for data storage requiring large capacity. Tape storage is not used only for backup in case of system failure, but also for archiving data for long-term storage.​​
              </p>

            </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm overflow-hidden max-w-[300px]">
            <div className="px-2 py-3">
            <Image
              src={card4}
              alt="Cirrust Lite"
              width={200}
              height={300}
              className="w-full object-cover rounded-[20px] "
            />

            <div className="p-5">
              <h3 className="font-semibold flex justify-center text-3xl mb-2 font-sans">
                Backup Tools
              </h3>

              <p className="text-secondary flex justify-center text-center text-[16px] mb-4 font-sans">
              Make a copy of your files on storage separate from your main hard drive, that’s the point of this tool. it will really make your data safe, you can do replication data to another drive, external drive, NAS, etc. it will prevent data loss in your businessKesadaran diri untuk bertanggungjawab atas situasi yang akan muncul dan mampu untuk mengantisipasi serta menindaklanjuti situasi tersebut tanpa harus diminta terlebih dahulu.​​
              </p>

            </div>
            </div>
          </div>
        

        </div>
      </div>
    </section>
    )
}