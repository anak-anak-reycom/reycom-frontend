import FillAi from "@/app/components/systemIntegration/ai/fill"
import CardAi from "@/app/components/systemIntegration/ai/main"

export const metadata = { title: "AI and Machine Learning" };

const aiMachine = () => {
  return (
    <div>
      <h1>
        <CardAi/>
        <FillAi/>
      </h1>
    </div>
  )
}

export default aiMachine
