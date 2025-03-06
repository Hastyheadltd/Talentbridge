
import DashboardLayout from '@/app/components/Dashboard/DashboardLayout';
import { Metadata } from 'next';
import React from 'react'
export const metadata: Metadata = {
  title: "Dashboard | Talent Bridge",

};

export default function page() {
  return (
    <div>
  <DashboardLayout/>
    </div>
  )
}
