import AllJobs from '@/app/components/AllJobs/AllJobs'
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
    title: "All Jobs | Flix Recruit",

  };
export default function page() {
  return (
    <div>
        <AllJobs/>
    </div>
  )
}
