"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "@/app/lib/UserContext";
import { Job } from "../type/Jobs";

const AllPostedJobs: React.FC = () => {
  const { user } = useUser();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);


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
    return <div>Loading jobs...</div>;
  }

  if (!jobs.length) {
    return <div>No jobs posted yet.</div>;
  }



  return (
    <div className=" mt-10 grid grid-cols-3 gap-5">
      {jobs.map((job) => (
        <div key={job._id} className=" p-4 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-primary">{job.title}</h2>
          <p className="text-gray-700 py-1">{job.description}</p>
          <p className="text-gray-700">
            <strong>Location:</strong> {job.location}
          </p>
          <p className="text-gray-700">
            <strong>Salary:</strong> {job.salary}
          </p>
          <p className="text-gray-700">
            <strong>Job Type:</strong> {job.jobType}
          </p>
          <p className="text-gray-700">
            <strong>Skills:</strong> {job.skills.join(", ")}
          </p>
          <p className="text-gray-500 text-sm">
            <strong>Posted on:</strong>{" "}
            {new Date(job.createdAt).toLocaleString()}
          </p>
        </div>
      ))}

      {/*'View All Jobs' button */}
     
    </div>
  );
};

export default AllPostedJobs;
