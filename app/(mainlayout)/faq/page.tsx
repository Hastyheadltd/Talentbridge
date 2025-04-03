import Faq from '@/app/components/Faq/Faq'
import { Metadata } from 'next';
import React from 'react'


export const metadata: Metadata = {
  title: "FAQ | Flix Recruit",

};
export default function page() {
  return (
    <div>
      <Faq/>
    </div>
  )
}
