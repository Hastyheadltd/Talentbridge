"use client";
import { useUser } from "@/app/lib/UserContext";
import { auth } from "@/firebase.config";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import Swal from "sweetalert2";

export default function UserStatues() {
  const { user,logout } = useUser();
  const router = useRouter();

  //logout
  const handleLogout = async () => {
    try {
    await auth.signOut(); 
      logout(); 
      router.push('/login');
      Swal.fire({
        icon: 'success',
        title: 'Logged out successfully!',
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error('Logout error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Logout failed',
        text: 'Something went wrong. Please try again.',
      });
    }
  };


  return (
    <div>
      {!user ? (
        <div className="flex items-center gap-6 z-20">
          <Link href="/login">
            <button className="text-white rounded-[25px] text-[18px] py-3 px-8 bg-[#3271D2] ">
              Log In
            </button>
          </Link>
          <div className="dropdown dropdown-hover">
            <div tabIndex={0} role="button" className="text-white rounded-[25px] text-[18px] py-3 px-8 bg-black">
              Sign Up
            </div>
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
      ) : (
        <div className="flex items-center gap-2 relative z-50">
    <h1 className="text-[16px] font-semibold capitalize text-primary">{user?.username}</h1>
        <div className="dropdown dropdown-end">
         
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <Image
                src={
                  user?.photoURL
                    ? user.photoURL
                    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmHkj6-Tndku8K2387sMaBf2DaiwfBtHQw951-fc9zzA&s"
                }
                alt="user img"
                className="w-[56px] rounded-full h-[56px]"
                width={50}
                height={50}
              />
            </div>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
            <li>
              <Link href="/dashboard" className="justify-between">
                Dashboard
              </Link>
            </li>
           
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </div>
        </div>
      )}
    </div>
   
  );
}
