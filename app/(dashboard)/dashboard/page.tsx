import Dashboard from '@/app/components/Dashboard/FreelancerDashboard/Dashboard';
import { Metadata } from 'next';
import React from 'react'
export const metadata: Metadata = {
  title: "Dashboard | Talent Bridge",

};
export default function page() {
  return (
    <div>
  <Dashboard/>
    </div>
  )
}
