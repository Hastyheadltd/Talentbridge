"use client";

import { useUser } from "@/app/lib/UserContext";
import { RxDashboard } from "react-icons/rx";
import { TbUserEdit } from "react-icons/tb";
import { SlBriefcase } from "react-icons/sl";
import { TbBriefcaseOff } from "react-icons/tb";
import { GoPlusCircle } from "react-icons/go";
import { TbUsersGroup } from "react-icons/tb";
import { TbMessages } from "react-icons/tb";
import { BiBriefcaseAlt2 } from "react-icons/bi";
import { HiOutlineBellAlert } from "react-icons/hi2";
import Link from "next/link";

import { usePathname, useRouter } from "next/navigation";
import { FiPlusCircle } from "react-icons/fi";


const Sidebar = () => {
    const pathName = usePathname();
  const { user } = useUser();


  const navLinks = [
    { path: "/dashboard", name: "Dashboard" ,icon:<RxDashboard size={24}/>},
   
    { path: "/dashboard/edit-profile", name: "Edit Profile" ,icon:<TbUserEdit size={24}/> },
    { path: "/dashboard/active-jobs", name: "Active Jobs" , icon: <SlBriefcase size={24} /> },
    { path: "/dashboard/archive-jobs", name: "Archive Jobs" ,icon :<TbBriefcaseOff size={24} /> },
    { path: "/dashboard/job-post", name: "Post A Job" ,icon :<GoPlusCircle size={24} />},
    { path: "/dashboard/applicants", name: "Applicants" ,icon : <TbUsersGroup  size={24}/> },
    { path: "/dashboard/messages", name: "Messages" ,icon :<TbMessages  size={24}/>},
   
 
  ];

  // Employer Navlinks
  const EmpnavLinks = [
    { path: "/dashboard", name: "Dashboard" ,icon:<RxDashboard size={24}/>},
    { path: "/dashboard/edit-profile", name: "Edit Profile",icon:<TbUserEdit size={24}/> },
    { path: "/dashboard/jobs", name: "Jobs", icon: <SlBriefcase size={24}  /> },
    { path: "/dashboard/appliedjobs", name: "Applied Jobs", icon: <BiBriefcaseAlt2 size={24}  />},
    { path: "/dashboard/messages", name: "Messages" ,icon :<TbMessages  size={24}/>},
    { path: "/dashboard/job-alert", name: "Job Alert" ,icon: < HiOutlineBellAlert  size={24}/>},
    { path: "/dashboard/referral_program", name: "Referral Program",  icon: <FiPlusCircle  size={24}/> },
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
                          ? "text-black  text-[16px] flex items-center px-4 gap-4 bg-white py-3  rounded-full  my-3"
                          : "text-white text-[16px] flex items-center px-4 gap-4  py-5"
                      }
                    >
                   {link.icon}   {link.name}
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
