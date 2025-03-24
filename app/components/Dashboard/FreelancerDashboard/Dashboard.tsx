"use client";
import React from "react";
import { useUser } from "@/app/lib/UserContext";
import { useRouter } from "next/navigation";
import { Experience } from "../../type/User";
import Link from "next/link";

const Dashboard: React.FC = () => {
  const { user } = useUser();
  const router = useRouter();

  return (
    <div className=" mt-5 mb-11 w-full pe-7">
    <h1 className="text-[24px] font-semibold text-black text-center   mb-6">Welcome <span className="text-primary"> {user?.username}</span> to Your Freelancer Dashboard</h1>

    <div className="flex  gap-5">
    <div className="lg:w-2/3">
 {/* info */}

    <div className="border border-[#151515] rounded-[8px] w-full px-5 py-6">
    <div className=" flex items-center gap-5">

   
    <div className="w-[108px] h-[107px] bg-gray-200 p-1 rounded-full">
    <img
              src={
                user?.photoURL
                  ? user.photoURL
                  : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmHkj6-Tndku8K2387sMaBf2DaiwfBtHQw951-fc9zzA&s"
              }
              alt="Profile"
              className="w-full h-full rounded-full object-cove"
            />
            </div>
            <div>
            <h3 className="text-[28px] text-[#031700] font-bold">{user?.username}</h3>
            <p className="text-[#151515] text-[14px] pt-1"> <span className="text-[#596258]">Location: </span>{user?.location}</p>
            </div>
            
            </div>

            <div className="flex justify-between items-center mt-5">
            <div className="flex items-center gap-4">
            <a
                href={user?.portfolio}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1F66E4] text-[16px] underline"
              >
                Portfolio Website
              </a>
              <p className="text-[#1F66E4] text-[16px] hover:underline">{user?.phone}</p>
            </div>
              <div className="flex items-center gap-4">
              <a href= {user?.linkedin} target="_blank">
               <button className="text-[#151515] hover:shadow-lg text-[14px] px-4 py-2 border border-[#151515] rounded-md">Linkedin Profile </button>
               </a>
               <Link href="/dashboard/edit-profile">
               <button className="text-white hover:shadow-lg text-[14px] px-6 py-2 bg-[#1F66E4] border border-[#1F66E4] rounded-md">Edit Profile </button>
               </Link>
              </div>
              
            </div>

  </div>
   {/* bio & skill */}
   <div className="border mt-5 border-[#151515] rounded-[8px] w-full px-5 py-6">
  <h1 className="text-[20px] font-semibold ">Bio:</h1>
  <p className="mt-3 text-black text-[16px]">{user?.bio}</p>

  <h1 className="text-[20px] mt-4 font-semibold ">Skills: </h1>
  <div className="flex flex-wrap mt-3">
            {user?.skills?.map((skill: string, index: number) => (
              <span
                key={index}
                className=" py-1 border border-black/50 px-3 rounded-full mr-2 mb-2 text-[14px] font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
</div>
       

      
      

        {/* Experience Section */}
        <div className="mt-4">
          <h2 className="text-[20px]  font-semibold">Experience</h2>
          {Array.isArray(user?.experience) && user?.experience.length > 0 ? (
            user.experience.map((exp: Experience, index: number) => (
              <div key={index} className="border border-black/50 p-4 rounded-[12px] mt-4 mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {exp.company} - {exp.location}
                </h3>
                <p className="text-gray-800">
                  {exp.position} 
                </p>
                <p className="text-gray-500">
                  {exp.joinDate} to {exp.current ? "Present" : exp.endDate}
                </p>
                <p className="mt-2 text-gray-700">{exp.description}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No experience added yet.</p>
          )}
        </div>
      </div>
      {/* resume */}
      <div className="w-1/3">
     <div className="border border-[#151515] rounded-[8px] w-full px-5 py-6">

        {/* Resume Section */}
        {user?.resumeURL && (
          <div className="">
          
            <iframe
          src={user?.resumeURL}
          width="100%"
          height="500px"
          className="mb-5 rounded-md"
        />
            <a
              href={user?.resumeURL}
              className="text-[#0C34E4]  py-2 border border-[#0C34E4] rounded-md flex justify-center w-[120px] text-[16px] mx-auto mt-5"
              target="_blank"
              rel="noopener noreferrer"
            >
              Open Resume
            </a>
          </div>
        )}
   
     </div>
      </div>
      </div>
      </div>

  );
};

export default Dashboard;
