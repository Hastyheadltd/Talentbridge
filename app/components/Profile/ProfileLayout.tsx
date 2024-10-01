"use client";
import { useUser } from '@/app/lib/UserContext';
import React from 'react'
import ProfessionalProfileForm from './FreelancerProfile/Profile';

export default function ProfileLayout() {
    const {user}= useUser();
  return (
    <div>
         <ProfessionalProfileForm />
    </div>
  )
}
