import React from 'react'
import quadrant from '@/public/systemIntegration/businessApp/quadrant.png'
import evotek from '@/public/systemIntegration/businessApp/evotek.png'
import Image from 'next/image'

export default function FillBusiness () {
    return (
      <div className='mx-auto max-w-[1000px] my-8 p-4'>
        <div className='mt-8'>
            <h1 className='text-start font-bold text-4xl font-sans'>Bion Core</h1>
                <p className='mt-8 text-[16px]  font-sans'>
               Scanner is an input device that scans documents such as photographs and pages of text. When a document is scanned, it is converted into a digital format, we provide from small until large format scanner
                </p>
        </div>

        <div className='mt-8'>
            <h1 className='text-start font-bold text-4xl font-sans'>Agent Aid</h1>
                <p className='mt-8 text-[16px]  font-sans'>
                  Printer is an output device that prints paper documents. This includes text documents, images, or a combination of both. We provide from common printer, card printer, until multifunction printer
                </p>
        </div>

        <div className='mt-8'>
            <h1 className='text-start font-bold text-4xl font-sans'>Auto Underwriting</h1>
                <p className='mt-8 text-[16px] font-sans '>
                   Projector is an output device that projects an image onto a large surface, such as a white screen or wall. It may be used an alternative to a monitor or television when showing video or images to a large group of people. We provide from common projector until interactive projector
                </p>
        </div>

        <div className='mt-8'>
            <h1 className='text-start font-bold text-4xl font-sans'>LOS</h1>
                <p className='mt-8 text-[16px] font-sans '>
                    Loan Origination System (LOS) is an application designed to support the processing of credit applications required by banking and multifinance to Improve Customer Engagement, Risk Analysis, Profitability throughout the Credit Life Cycle. Our All-In-One Solution which includes key features that is:
                    
                </p>
                <p className=' text-[16px] '>
                    – Content Management,
                    – Decision Engine,
                    – Business Process Management and Report administration.
                </p>
        </div>

        <div className='mt-8'>
            <h1 className='text-start font-bold text-4xl font-sans'>SLIK Automation</h1>
                <p className='mt-8 text-[16px]  font-sans'>
                    SLIK Automation is software technology to automate OJK SLIK Retrieval using Batch & Interactive method dedupe engine for retrieval matching, automate convert & aggerate SLIK IDEB retrieval to Database System and calculate policy checking for SLIK data. SLIK Automation specifically for Banking and Multi-finance sector that has access to the OJK slik portal.
                </p>
        </div>

        <div className='mt-8'>
            <h1 className='text-start font-bold text-4xl font-sans'>Our Client</h1>
                <p className='mt-8 text-[16px] font-sans '>
                    The next generation of office display solution, interactive panel allow you to run your meeting and presentation with the freedom and convenience your team needs to do their best work, you can touch and control your presentation on the screen, this is the beautiful idea with modular office design
                </p>
        </div>

        <section className="mt-12">
            <div className="max-w-[1000px] mx-auto px-2">
            <h2 className="text-4xl font-extrabold mb-8 font-sans">
                <span className="text-black font-sans">Our</span>{" "}
                <span className="text-[#234b68] font-sans">Client</span>
            </h2>

            {/* Client 1 */}
            <div className="mb-12">
                <div className="grid grid-cols-12 gap-6 items-center">
                <div className="col-span-12 md:col-span-3 flex md:justify-start justify-center">
                    <div className="w-[120px] h-[120px] md:w-[110px] md:h-[110px] flex items-center">
                    <Image
                        src={quadrant}
                        alt="Quadrant Synergy"
                        width={140}
                        height={140}
                        className="object-contain"
                    />
                    </div>
                </div>

                <div className="col-span-12 md:col-span-9 flex justify-center md:justify-start">
                    <h3 className="text-xl md:text-2xl font-semibold text-center md:text-left font-sans">
                    Quadrant Synergy International
                    </h3>
                </div>

                <div className="col-span-12 pt-4">
                    <p className="text-[15px] text-gray-700 leading-relaxed font-sans">
                    PT Quadrant Synergy International is a specialized IT solutions
                    provider and member of the RDS Group that delivers innovative
                    software development, data center automation, and digital
                    transformation services. By offering tailored document
                    management and reliable technology solutions, the company
                    empowers organizations across diverse industries to streamline
                    their operations and modernize their digital infrastructure.
                    </p>
                </div>
                </div>
            </div>

            <div className="border-t border-gray-100 mb-12" />

            {/* Client 2 */}
            <div className="mb-12">
                <div className="grid grid-cols-12 gap-6 items-center">
                <div className="col-span-12 md:col-span-3 flex md:justify-start justify-center">
                    <div className="w-[120px] h-[120px] md:w-[110px] md:h-[110px] flex items-center">
                    <Image
                        src={evotek}
                        alt="Evotek"
                        width={140}
                        height={140}
                        className="object-contain"
                    />
                    </div>
                </div>

                <div className="col-span-12 md:col-span-9 flex justify-center md:justify-start">
                    <h3 className="text-xl md:text-2xl font-semibold text-center md:text-left font-sans">
                    Evotek: FUSE ALL–IN–ONE
                    </h3>
                </div>

                <div className="col-span-12 pt-4">
                    <p className="text-[15px] text-gray-700 leading-relaxed font-sans">
                    PT Evotek is an IT solution provider specializing in business
                    process automation and software development, particularly for
                    the financial sector. Through its flagship FUSE platform and
                    custom digital services, the company helps organizations
                    streamline complex workflows, integrate centralized data
                    management, and achieve scalable digital transformation.
                    </p>
                </div>
                </div>
            </div>
            </div>
        </section>


        
      </div>
    )    
}


