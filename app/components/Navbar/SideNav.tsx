"use client";

import { useUser } from "@/app/lib/UserContext";
import { auth } from "@/firebase.config";
import { RxDashboard } from "react-icons/rx";
import { TbUserEdit } from "react-icons/tb";
import { SlBriefcase } from "react-icons/sl";
import { TbBriefcaseOff } from "react-icons/tb";
import { GoPlusCircle } from "react-icons/go";
import { TbUsersGroup } from "react-icons/tb";
import { TbMessages } from "react-icons/tb";
import Link from "next/link";

import { usePathname, useRouter } from "next/navigation";
import Swal from "sweetalert2";

const Sidebar = () => {
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
    { path: "/dashboard", name: "Dashboard" ,icon:<RxDashboard size={24}/>},
   
    { path: "/dashboard/edit-profile", name: "Edit Profile" ,icon:<TbUserEdit size={24}/> },
    { path: "/dashboard/jobs", name: "Active Jobs" , icon: <SlBriefcase size={24} /> },
    { path: "/dashboard/archive-jobs", name: "Archive Jobs" ,icon :<TbBriefcaseOff size={24} /> },
    { path: "/dashboard/job-post", name: "Post A Job" ,icon :<GoPlusCircle size={24} />},
    { path: "/dashboard/applicants", name: "Applicants" ,icon : <TbUsersGroup  size={24}/> },
    { path: "/dashboard/messages", name: "Messages" ,icon :<TbMessages  size={24}/>},
   
 
  ];

  // Employer Navlinks
  const EmpnavLinks = [
    { path: "/dashboard", name: "Dashboard" },
    { path: "/dashboard/edit-profile", name: "Edit Profile" },
    { path: "/jobs", name: "Jobs" },
    { path: "/dashboard/appliedjobs", name: "Applied Jobs" },
    { path: "/dashboard/messages", name: "Messages" },
    { path: "/dashboard/job-alert", name: "Job Alert" },
    { path: "/dashboard/referral_program", name: "Referral Program" },
  ];


  return (
    <aside className="sticky top-0 h-screen w-[240px] hidden lg:block bg-[#0C34E4]  z-10">
      <div className="p-5">
        <Link href="/">
        <h1 className='text-black text-center mb-2 w-[208px] py-[2px] bg-white rounded-[15px]  text-[32px] font-bold'> <span className='text-primary'>Flix</span>Recruit</h1>
        </Link>
        <nav>
         
 {/*  dashboard */}
 <div className='mt-11'>



            {/* Employer Navlinks */}
            {user && user.role === "company" && (
              <div className="  lg:flex ">
                <ul className="space-y-4 ">
                  {navLinks.map((link, index) => (
                    <Link key={index} href={link.path}>
                      <li
                        className={
                          pathName === link.path
                            ? "text-black  text-[16px] flex items-center px-8 gap-4 bg-white py-3  rounded-full  my-3"
                            : "text-white text-[16px] flex items-center px-4 gap-4  mx-4 py-5"
                        }
                      >
                     {link.icon}   {link.name}
                      </li>
                    </Link>
                  ))}
                </ul>
              </div>
            )}

            {/* Employee Navlinks */}
            {user && user.role === "freelancer" && (
              <div className=" hidden lg:flex">
                <ul className=" space-y-4">
                  {EmpnavLinks.map((link, index) => (
                    <Link key={index} href={link.path}>
                      <li
                        className={
                          pathName === link.path
                            ? "text-white  text-[18px] font-semibold mx-4"
                            : "text-white text-[18px] font-semibold mx-4"
                        }
                      >
                        {link.name}
                      </li>
                    </Link>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
