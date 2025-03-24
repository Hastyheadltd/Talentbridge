"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "@/app/lib/UserContext";
import { useRouter } from "next/navigation";

import Link from "next/link";
import { CompanyProfileData } from "../../type/Profile";
import Applicants from "./Applicants";
import Jobs from "./Jobs";

const CompanyDashboard: React.FC = () => {
  const { user } = useUser();
  const [companyData, setCompanyData] = useState<CompanyProfileData | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/users/${user?._id}`);
        const Userdata = response.data;
        const data = Userdata?.user;

        if (data.role === "company") {
          setCompanyData({
            companyName: data.companyName,
            logoURL: data.logoURL,
            about: data.about,
            mission: data.mission,
            vision: data.vision,
            location: data.location,
            website: data.website,
            linkedin: data.linkedin,
            employers: data.employers,
            industry: data.industry,
            founded: data.founded,
          });
        }
      } catch (error) {
        console.error("Error fetching company data:", error);
      }
    };

    if (user?._id) {
      fetchCompanyData();
    }
  }, [user?._id]);

  if (!companyData) {
    return <div>Loading...</div>;
  }

  return (
    <div className=" mt-5 mb-11 w-full pe-7 ">
      <h1 className="text-[24px] font-semibold text-black text-center   mb-6">Welcome <span className="text-primary"> {user?.username}</span> to Your Company Dashboard</h1>

<div className="flex  gap-5">
{/* left side */}
<div className="lg:w-2/3">
  {/* info */}
  <div className="border border-[#151515] rounded-[8px] w-full px-5 py-6">
    <div className=" flex items-center gap-5">

   
    <div className="w-[108px] h-[107px] bg-gray-200 p-1 rounded-full">
  {companyData.logoURL && (
              <img
                src={companyData.logoURL}
                alt="Company Logo"
                className=" object-cover w-full h-full rounded-full "
              />
            )}
            </div>
            <div>
            <h3 className="text-[28px] text-[#031700] font-bold">{companyData.companyName}</h3>
            <p className="text-[#151515] text-[14px] pt-1"> <span className="text-[#596258]">Location: </span>{companyData.location}</p>
            </div>
            </div>

            <div className="flex justify-between items-center mt-5">
            <a
                href={companyData.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1F66E4] text-[18px] hover:underline"
              >
                {companyData.website}
              </a>
              <div className="flex items-center gap-4">
               <Link href={companyData.linkedin}>
               <button className="text-[#151515] hover:shadow-lg text-[14px] px-4 py-2 border border-[#151515] rounded-md">Linkedin Profile </button>
               </Link>
               <Link href="/dashboard/edit-profile">
               <button className="text-white hover:shadow-lg text-[14px] px-6 py-2 bg-[#1F66E4] border border-[#1F66E4] rounded-md">Edit Profile </button>
               </Link>
              </div>
              
            </div>

  </div>

  <div className="flex my-5 justify-between items-center gap-5">
    <div className="border border-black p-3 rounded-md w-full">
   <p className="text-black text-[16px] trackng-[-1px] text-center">Employers</p>
   <p className="text-[18px] text-center text-black py-1">{companyData.employers} +</p>
    </div>
    <div className="border border-black p-3 rounded-md w-full">
   <p className="text-black text-[16px] trackng-[-1px] text-center">Industry</p>
   <p className="text-[18px] text-center text-black py-1">{companyData.industry} </p>
    </div>
    <div className="border border-black p-3 rounded-md w-full">
   <p className="text-black text-[16px] trackng-[-1px] text-center">Founded</p>
   <p className="text-[18px] text-center text-black py-1">{companyData.founded}</p>
    </div>

  </div>

  {/* about mission vission */}

  <div className="border border-[#151515] mt-5 rounded-[8px] w-full  px-5 py-6">
<h1 className=" text-[20px] text-black font-bold tracking-[-1px] ">About the Company</h1>
<p className="mt-3 text-[16px] leading-[24px] text-black">{companyData.about}</p>

<h1 className=" text-[20px] text-black font-bold tracking-[-1px] mt-5 ">Mission</h1>
<p className="mt-3 text-[16px] leading-[24px] text-black">{companyData.mission}</p>

<h1 className=" text-[20px] text-black font-bold tracking-[-1px] mt-5 ">Vision</h1>
<p className="mt-3 text-[16px] leading-[24px] text-black">{companyData.vision}</p>
  </div>
</div>
{/* right side */}
<div className="w-1/3 border border-[#151515] p-6 rounded-md ">
 {/* application */}
 <Applicants/>
  {/* posted jobs */}
  <Jobs/>
</div>
</div>
      

     
   
    </div>
  );
};

export default CompanyDashboard;
