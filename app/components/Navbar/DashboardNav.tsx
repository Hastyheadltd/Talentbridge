"use client"

import { useUser } from "@/app/lib/UserContext";
import { auth } from "@/firebase.config";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";


export default function DashboardNav() {
    const pathName = usePathname();
  const router = useRouter();
const {user}=useUser();
  const [loading, setLoading] = useState<boolean>(true);



  //logout
  const handleLogout = async () => {
    await auth.signOut(); 
    localStorage.removeItem('token');
    router.push('/login');
  
    Swal.fire({
      icon: "success",
      title: "Logged out successfully!",
      showConfirmButton: false,
      timer: 1500
    });
  };

    const navLinks = [
        { path: '/dashboard', name: 'Dashboard' },
        { path: '/jobs', name: 'Jobs' },
        { path: '/applicants', name: 'Applicants' },
        { path: '/find_talent', name: 'Find Talent' },
        { path: '/messages', name: 'Messages' },
      ];

// EmployerrNavlinks
const EmpnavLinks = [
  { path: '/dashboard', name: 'Home' },
  { path: '/dashboard/profile', name: 'Profile' },
  { path: '/dashboard/jobs', name: 'Jobs' },
  { path: '/dashboard/applied', name: 'Applied' },
  { path: '/dashboard/messages', name: 'Messages' },
];




  return (
    <div className='bg-[#121420]'>
        <div className='max-w-[1440px] mx-auto h-[96px]'>
        <div className="navbar pt-6 flex justify-between items-center ">
            {/* 1st part */}
  <div className="">
  <Link href="/" >
  <img src="/logo.png" alt="logo" className='h-[50px]' />
  </Link>
 
 {/* Empoyer Navlinks */}
      

          {user && user.role === "company" && (
                <div className=" ms-[50px] hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
    {navLinks.map((link, index) => (
                <Link key={index} href={link.path}>
                  <h1 className={pathName === link.path ? 'text-primary text-[18px] font-semibold mx-4' : 'text-white text-[18px] font-semibold mx-4'}>
                    {link.name}
                  </h1>
                </Link>
              ))}
    </ul>
    </div>
     )} 

{/* Employee Navlinks */}

{user && user.role === "freelancer" && (
                <div className=" ms-[50px] hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
    {EmpnavLinks.map((link, index) => (
                <Link key={index} href={link.path}>
                  <h1 className={pathName === link.path ? 'text-primary text-[18px] font-semibold mx-4' : 'text-white text-[18px] font-semibold mx-4'}>
                    {link.name}
                  </h1>
                </Link>
              ))}
    </ul>
    </div>
     )} 
 


  
  </div>
  {/* 2nd part */}
  <div className="flex justify-between gap-5 items-center">
  
   <div className='bg-white w-[0.5px] h-[22px]'></div>


  

  {/* Profile details with dropdown */}

<div className="dropdown dropdown-hover">
   <div tabIndex={0} role="button"  className='flex gap-5'>
   <Image 
  src={user?.photoURL ? user.photoURL : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmHkj6-Tndku8K2387sMaBf2DaiwfBtHQw951-fc9zzA&s"} 
  alt="user img"  
  className='w-[56px] rounded-full h-[56px]' 
  width={50}
  height={50}
/>

{/* employer name with company name */}
{user && user.role === "company" && (

    <div className='flex items-center flex-col gap-1'>
  <h1 className='text-[16px] text-white font-semibold  leading-[26px]'>{user?.username}</h1>

 
         <h1 className='text-[16px] text-white font-semibold leading-[26px]'>{user?.company_name}</h1>
 
    </div>
)}

{/* employee name */}

{user && user.role === "freelancer" && (

<h1 className='text-[16px] text-white font-semibold mt-3 leading-[26px]'>{user?.username}</h1>


)}


   </div>

   {/* dropdown  */}
   <ul tabIndex={0} className="dropdown-content z-[1] p-3   dashboard-box w-[190px]">
    <li> 
         <div  className='flex items-center justify-start gap-2'>
    <img 
  src={user?.photoURL ? user.photoURL : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmHkj6-Tndku8K2387sMaBf2DaiwfBtHQw951-fc9zzA&s"} 
  alt="user img"    className='w-[40px] rounded-full h-[40px]'/> 
    <div className='flex items-center flex-col justify-start'>
  <h1 className='text-[16px] text-[#121420] font-semibold leading-[26px]'>{user?.username}</h1>
  {user && user.role === "company" && (
          <h1 className='text-[12px] text-[#121420] font-semibold leading-[22px]'>{user?.company_name}</h1>     
     )} 
 
    </div>
   </div>
   </li>
   
    <li>
    {user && user.role === "company" && (
      <div>
         <li>
      <div className='dropdown-line  w-[158px] my-[14px]'></div>
    </li>
            <div className=" ">
             <p className='text-gray-400 text-[14px] leading-[22px]'>Recruit for</p>
             <h1 className='text-[16px] text-[#121420]  font-semibold leading-[26px]'>{user.company_name}</h1>
             <p className='text-gray-400 text-[14px] leading-[22px]'>Create new company</p>
    </div>
    </div>  
    
      
     )} 
    </li>
    <li>
      <div className='dropdown-line  w-[158px] my-[14px]'></div>
    </li>
    <li>
      <div>
      <p className='text-gray-400 text-[14px] pt-1 leading-[22px]'>Account Settings</p>
      <Link href="/profile">
      <p className='text-gray-400 text-[14px] pt-1 leading-[22px]'>Edit Profile</p>
      </Link>
    
      <p className='text-gray-400 text-[14px] pt-1 leading-[22px]'>Help</p>
      <button    onClick={handleLogout} className='text-gray-400 text-[14px] pt-1 leading-[22px]'>Log Out</button>
   
      </div>
      <li>
      <div className='dropdown-line  w-[158px] my-[14px]'></div>
    </li>
    <li>

    </li>
    </li>
  </ul>
</div>
  </div>
</div>
        </div>

    </div>
  )
}
