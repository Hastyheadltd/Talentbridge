
import FreelancerJobs from '@/app/components/FreelancerJobs/FreelancerJobs';
import { Metadata } from 'next';
import React from 'react'
export const metadata: Metadata = {
    title: "All Jobs | Flix Recruit",

  };
export default function page() {
  return (
    <div className=''>
     <FreelancerJobs/>
    </div>
  )
}
