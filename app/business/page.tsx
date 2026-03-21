import { Carousel } from '../components/slidincarousel/carousel'
import { carouselItems } from '../data/business'

export const metadata = { title: "Business Processing" };

export default function Home() {
  return (
    <main className="min-h-screen py-8 md:py-12">
      <div className="  px-4">
    
        <Carousel items={carouselItems}/>
     
        <div className='justify-center py-9'>
          <h1 className='font-semibold font-sans text-[38px] text-center '>All About Business Processing</h1>
          <p className='flex justify-center py-6 font-light text-center font-sans'>Business Process Outsourcing solution services include turn-key solutions for Imaging and Data Capture, Variable Data Printing, & e-Statement, Contact Center, Courier Services, Record Management, and the latest solutions are Digital Preservation and Label Solution.</p>
        </div>
        <div>
          <h4 className='text-[28px] font-semibold font-sans'><span className='font-sans text-secondary'>Document</span> Imaging & Data Capture</h4>
          <p className='py-7 font-light '>Why stay buried in folders when you can soar in the cloud? Our imaging and data capture services turn dusty documents into smart, readable data in the blink of an eye. We help you Go Paperless and Go Green while keeping your delivery lightning-fast and your data perfectly precise.</p>
        </div>
        <div>
          <h4 className='text-[28px] font-semibold font-sans'>Variable Data Printing & <span className='font-sans text-secondary'> E - Statement</span> </h4>
          <p className='py-7 font-light '>
          At RDS, we don’t just print; we personalize. We use multiple data streams—from complex graphs to tailored text—to create high-impact documents. Our automated folding and inserting technology acts like a high-tech bodyguard, protecting privacy and eliminating mistakes in every envelope.
          And because we love the planet as much as we love data, we’re leading the Go Paperless movement with our premium E-Statement solutions. Efficiency has never looked this green!
          </p>
        </div>
        <div>
          <h4 className='text-[28px] font-semibold font-sans'>Contact Center, Courier, <span className='font-sans text-secondary'>Services</span>, Record Management</h4>
          <p className='py-7 font-light '>
Contact Center provides communication service in the form of call/SMS/email which can be fully customized to the needs of the client. Courier Services is a document delivery solution for personal and corporate users with advance tracking and detailed reporting status. Record Management is a physical document storage service using RFID technology and integrated archival system.          </p>
        </div>
        <div>
          <h4 className='text-[28px] font-semibold font-sans'>Digital <span className='font-sans text-secondary'>Preservation</span></h4>
          <p className='py-7 font-light '>Softcopy data storage services based on digital film technology for the most affordable and effective long-term solution for storing your valuable data.</p>
        </div>
        <div>
          <h4 className='text-[28px] font-semibold font-sans'>Label <span className='font-sans text-secondary'>Solution</span></h4>
          <p className='py-7 font-light '>Label Solution is RDS latest innovation in packaging industry where we provide customers with the latest hardware and software technology for packaging solution.</p>
        </div>
      </div>
    </main>
  )
}
