import ApplyForm from "../components/card/applyCard"
import { JobCard } from "../components/card/jobCard"
import { getAllCareer } from "../data/career"
import { getAllCategory, getCategoryName, getJobTypes } from "../data/category"


export default function Career() {

  const careers = getAllCareer()
  const categories = getAllCategory()

  return (
    <main className="min-h-screen">
        <JobCard/>
    </main>
  )
}
