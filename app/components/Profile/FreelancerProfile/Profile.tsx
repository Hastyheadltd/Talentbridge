"use client";
import { useUser } from '@/app/lib/UserContext'
import React from 'react'

export default function Profile() {
    const {user}= useUser();
  return (
    <div>
         <h1>
            Welcome  {user?.username || "Guest"} to Talent Bridge!
        </h1>
    </div>
  )
}
