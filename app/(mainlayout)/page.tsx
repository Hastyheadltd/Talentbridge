import { Metadata } from 'next';
import React from 'react'
import HeroSection from '../components/Home/Herosection';
import HiringProcess from '../components/Home/HiringProcess';
import ExpertiseGrid from '../components/Home/Expertise';
import Reviews from '../components/Home/Reviews';
import HighlightSection from '../components/Home/HighlightSection';

export const metadata: Metadata = {
    title: "Home | Flix Recruit",

  };
export default function page() {
  return (
    <div>
      <HeroSection/>
      <ExpertiseGrid/>
      <HighlightSection/>
      <HiringProcess/>
      <Reviews/>
    </div>
  )
}
