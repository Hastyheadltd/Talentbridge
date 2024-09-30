import { Metadata } from 'next';
import React from 'react'
import HeroSection from '../components/Home/Herosection';

export const metadata: Metadata = {
    title: "Home | Talent Bridge",

  };
export default function page() {
  return (
    <div>
      <HeroSection/>
    </div>
  )
}
