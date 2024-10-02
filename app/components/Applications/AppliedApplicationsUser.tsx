"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "@/app/lib/UserContext";
import Link from "next/link";
import { ApplicationType } from "../type/Applications";



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
    return <div className="text-center pt-10">You haven't applied for any jobs yet.</div>;
  }

  return (
    <div className="max-w-7xl mx-auto mt-12 p-6">
      <h1 className="text-4xl font-bold text-primary mb-8 text-center">My Applications</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {applications.map((application) => (
          <div key={application.jobId} className="p-6 bg-white rounded-xl shadow-md transform transition hover:scale-105 hover:shadow-lg">
            <h2 className="text-xl font-semibold mb-2 text-primary">{application.jobTitle}</h2>
            <p className="text-gray-600 mb-1"><strong>Company:</strong> {application.companyName}</p>
            <p className="text-gray-500"><strong>Applied on:</strong> {new Date(application.appliedAt).toLocaleDateString()}</p>
            <p className="text-gray-600 mb-1"><strong>Application Status:</strong> {application.status}</p>
            <div className="mt-4">
            <Link  href={`/jobs/${application.jobId}`}>
               
              <button className="px-4 py-2 bg-primary text-white rounded-full hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary-light focus:ring-opacity-75">
                View Job Details
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
