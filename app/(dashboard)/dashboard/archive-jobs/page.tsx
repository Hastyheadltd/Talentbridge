import ArchivedJobs from '@/app/components/CompanyJobs/ArchivedJobs';
import { Metadata } from 'next';
import React from 'react'


export const metadata: Metadata = {
    title: "Archive Jobs | Talent Bridge",

  };
export default function page() {
  return (
    <div>
        <ArchivedJobs/>
    </div>
  )
}
