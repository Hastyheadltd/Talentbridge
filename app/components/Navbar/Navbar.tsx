import Link from 'next/link'
import React from 'react'
import UserStatues from './UserStatues'
import { div } from 'framer-motion/client'

export default function Navbar() {
  return (
    <div className='border-b'>
    <div className="navbar max-w-[1244px] mx-auto ">
    <div className="navbar-start">
     <Link href="/" >
  <img src="/logo.png" alt="logo" className='h-20' />
  </Link>
    </div>
    <div className="navbar-center hidden lg:flex gap-5">

    <Link href="/" className='text-[18px] text-secondary hover:text-primary  me-6 font-semibold leading-[28px] '>Home</Link>
      
        <Link href="#" className='text-[18px] text-secondary hover:text-primary  me-6 font-semibold leading-[28px] '>Jobs</Link>
      
    
    </div>
    <div className="navbar-end">
   <UserStatues/>
    </div>
  </div>
  </div>
  )
}
