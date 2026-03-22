import CardPeripheral from "@/app/components/systemIntegration/peripheral/mainCard"
import FillPeripheral from "@/app/components/systemIntegration/peripheral/fill"


export const metadata = { title: "Pheriperal Devices" };

const Peripherals = () => {
  return (
        <main className="min-h-screen">    
            <CardPeripheral/>
            <FillPeripheral/>
        </main>
  )

  
}

export default Peripherals