"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Job } from "../type/Jobs";
import { CiLocationOn } from "react-icons/ci";
import { IoBriefcaseOutline } from "react-icons/io5";
import { GoClock } from "react-icons/go";
import Link from "next/link";

const ArchivedJobs: React.FC = () => {
  const [archivedJobs, setArchivedJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArchivedJobs = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/jobs/archived`
        );
        setArchivedJobs(response.data);
      } catch (error) {
        console.error("Error fetching archived jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArchivedJobs();
  }, []);

  const deleteJob = async (jobId: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This job will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/jobs/${jobId}`);
          Swal.fire("Deleted!", "The job has been deleted.", "success");
          setArchivedJobs(archivedJobs.filter((job) => job._id !== jobId));
        } catch (error) {
          console.error("Error deleting job:", error);
          Swal.fire("Error", "Failed to delete the job.", "error");
        }
      }
    });
  };


  const unarchiveJob = async (jobId: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This job will be moved back to active jobs!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, unarchive it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.patch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/jobs/${jobId}/archive`,
            { isArchived: false } 
          );
  
          if (response.status === 200) {
            Swal.fire("Unarchived!", "The job is now active again.", "success");
  
            
            setArchivedJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
          }
        } catch (error) {
          console.error("Error unarchiving job:", error);
          Swal.fire("Error", "Failed to unarchive the job.", "error");
        }
      }
    });
  };
  

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-lg font-semibold text-gray-600">Loading archived jobs...</div>
      </div>
    );
  }

  if (!archivedJobs.length) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-lg font-semibold text-gray-600">No archived jobs found.</div>
      </div>
    );
  }

  return (
    <div className="max-w-[1000px] mx-auto mt-10">
      <h1 className="text-center text-[32px] font-bold text-primary mb-6">List of Archived Jobs</h1>
     
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  pb-6 gap-5">
      {archivedJobs.map((job) => (
        <div
          key={job._id}
          className="w-[303px] mb-4"
        >
          <div className=" p-6 bg-[#031830] text-white border border-gray-700 rounded-2xl  hover:shadow-md hover:shadow-blue-900 transition-all duration-300">
            <h2 className="text-[16px] font-semibold mb-3 h-[50px] line-clamp-2">{job.title}</h2>

            <div className="flex items-center justify-end mb-3 text-[#CACACA]">
              <CiLocationOn  className="mr-2 text-white " />
              <p className="text-[14px]">{job.location}</p>
            </div>
           <div className="flex items-center gap-4 pt-2">
            <div className="flex items-center mb-3 text-[#CACACA]">
              <IoBriefcaseOutline className="mr-2" />
              <p className="text-[14px]">{job.industry}</p>
            </div>
            <div className="flex items-center mb-3 text-[#CACACA]">
              <GoClock className="mr-2" />
              <p className="text-[14px] capitalize">{job.jobType}</p>
            </div>
            </div>

            {/* Open Job Description Button */}
            <Link href={`/jobs/${job._id}`}>
            <button className="w-full py-2 mt-4 bg-[#4F9EF6] text-[16px] text-white rounded-full  hover:bg-blue-600 transition">
              Open Job Description
            </button>
            </Link>
            </div>

            <div className="flex justify-between gap-4 mt-4">
  {/* Post Job Button */}
  <button
     className="w-1/2 py-2 bg-[#0C34E4] text-white rounded-lg hover:bg-blue-800 flex items-center justify-center transition"
    onClick={() => unarchiveJob(job._id)}
  >
    Post Job
  </button>

  {/* Delete Job Button */}
  <button
    className="w-1/2 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 flex items-center justify-center transition"
    onClick={() => deleteJob(job._id)}
  >
    Delete
  </button>
</div>

        </div>
      ))}
    </div>
    </div>
  );
};

export default ArchivedJobs;
