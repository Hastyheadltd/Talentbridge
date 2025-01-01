import { Metadata } from 'next';
import React from 'react'
import HeroSection from '../components/Home/Herosection';
import HiringProcess from '../components/Home/HiringProcess';
import ExpertiseGrid from '../components/Home/Expertise';
import Reviews from '../components/Home/Reviews';

export const metadata: Metadata = {
    title: "Home | Talent Bridge",

  };
export default function page() {
  return (
    <div>
      <HeroSection/>
      <ExpertiseGrid/>
      <HiringProcess/>
      <Reviews/>
    </div>
  )
}
