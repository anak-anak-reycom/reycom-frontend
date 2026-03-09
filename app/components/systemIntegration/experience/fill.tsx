import React from 'react'
import { ClientExperience } from './client'

export default function FillExperience () {
    return (
      <div className='mx-auto max-w-[1000px] my-8 p-4'>
        <div className='mt-8'>
            <h1 className='text-start font-bold text-4xl'>Customer Communication Management</h1>
                <p className='mt-8 text-[16px] '>
                A Document Management System (DMS) serves as a versatile, centralized image and file repository that
                streamlines operations across diverse industries by consolidating all manuals and documents into a single, accessible
                location. By enabling users to search easily via specific properties or content keywords, it eliminates the friction
                of information retrieval, while simultaneously facilitating secure sharing of sensitive data at any time and from
                any location. Furthermore, its robust security framework allows organizations to define precise access permissions, ensuring
                that critical business intelligence remains protected while remaining highly functional for a multi-industry workforce.
                </p>
        </div>

        <div className='mt-8'>
            <h1 className='text-start font-bold text-4xl'>Interactive & personalized video</h1>
                <p className='mt-8 text-[16px] '>
                    OCR is needed to recognize printed and handwrittent text in image file – either in structured (fix form) 
                or unstructed document (invoice, bank statement, agreement, etc.). OCR is defined as traditional zoning OCR and OCR Cognitive
                using AI engine. By using OCR Cognitive combine with RPA (Robotic Process Automation) this solution become INTELLIGENT DOCUMENT SYSTEM.
                </p>
        </div>

        <div className='mt-8'>
            <h1 className='text-start font-bold text-4xl '>Omnichannel Dashboard</h1>
                <p className='mt-8 text-[16px] '>
                    In a business organization, Document Workflow System can ensure every task is performed by the right people on time.
                It used to generate, track, edit, and approve documents associated with business processes. It can be done anywhere at any device..
                </p>
        </div>

        <div className='mt-8'>
            <h2 className='text-2xl font-semibold'>Our <span className='text-accent'>Client</span></h2>
          <ClientExperience/>
        </div>
      </div>
    )    
}


