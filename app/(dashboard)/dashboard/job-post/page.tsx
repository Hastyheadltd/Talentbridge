import JobPostForm from '@/app/components/AddJobs/JobPost'
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
    title: "Post A Job | Flix Recruit",

  };
export default function page() {
  return (
    <div>
        <JobPostForm/>
    </div>
  )
}
