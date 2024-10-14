"use client";

import { useUser } from "@/app/lib/UserContext";
import { auth } from "@/firebase.config";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function DashboardNav() {
  const pathName = usePathname();
  const router = useRouter();
  const { user,logout } = useUser();


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

  const navLinks = [
    { path: "/dashboard", name: "Dashboard" },
   
    { path: "/dashboard/edit-profile", name: "Edit Profile" },
    { path: "/dashboard/jobs", name: "Active Jobs" },
    { path: "/dashboard/archive-jobs", name: "Archive Jobs" },
    { path: "/dashboard/job-post", name: "Post A Job" },
    { path: "/dashboard/applicants", name: "Applicants" },
    { path: "/dashboard/messages", name: "Messages" },
 
  ];

  // Employer Navlinks
  const EmpnavLinks = [
    { path: "/dashboard", name: "Dashboard" },
    { path: "/dashboard/edit-profile", name: "Edit Profile" },
    { path: "/jobs", name: "Jobs" },
    { path: "/dashboard/appliedjobs", name: "Applied Jobs" },
    { path: "/dashboard/messages", name: "Messages" },
  ];

  return (
    <div className="bg-[#121420]">
      <div className="max-w-[1440px] mx-auto h-[96px]">
        <div className="navbar pt-6 flex justify-between items-center">
          {/* 1st part */}
          <div>
            <Link href="/">
              <img src="/logo.png" alt="logo" className="h-[50px]" />
            </Link>

            {/* Employer Navlinks */}
            {user && user.role === "company" && (
              <div className="ms-[50px] hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                  {navLinks.map((link, index) => (
                    <Link key={index} href={link.path}>
                      <h1
                        className={
                          pathName === link.path
                            ? "text-primary text-[18px] font-semibold mx-4"
                            : "text-white text-[18px] font-semibold mx-4"
                        }
                      >
                        {link.name}
                      </h1>
                    </Link>
                  ))}
                </ul>
              </div>
            )}

            {/* Employee Navlinks */}
            {user && user.role === "freelancer" && (
              <div className="ms-[50px] hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                  {EmpnavLinks.map((link, index) => (
                    <Link key={index} href={link.path}>
                      <h1
                        className={
                          pathName === link.path
                            ? "text-primary text-[18px] font-semibold mx-4"
                            : "text-white text-[18px] font-semibold mx-4"
                        }
                      >
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
            <div className="bg-white w-[0.5px] h-[22px]"></div>

            {/* Profile details with dropdown */}
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
