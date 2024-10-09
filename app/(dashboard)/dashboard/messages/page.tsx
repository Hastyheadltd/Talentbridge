import AllMessages from '@/app/components/Messages/AllMessages'
import { useUser } from '@/app/lib/UserContext';
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: "Messages | Talent Bridge",

};

export default function page() {
  return (
    <div>
      <AllMessages/>
    </div>
  )
}
