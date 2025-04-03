
import DashboardLayout from '@/app/components/Dashboard/DashboardLayout';
import { Metadata } from 'next';
import React from 'react'
export const metadata: Metadata = {
  title: "Dashboard | Flix Recruit",

};

export default function page() {
  return (
    <div>
  <DashboardLayout/>
    </div>
  )
}
