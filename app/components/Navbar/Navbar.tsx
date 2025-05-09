'use client'

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import UserStatues from './UserStatues'
import Image from 'next/image';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
    
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={` w-full transition-all duration-300 ease-in-out z-50 ${isScrolled ? 'hidden ' : 'top-5 fixed'}`} >
      <div className="navbar max-w-[1340px] px-5 flex justify-between items-center bg-white rounded-[20px]  mx-auto z-10">
        <div>
          <Link href="/">
           <Image src="/logo.png" alt="logo " width={200} height={150}/>
          </Link>
          </div>
          <div className='space-x-16'>
          <Link
            href="/"
            className='text-[22px] capitalize text-black hover:text-primary me-6  leading-[28px]'
          >
            Home
          </Link>

          <Link
            href="/jobs"
            className='text-[22px] capitalize text-black hover:text-primary me-6 leading-[28px]'
          >
            Jobs
          </Link>
          <Link
            href="/faq"
            className='text-[22px] capitalize text-black hover:text-primary me-6  leading-[28px]'
          >
            FAQ
          </Link>
      
          </div>
          <div className='space-x-6'>
       
          <Link
            href="https://calendly.com/vladgoihman/30min"
            target="_blank"
            rel="noopener noreferrer"
            className='bg-primary text-[18px] text-white px-6 py-3 rounded-[12px] '
          >
            Book A Call
          </Link>

          <UserStatues />
          </div>
      
      </div>
    </div>
  );
}