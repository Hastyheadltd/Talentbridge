import AllMessages from '@/app/components/Messages/AllMessages'
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: "Messages | FlixRecruit",

};

export default function page() {
  return (
    <div>
      <AllMessages/>
    </div>
  )
}
