import { DualCardServer } from "@/app/components/systemIntegration/server/dualCard"
import CardServer from "@/app/components/systemIntegration/server/main"

export const metadata = { title: "Server" };

const Server = () => {
  return (
        <main className="min-h-screen">
            
            <CardServer/>
            <DualCardServer/>

        </main>
  )

  
}

export default Server