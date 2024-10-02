import MyApplications from '@/app/components/Applications/AppliedApplicationsUser';
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
    title: "Applied Jobs | Talent Bridge",

  };
export default function page() {
  return (
    <div>
        <MyApplications/>
    </div>
  )
}
