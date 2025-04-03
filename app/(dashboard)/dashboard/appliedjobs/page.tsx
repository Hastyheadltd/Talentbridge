import MyApplications from '@/app/components/Applications/AppliedApplicationsUser';
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
    title: "Applied Jobs | Flix Recruit",

  };
export default function page() {
  return (
    <div>
        <MyApplications/>
    </div>
  )
}
