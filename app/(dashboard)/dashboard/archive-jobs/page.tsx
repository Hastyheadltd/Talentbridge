import ArchivedJobs from '@/app/components/CompanyJobs/ArchivedJobs';
import { Metadata } from 'next';
import React from 'react'


export const metadata: Metadata = {
    title: "Archive Jobs | Flix Recruit",

  };
export default function page() {
  return (
    <div>
        <ArchivedJobs/>
    </div>
  )
}
