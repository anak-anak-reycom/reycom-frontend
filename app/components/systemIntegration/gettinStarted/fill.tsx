import React from 'react'
import Image from 'next/image'

export default function FillStarted () {
    return (
      <div className='mx-auto max-w-[1000px] my-8 p-4 flex justify-center'>
        <div>
        <h2 className='text-2xl font-semibold flex justify-center'><span className='text-secondary font-playfair'>RDS</span> System Integration</h2>
        <div className='flex justify-center'>
         <Image src="/systemIntegration/gettinStarted/bion.png" alt="bion" width={250} height={250} className='py-6' />
        </div>
        
        <p className='text-sm text-gray-700 leading-relaxed text-center '>BION – RDS System Integrator is present as the business focus of the RDS Group to provide comprehensive information technology-based services armed with experience in several industries, such as insurance, 
            banking, government institutions, encouraging BION to provide innovative solutions that are continuously updated along with technological developments, customer needs and tailored with market changes. </p>
        </div>
      </div>
    )    
}


