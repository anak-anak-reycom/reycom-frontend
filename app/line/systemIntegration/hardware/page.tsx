import { CardDetail } from "@/app/components/card/card"
import HardwareContent from "@/app/components/systemIntegration/hardware/main"

export const metadata = { title: "Hardware Infrastructure" };

const hardwareInsfrastructure = () => {
    return (
        <main>
            <HardwareContent/>
        </main>
    )
}

export default hardwareInsfrastructure