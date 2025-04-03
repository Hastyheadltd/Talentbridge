
import { Metadata } from 'next';
import React from 'react'
import ReferralProgram from '@/app/components/Referral/Referralprogram'

export const metadata: Metadata = {
    title: "Referral Program | Flix Recruit",
  
  };
export default function page() {
  return (
    <div>
        <ReferralProgram/>
    </div>
  )
}
