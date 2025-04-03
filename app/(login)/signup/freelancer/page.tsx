import SignUp from '@/app/components/Signup/Freelancer/SignUp'
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
    title: "Sign Up | Flix Recruit",

  };


export default function page() {
  return (
    <div>
        <SignUp/>
    </div>
  )
}
