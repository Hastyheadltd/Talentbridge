

import ProfileLayout from '@/app/components/Profile/ProfileLayout';
import { Metadata } from 'next';
import React from 'react'
export const metadata: Metadata = {
    title: "Profile | FlixRecruit",
  
  };
export default function page() {

  return (
    <div>
    <ProfileLayout/>
    </div>
  )
}
