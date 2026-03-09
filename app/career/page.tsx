import { JobCard } from "../components/card/jobCard"
import { getAllCareer } from "../data/career"
import { CareerItem } from "../types/career-types"
import { JobCarousel } from "../components/card/jobCarousel"
import CareerClient from "./CareerClient"


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
      <div className="max-w-[1400px] mx-auto px-4">
         <CareerClient careers={careers} />
        
        </div>
    </main>
  )
}
  