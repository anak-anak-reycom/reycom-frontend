import CardExperience from "@/app/components/systemIntegration/experience/mainCard"
import FillExperience from "@/app/components/systemIntegration/experience/fill"

export const metadata = { title: "Customer Experience" };

const CustomerExperience = () => {
  return (
        <main className="min-h-screen">
            
            <CardExperience/>
            <FillExperience/>


        </main>
  )

  
}

export default CustomerExperience