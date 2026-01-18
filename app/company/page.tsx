import { CorporateCulture } from "../components/card/corporateCultureCard"
import { DualCard } from "../components/card/dualCardCompany"
import CompanyHero from "../components/hero/TheCompanyHero"
import CoverageMap from "../components/title-images/marketShare"


export default function Home() {
  return (
    <main className="min-h-screen">
      <CompanyHero
        imageSrc="/public/test.jpg"
        imageAlt="About Company"
        title="About Company"
        description="Born in Jakarta in 2003, RDS Group is your go-to partner across Asia for turning complex business chores into smooth, IT-powered wins! By expertly handling your document solutions through our four specialties—BPO, System Integration, Creative Printing, and Healthcare—we take the heavy lifting out of your daily admin. We're here to slash your costs and save you time, freeing your team up to focus on what you do best while we handle the rest with a smile!"
      />
      <DualCard/>
      <CoverageMap/>
      <CorporateCulture/>

      
    </main>
  )
}
