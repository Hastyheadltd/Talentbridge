import AllPostedJobs from '@/app/components/CompanyJobs/CompanyJobs';
import { Metadata } from 'next';
import React from 'react'


export const metadata: Metadata = {
    title: "Posted Jobs | Talent Bridge",

  };
export default function page() {
  return (
    <div>
        
        <AllPostedJobs/>
        
       
    </div>
  )
}
