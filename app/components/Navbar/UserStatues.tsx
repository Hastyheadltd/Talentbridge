import Link from 'next/link'
import React from 'react'

export default function UserStatues() {
  return (
    <div>
            <Link href='/login'> <button className='text-[18px] text-secondary hover:text-primary  me-6 font-semibold leading-[28px] '>Log In</button> </Link>
    <div className="dropdown dropdown-hover">
    <div tabIndex={0} role="button" className="btn bg-primary text-white hover:bg-blue-800">Sign Up</div>
    <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
      <li>
        <Link href="/signup/freelancer">
        <h1>Freelancer</h1>
        </Link>
      </li>
      <li>
        <Link href="/signup/company">
        <h1>Company</h1>
        </Link>
      </li>
    </ul>
  </div>
    </div>
  )
}
