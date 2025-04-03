
import JobDetails from '@/app/components/FreelancerJobs/JobDetails';
import { Metadata } from 'next';
import React from 'react'


export const metadata: Metadata = {
    title: "Job Details | FlixRecruit",

  };
export default function page() {
  return (
    <div>
        <JobDetails/>
    </div>
  )
}
