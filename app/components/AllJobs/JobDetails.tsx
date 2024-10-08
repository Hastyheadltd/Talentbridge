"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { JobDetailsType } from "../type/Jobs";
import { useUser } from "@/app/lib/UserContext";

const JobDetails: React.FC = () => {
  const { id } = useParams();
  const [job, setJob] = useState<JobDetailsType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [applied, setApplied] = useState(false);
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (id) {
      const fetchJobDetails = async () => {
        try {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/jobs/${id}`);
          setJob(response.data);
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

  const handleApply = async () => {
    if (!user) {
      Swal.fire({
        title: "Login Required",
        text: "You need to be logged in to apply for this job.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Login",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          router.push("/login");
        }
      });
      return;
    }

    // user is a freelancer and approved 
    if (user?.approve!== "true" || user.role !== "freelancer") {
      Swal.fire({
        title: "Not Eligible",
        text: "You must be an approved freelancer to apply for this job.",
        icon: "warning",
      });
      return;
    }

    try {
      const applicationData = {
        userId: user?._id,
        jobId: job?._id,
        jobTitle: job?.title,
        companyName: job?.userInfo?.companyName,
        website: job?.userInfo?.website,
        location: job?.userInfo?.location,
        logoURL: job?.userInfo?.logoURL,
        appliedAt: new Date().toISOString(),
        status: "pending",
      };

      const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/applications`, applicationData);

      if (response.data.success) {
        setApplied(true);
        Swal.fire({
          title: "Success!",
          text: "Application submitted successfully!",
          icon: "success",
          showConfirmButton: false,
          timer: 1000,
        }).then(() => {
          router.push("/dashboard");
        });
      }
    } catch (error) {
      console.error("Error applying to job:", error);
      Swal.fire("Error", "Failed to submit application", "error");
    }
  };

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
    <div className="max-w-7xl mx-auto mt-8 p-6 bg-gray-50 rounded-lg shadow-lg grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Job Details */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-primary mb-6">{job.title}</h1>
        <p className="text-gray-700 mb-4">{job.description}</p>

        <div className="mb-4">
          <p className="text-gray-700">
            <strong>Location:</strong> {job.location}
          </p>
          <p className="text-gray-700 my-1">
            <strong>Experience:</strong> {job.experience} Years
          </p>
          <p className="text-gray-700 my-1">
            <strong>Salary:</strong> {job.salary}
          </p>
          <p className="text-gray-700 capitalize my-1">
            <strong>Job Type:</strong> {job.jobType}
          </p>
          <p className="text-gray-700 mt-3">
            <strong>Key Responsibilities:</strong>
          </p>
          <ul className="list-disc ml-6 text-gray-700">
            {job.responsibilities.map((responsibility, index) => (
              <li key={index}>{responsibility}</li>
            ))}
          </ul>

          <p className="text-gray-700 mt-4">
            <strong>Skills Required:</strong>
          </p>
          <ul className="list-disc ml-6 text-gray-700">
            {job.skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </div>

        <p className="text-gray-500 text-sm mb-6">
          <strong>Posted on:</strong> {new Date(job.createdAt).toLocaleDateString()}
        </p>

        {/* Apply Button */}
        <button
          onClick={handleApply}
          className={`w-full text-white font-medium py-3 rounded-lg transition duration-300 ${
            applied ? "bg-green-600" : user?. approve && user?.role === "freelancer" ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400"
          }`}
          disabled={applied || !user?.approve || user?.role !== "freelancer"}
        >
          {applied ? "Applied" : "Apply Now"}
        </button>
      </div>

      {/* Company Details */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex items-center mb-4">
          {/* Company Logo */}
          {job.userInfo.logoURL && (
            <img
              src={job.userInfo.logoURL}
              alt={job.userInfo.companyName}
              className="h-16 w-16 rounded-full border-2 border-gray-300"
            />
          )}
          <div className="ml-4">
            <h2 className="text-2xl font-bold text-gray-900">{job.userInfo.companyName}</h2>
            <h2 className="text-md text-gray-900">{job.userInfo.location}</h2>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-gray-700">
            <strong>About:</strong> {job.userInfo.about}
          </p>
          <p className="text-gray-700 my-2">
            <strong>Mission:</strong> {job.userInfo.mission}
          </p>
          <p className="text-gray-700 my-2">
            <strong>Vision:</strong> {job.userInfo.vision}
          </p>
          <p className="text-gray-700">
            <strong>Website:</strong>{" "}
            <a
              href={job.userInfo.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              {job.userInfo.website}
            </a>
          </p>
          <p className="text-gray-700">
            <strong>LinkedIn:</strong>{" "}
            <a
              href={job.userInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              {job.userInfo.linkedin}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
