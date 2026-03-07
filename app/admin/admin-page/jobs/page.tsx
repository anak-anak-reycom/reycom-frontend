import CreateJobForm from "@/app/components/admin/jobList/createJob"
import AdminJobCard from "@/app/components/admin/jobList/jobList"
import JobCard from "@/app/components/card/jobCard"
import { getAllCareer, deleteCareer } from "@/app/data/career"
import { CareerItem } from "@/app/types/career-types"
import { div } from "framer-motion/client"

export default async function JobList  ()  {

  let careers : (CareerItem & {category? : {idCategory: string ; nameCategory :string ; jobType: string}}) [] = []
  try {
    careers = await getAllCareer()
  }catch(err) {
      console.error("Failed to load",  err)
  } 

  return (
        <main className="min-h-screen">

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-2 " >

              {careers.length === 0 ? (
                <div>Career not found</div>
              ) : (
                careers.map((c) => <AdminJobCard key = {c.id} career = {c}/>)
                
              ) }
               
            </div>
            <div className="flex justify-start mt-8">
                  <button
                      className="bg-linear-to-br from-green-700 to-green-500 px-4 py-2 text-white font-semibold rounded-xl"
                        >
                        + Add News
                  </button>
              </div>

            

        </main>
  )

  
}
