import JobAlertForm from '@/app/components/Job-Alert/JobAlert';
import { Metadata } from 'next';
import React from 'react'
export const metadata: Metadata = {
    title: "Job ALert | Talent Bridge",

  };
export default function page() {
  return (
    <div><JobAlertForm/></div>
  )
}
