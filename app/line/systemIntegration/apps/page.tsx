import GridSoftware from "@/app/components/systemIntegration/software/4grid"
import SoftwareText from "@/app/components/systemIntegration/software/mainText"

export const metadata = { title: "Software and Applications" };

const app = () => {
  return <div>
        <SoftwareText/>
        <GridSoftware/>
  </div>
}

export default app
