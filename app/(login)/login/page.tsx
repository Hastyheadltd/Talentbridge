import Login from '@/app/components/Login/Login';
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
    title: "Login | Flix Recruit",

  };

export default function page() {
  return (
    <div >
        <Login/>
    </div>
  )
}
