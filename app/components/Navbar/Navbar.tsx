import Link from 'next/link'
import React from 'react'
import UserStatues from './UserStatues'

export default function Navbar() {
  return (
    <div className='border-b'>
      <div className="navbar max-w-[1244px] mx-auto z-10">
        <div className="navbar-start">
          <Link href="/" >
            <img src="/logo.png" alt="logo" className='h-20' />
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex gap-5">
          <Link
            href="/"
            className='text-[18px] text-secondary hover:text-primary me-6 font-semibold leading-[28px]'
          >
            Home
          </Link>

          <Link
            href="/jobs"
            className='text-[18px] text-secondary hover:text-primary me-6 font-semibold leading-[28px]'
          >
            Jobs
          </Link>
        </div>
        <div className="navbar-end flex gap-4">
          
          <Link
            href="https://calendly.com/vladgoihman/30min"
            target="_blank"
            rel="noopener noreferrer"
            className='border-primary border-2 px-5 py-[10px] font-semibold text-[16px] text-primary rounded-[12px]'
          >
            Book Call
          </Link>

          <UserStatues/>
        </div>
      </div>
    </div>
  )
}
