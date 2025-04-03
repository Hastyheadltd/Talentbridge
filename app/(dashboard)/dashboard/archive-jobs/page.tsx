import ArchivedJobs from '@/app/components/CompanyJobs/ArchivedJobs';
import { Metadata } from 'next';
import React from 'react'


export const metadata: Metadata = {
    title: "Archive Jobs | FlixRecruit",

  };
export default function page() {
  return (
    <div>
        <ArchivedJobs/>
    </div>
  )
}
