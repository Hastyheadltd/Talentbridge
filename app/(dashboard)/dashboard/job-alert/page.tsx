import JobAlertForm from '@/app/components/Job-Alert/JobAlert';
import { Metadata } from 'next';
import React from 'react'
export const metadata: Metadata = {
    title: "Job Alert | Flix Recruit",

  };
export default function page() {
  return (
    <div><JobAlertForm/></div>
  )
}
