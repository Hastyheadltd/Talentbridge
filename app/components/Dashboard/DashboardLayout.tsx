"use client";
import { useUser } from '@/app/lib/UserContext'
import React from 'react'
import Dashboard from './FreelancerDashboard/Dashboard';
import DashboardCompany from './CompanyDashboard/DashboardCompany';

export default function DashboardLayout() {
    const {user} = useUser();
  return (
    <div>
          {user && user.role === "freelancer" && (
              <Dashboard/>     
                  
                )}
                 {user && user.role === "company" && (
          <DashboardCompany />
                )}
    </div>
  )
}
