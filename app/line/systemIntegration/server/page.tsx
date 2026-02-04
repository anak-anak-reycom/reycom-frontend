import DualCardServer from "@/app/components/systemIntegration/server/dualCard"
import CardServer from "@/app/components/systemIntegration/server/main"

const Services = () => {
  return (
        <main className="min-h-screen">
            
            <CardServer/>
            <DualCardServer/>

        </main>
  )

  
}

export default Services