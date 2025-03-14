"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "@/app/lib/UserContext";
import Link from "next/link";
import { ApplicationType } from "../type/Applications";
import { CiLocationOn } from "react-icons/ci";
import { IoBriefcaseOutline } from "react-icons/io5";
import { GoClock } from "react-icons/go";



const MyApplications: React.FC = () => {
  const [applications, setApplications] = useState<ApplicationType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useUser();

  useEffect(() => {
    const fetchApplications = async () => {
      if (!user) {
        setError("Please login to view your applications.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/applications/users`, {
          params: { userId: user._id }, 
        });
        setApplications(response.data);
      } catch (error) {
        console.error("Error fetching applications:", error);
        setError("Failed to load applications.");
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchApplications(); 
    }
  }, [user]); 

  if (loading) {
    return <div className="text-center pt-10">Loading applications...</div>;
  }

  if (error) {
    return <div className="text-center pt-10">{error}</div>;
  }

  if (applications.length === 0) {
    return <div className="text-center pt-10">You haven&#39;t applied for any jobs yet.</div>;
  }

  return (
    <div className="max-w-[950px] mx-auto mt-12 p-6">
      <h1 className="text-4xl font-bold text-primary mb-8 text-center">List of Applied Jobs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {applications.map((application) => (
          <div key={application.jobId} className=" w-[303px] mb-4">




<div className=" p-6 bg-[#031830] text-white border border-gray-700 rounded-2xl  hover:shadow-md hover:shadow-blue-900 transition-all duration-300">
            <h2 className="text-[16px] font-semibold mb-3 h-[50px] line-clamp-2">{application.jobTitle}</h2>

            <div className="flex items-center justify-end mb-3 text-[#CACACA]">
              <CiLocationOn  className="mr-2 text-white " />
              <p className="text-[14px]">{application.location}</p>
            </div>
           <div className="flex items-center gap-4 pt-2">
            <div className="flex items-center mb-3 text-[#CACACA]">
              <IoBriefcaseOutline className="mr-2" />
              <p className="text-[14px]">{application.industry}</p>
            </div>
            <div className="flex items-center mb-3 text-[#CACACA]">
              <GoClock className="mr-2" />
              <p className="text-[14px] capitalize">{application.jobType}</p>
            </div>
            </div>

            {/* Open Job Description Button */}
            <Link href={`/dashboard/jobs/${application.jobId}`}>
            <button className="w-full py-2 mt-4 bg-[#4F9EF6] text-[16px] text-white rounded-full  hover:bg-blue-600 transition">
              Open Job Description
            </button>
            </Link>
            </div>
          
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyApplications;
