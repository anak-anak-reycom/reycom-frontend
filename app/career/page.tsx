import { JobCard } from "../components/card/jobCard"
import { getAllCareer } from "../data/career"
import { CareerItem } from "../types/career-types"
import { JobCarousel } from "../components/card/jobCarousel"


export default async function CareerPage() {

 let careers : (CareerItem &  {category? : {idCategory : number; nameCategory : string; jobType : string} })[] = []
 try {
    careers = await getAllCareer()
 }
 catch (err){
  console.error(" Failed to load", err)
 }

  return (
    <main className="min-h-screen">
      <div className="max-w-[1400px] mx auto px-4">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-2 ">

            {careers.length === 0 ? (
            <div className="text-gray-500">No career found.</div>
          ) : (
            careers.map((c) => <JobCard key = {c.id} career={c}/>)
          )}

        </div>
        </div>
    </main>
  )
}
  