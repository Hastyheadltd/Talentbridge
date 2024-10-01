"use client";
import { useEffect, useState } from "react";
import axios from "axios";

interface Job {
  _id: string;
  title: string;
  description: string;
  location: string;
  salary: string;
  jobType: string;
  skills: string[];
  createdAt: string;
  userInfo: {
    name: string;
    email: string;
    address: string;
    website: string;
    contact: string;
    otherField1?: string; 
    otherField2?: string;
  };
}

const AllJobs: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  console.log(jobs);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/jobs`);
        setJobs(response.data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return <div className="text-center pt-10">Loading jobs...</div>;
  }

  if (!jobs.length) {
    return <div className="text-center pt-10">No jobs found.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">All Jobs</h1>
      {jobs.map((job) => (
        <div key={job._id} className="mb-6 p-4 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">{job.title}</h2>
          <p className="text-gray-700">{job.description}</p>
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
            <strong>Posted on:</strong> {new Date(job.createdAt).toLocaleString()}
          </p>

          <div className="mt-4">
            <h3 className="text-xl font-bold">Company Information</h3>
            <p className="text-gray-700">
              <strong>Name:</strong> {job.userInfo.name}
            </p>
            <p className="text-gray-700">
              <strong>Email:</strong> {job.userInfo.email}
            </p>
            <p className="text-gray-700">
              <strong>Address:</strong> {job.userInfo.address}
            </p>
            <p className="text-gray-700">
              <strong>Website:</strong>{" "}
              <a href={job.userInfo.website} className="text-blue-500" target="_blank">
                {job.userInfo.website}
              </a>
            </p>
            <p className="text-gray-700">
              <strong>Contact:</strong> {job.userInfo.contact}
            </p>

            {/* Display additional user fields */}
            {job.userInfo.otherField1 && (
              <p className="text-gray-700">
                <strong>Additional Info 1:</strong> {job.userInfo.otherField1}
              </p>
            )}
            {job.userInfo.otherField2 && (
              <p className="text-gray-700">
                <strong>Additional Info 2:</strong> {job.userInfo.otherField2}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllJobs;
