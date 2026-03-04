import ApplyForm from "../components/card/applyCard"
import { JobCard } from "../components/card/jobCard"
import { getAllCareer } from "../data/career"
import { getAllCategory, getCategoryName, getJobTypes } from "../data/category"


export default function Career() {

  const careers = getAllCareer()
  const categories = getAllCategory()

  return (
    <main className="min-h-screen">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 ">

            <JobCard/>

        </div>
    </main>
  )
}
