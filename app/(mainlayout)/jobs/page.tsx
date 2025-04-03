import AllJobs from '@/app/components/AllJobs/AllJobs'
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
    title: "All Jobs | FlixRecruit",

  };
export default function page() {
  return (
    <div>
        <AllJobs/>
    </div>
  )
}
