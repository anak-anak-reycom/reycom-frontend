import CardBusiness from "@/app/components/systemIntegration/businessApp/mainCard"
import FillBusiness from "@/app/components/systemIntegration/businessApp/fill"

export const metadata = { title: "Business Application" };

const BusinessApp = () => {
  return (
        <main className="min-h-screen">    
            <CardBusiness/>
            <FillBusiness/>
        </main>
  )

  
}

export default BusinessApp