"use client";
import { useUser } from '@/app/lib/UserContext';
import React from 'react'

import JobSeakerprofile from './FreelancerProfile/JobSeakerprofile';
import CompanyProfileForm from './CompanyProfile/Company_profile';



export default function ProfileLayout() {
    const {user}= useUser();
  return (
    <div>
        {user && user.role === "freelancer" && (
              <JobSeakerprofile/>     
                  
                )}
                 {user && user.role === "company" && (
           <CompanyProfileForm/>   
                  
                )}
    </div>
  )
}
