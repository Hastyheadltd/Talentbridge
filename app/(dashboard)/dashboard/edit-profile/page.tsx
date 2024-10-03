
import Editprofilelayout from '@/app/components/Profile/Editprofilelayout';
import { Metadata } from 'next';
import React from 'react'
export const metadata: Metadata = {
    title: "Edit Profile | Talent Bridge",

  };
export default function page() {
  return (
    <div>
      <Editprofilelayout/>
    </div>
  )
}
