
import Profile from '@/app/components/Profile/FreelancerProfile/Profile'
import { Metadata } from 'next';
import React from 'react'
export const metadata: Metadata = {
    title: "Profile | Talent Bridge",
  
  };
export default function page() {

  return (
    <div>
       <Profile/>
    </div>
  )
}
