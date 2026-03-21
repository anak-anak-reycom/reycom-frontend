import CardStorage from "@/app/components/systemIntegration/storage/mainCard"
import FourCardStorage from "@/app/components/systemIntegration/storage/4card"

export const metadata = { title: "Storage" };

const Storage = () => {
  return (
        <main className="min-h-screen">
            
            <CardStorage/>
            <FourCardStorage/>

        </main>
  )

  
}

export default Storage