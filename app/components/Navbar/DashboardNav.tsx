"use client";

import { useUser } from "@/app/lib/UserContext";
import { auth } from "@/firebase.config";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { IoIosNotificationsOutline } from "react-icons/io";
import { RiArrowDropDownLine } from "react-icons/ri";

export default function DashboardNav() {
  const router = useRouter();
  const { user, logout } = useUser();
  const pathName = usePathname();

  // Logout function
  const handleLogout = async () => {
    try {
      await auth.signOut();
      logout();
      router.push("/login");
      Swal.fire({
       
        title: "Logged out successfully!",
        background: '#000',  
        color: '#fff',  
    showConfirmButton: false,
    timer: 1000
      
      });
    } catch (error) {
      console.error("Logout error:", error);
      Swal.fire({
       
        title: "Logout failed",
        text: "Something went wrong. Please try again.",
        background: '#000',  
        color: '#fff',  
    showConfirmButton: false,
    timer: 1000
      });
    }
  };

  const pageTitles: { [key: string]: string } = {
    "/dashboard": "Dashboard",
    "/dashboard/edit-profile": "Edit Your Profile",
    "/dashboard/jobs": "Job Board",
    "/dashboard/active-jobs": "Active Jobs",
    "/dashboard/job-post": "Post a Job",
    "/dashboard/archive-jobs": "Archived Jobs",
    "/dashboard/applicants": "Applicants",
    "/dashboard/messages": "Messages",
   "/dashboard/appliedjobs" : "Applied Jobs",
    "/dashboard/job-alert": "Job Alert",
    "/dashboard/referral_program": "Referral Program",
  };

  // Handle dynamic job ID routes
  let pageTitle = "Dashboard";
  if (pageTitles[pathName]) {
    pageTitle = pageTitles[pathName];
  } else if (pathName.startsWith("/dashboard/jobs/")) {
    pageTitle = "Job Board";
  } else {
    pageTitle = pathName
      .replace("/dashboard/", "")
      .replace("-", " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  }

  return (
    <div className="bg-white">
      <div className="w-full mx-auto h-[80px] border-b border-black/10">
        <div className="navbar px-10 py-3 flex justify-between items-center">
          {/* 1st part */}
          <div>
            <h1 className="text-[32px] font-bold text-black ps-5">{pageTitle}</h1>
          </div>

          {/* 2nd part */}
          <div className="flex justify-between gap-4 items-center">
            <div className="w-[32px] h-[32px] rounded-full border flex justify-center items-center">
              <IoIosNotificationsOutline size={20} />
            </div>

            <div className="bg-black/10 w-[0.5px] h-[25px] mx-2"></div>
            <div className="flex items-center gap-2">
              <Image
                src={
                  user?.photoURL
                    ? user.photoURL
                    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmHkj6-Tndku8K2387sMaBf2DaiwfBtHQw951-fc9zzA&s"
                }
                alt="user img"
                className="w-[40px] rounded-full h-[40px]"
                width={50}
                height={50}
              />
              <p className="text-black text-[14px] font-bold">{user?.username}</p>
            </div>

            {/* Profile details with dropdown */}
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="w-5 h-5 border rounded-full flex justify-center items-center"
              >
                <RiArrowDropDownLine size={24} />
              </div>

              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link href="/" className="justify-between">
                    Home
                  </Link>
                </li>
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
        </div>
      </div>
    </div>
  );
}
