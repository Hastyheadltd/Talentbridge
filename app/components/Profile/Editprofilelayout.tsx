"use client";
import { useUser } from '@/app/lib/UserContext'
import React from 'react'
import CompanyProfileForm from './CompanyProfile/Update-Profile';
import JobSeekerProfileForm from './FreelancerProfile/Update-Profile';

export default function Editprofilelayout() {
    const {user}= useUser();
  return (
    <div>
         {user && user.role === "freelancer" && (
              <JobSeekerProfileForm/>     
                  
                )}
                 {user && user.role === "company" && (
           <CompanyProfileForm/>   
                  
                )}
    </div>
  )
}
