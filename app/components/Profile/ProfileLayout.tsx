"use client";
import { useUser } from '@/app/lib/UserContext';
import React from 'react'
import JobSeekerProfileForm from './FreelancerProfile/Profile';
import Profile from './CompanyProfile/Profile';


export default function ProfileLayout() {
    const {user}= useUser();
  return (
    <div>
        {user && user.role === "freelancer" && (
              <JobSeekerProfileForm/>     
                  
                )}
                 {user && user.role === "company" && (
              <Profile/>    
                  
                )}
    </div>
  )
}
