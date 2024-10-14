"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "@/app/lib/UserContext";
import { Job } from "../type/Jobs";
import Swal from "sweetalert2";
import { FaMapMarkerAlt, FaDollarSign, FaBriefcase, FaTrashAlt, FaArchive } from 'react-icons/fa';

const AllPostedJobs: React.FC = () => {
  const { user } = useUser();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        if (user) {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_BASE_URL}/jobs/posted?createdby=${user._id}&isArchived=false`
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

  const archiveJob = async (jobId: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "The job will be archived and no longer active!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, archive it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.patch(`${process.env.NEXT_PUBLIC_BASE_URL}/jobs/${jobId}/archive`);
          Swal.fire("Archived!", "The job has been archived.", "success");
          setJobs(jobs.filter((job) => job._id !== jobId));
        } catch (error) {
          console.error("Error archiving job:", error);
          Swal.fire("Error", "Failed to archive the job.", "error");
        }
      }
    });
  };

  const deleteJob = async (jobId: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
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
          setJobs(jobs.filter((job) => job._id !== jobId));
        } catch (error) {
          console.error("Error deleting job:", error);
          Swal.fire("Error", "Failed to delete the job.", "error");
        }
      }
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-lg font-semibold text-gray-600">Loading jobs...</div>
      </div>
    );
  }

  if (!jobs.length) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-lg font-semibold text-gray-600">No jobs posted yet.</div>
      </div>
    );
  }

  return (
    <div className="max-w-[1244px] mx-auto mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {jobs.map((job) => (
        <div
          key={job._id}
          className="glassmorphism-card p-6 bg-white bg-opacity-50 backdrop-blur-lg border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out transform hover:-translate-y-1"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-4">{job.title}</h2>

          <div className="flex items-center mb-3">
            <FaMapMarkerAlt className="text-gray-500 mr-2" />
            <p className="text-gray-700">{job.location}</p>
          </div>

          <div className="flex items-center mb-3">
            <FaDollarSign className="text-gray-500 mr-2" />
            <p className="text-gray-700">{job.salary.toLocaleString()} $</p>
          </div>

          <div className="flex items-center mb-3">
            <FaBriefcase className="text-gray-500 mr-2" />
            <p className="text-gray-700">{job.jobType}</p>
          </div>

          <div className="mb-6">
            <strong className="text-gray-600">Skills:</strong>
            <p className="text-gray-700">{job.skills.join(", ")}</p>
          </div>

          <p className="text-sm text-gray-500 mb-4">
            Posted on: {new Date(job.createdAt).toLocaleDateString()}
          </p>

          <div className="flex justify-between gap-4 text-[14px]">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300 flex items-center"
              onClick={() => archiveJob(job._id)}
            >
              <FaArchive className="mr-1" />
              Archive Job
            </button>

            <button
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-300 flex items-center"
              onClick={() => deleteJob(job._id)}
            >
              <FaTrashAlt className="mr-2" />
              Delete Job
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllPostedJobs;
