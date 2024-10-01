import AllPostedJobs from '@/app/components/CompanyJobs/CompanyJobs';
import { Metadata } from 'next';
import React from 'react'


export const metadata: Metadata = {
    title: "Posted Jobs | Talent Bridge",

  };
export default function page() {
  return (
    <div>
        <h1 className='text-center mt-5  text-3xl font-semibold text-primary'>Posted Jobs</h1>
        <div className='max-w-[1000px] mx-auto'>
        <AllPostedJobs/>
        </div>
       
    </div>
  )
}
