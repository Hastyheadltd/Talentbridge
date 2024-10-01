"use client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";

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
  };
}

const JobDetails: React.FC = () => {

  const { id } = useParams();
  console.log(id);
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const fetchJobDetails = async () => {
        try {
          console.log("Fetching job with ID:", id);
          const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/jobs/${id}`);
          setJob(response.data); // Set job data
        } catch (error) {
          console.error("Error fetching job details:", error);
          setError("Failed to load job details");
        } finally {
          setLoading(false);
        }
      };

      fetchJobDetails();
    }
  }, [id]);

  if (loading) {
    return <div className="text-center pt-10">Loading job details...</div>;
  }

  if (error) {
    return <div className="text-center pt-10">{error}</div>;
  }

  if (!job) {
    return <div className="text-center pt-10">Job not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">{job.title}</h1>
      <p className="text-gray-700 mb-4">{job.description}</p>
      
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
        <strong>Skills Required:</strong> {job.skills.join(", ")}
      </p>
      <p className="text-gray-500 text-sm">
        <strong>Posted on:</strong> {new Date(job.createdAt).toLocaleString()}
      </p>

      <div className="mt-6">
        <h2 className="text-xl font-bold">Company Information</h2>
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
          <a href={job.userInfo.website} className="text-blue-500" target="_blank" rel="noopener noreferrer">
            {job.userInfo.website}
          </a>
        </p>
        <p className="text-gray-700">
          <strong>Contact:</strong> {job.userInfo.contact}
        </p>
      </div>
    </div>
  );
};

export default JobDetails;
