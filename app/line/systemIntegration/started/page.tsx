import FillStarted from "@/app/components/systemIntegration/gettinStarted/fill"
import SystemIntegration from "@/app/components/systemIntegration/gettinStarted/main"



export const metadata = { title: "Getting Started" };

const Services = () => {
  return (
        <main className="min-h-screen">
            
            <SystemIntegration/>
            <FillStarted/>

        </main>
  )

  
}

export default Services