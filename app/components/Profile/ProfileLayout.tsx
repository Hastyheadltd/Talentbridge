"use client";
import { useUser } from '@/app/lib/UserContext';
import React from 'react'

export default function ProfileLayout() {
    const {user}= useUser();
  return (
    <div>
          Welcome  {user?.username || "Guest"} to Talent Bridge!
    </div>
  )
}
