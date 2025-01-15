import ReferralProgram from '@/app/components/Referral/Referralprogram'
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
    title: "Referral Program | Talent Bridge",
  
  };
export default function page() {
  return (
    <div>
        <ReferralProgram/>
    </div>
  )
}
