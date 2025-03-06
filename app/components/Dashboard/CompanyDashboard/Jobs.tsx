"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "@/app/lib/UserContext";
import { Job } from "../../type/Jobs";
import Link from "next/link";


const Jobs: React.FC = () => {
  const { user } = useUser();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        if (user) {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_BASE_URL}/jobs/posted?createdby=${user._id}`
          );
          setJobs(response.data);
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [user]);

  if (loading) {
    return <div className="mt-6">Loading jobs...</div>;
  }

  if (!jobs.length) {
    return <div className="mt-6">No jobs posted yet.</div>;
  }

  const displayedJobs = showAll ? jobs : jobs.slice(0, 1); 

  return (
    <div className="p-4  mt-4 border border-[#F0F0F0] rounded-lg  shadow-lg">

      {displayedJobs.map((job) => (
        <div key={job._id} >
          <h2 className="text-[20px] text-black tracking-[-1px] m">{job.title}</h2>
          <p className="text-text text-[14px]">
            <strong>Date Posted: </strong>
            {new Date(job.createdAt).toLocaleString()}
          </p>
          <p className="my-2 text-[16px] text-black">{job.description}</p>
          <button className="bg-[#F9F9F9] capitalize rounded  px-2 py-1 text-[10px]">
          {job.jobType}
          </button>
          <p className="text-[20px] mt-1 text-text ">
            <strong>Salary:</strong> {job.salary}$
          </p>
          <p className="text-[20px] my-3 text-text ">
            <strong>Location:</strong> {job.location}
          </p>
         
        </div>
      ))}

      <Link href="/dashboard/job-post">
        <button className="bg-primary  hover:shadow-blue-100 hover:shadow-lg px-5 w-full py-2 rounded-md text-[16px] text-white ">Post A Job</button>
        </Link>
    </div>
  );
};

export default Jobs;
