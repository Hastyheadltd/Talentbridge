"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { AllJobsType } from "../type/Jobs";

const AllJobs: React.FC = () => {
  const [jobs, setJobs] = useState<AllJobsType[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [recencyFilter, setRecencyFilter] = useState(""); 

  const checkJobRecency = (createdAt: string, filter: string): boolean => {
    const jobDate = new Date(createdAt);
    const now = new Date();

    if (filter === "last24hours") {
      return now.getTime() - jobDate.getTime() <= 24 * 60 * 60 * 1000; 
    } else if (filter === "last7days") {
      return now.getTime() - jobDate.getTime() <= 7 * 24 * 60 * 60 * 1000; 
    } else if (filter === "last30days") {
      return now.getTime() - jobDate.getTime() <= 30 * 24 * 60 * 60 * 1000; 
    }

    return true; 
  };

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/jobs`);
        const sortedJobs = response.data.sort(
          (a: AllJobsType, b: AllJobsType) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setJobs(sortedJobs);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Filter jobs by title, location, and recency
  const filteredJobs = jobs.filter((job) => {
    const jobMatchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      job.location.toLowerCase().includes(searchLocation.toLowerCase());

    // Filter jobs by recency 
    const jobMatchesRecency = recencyFilter === "" || checkJobRecency(job.createdAt, recencyFilter);

    return jobMatchesSearch && jobMatchesRecency;
  });

  if (loading) {
    return <div className="text-center pt-10">Loading jobs...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto mt-8 p-6 mb-11">
      <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">All Jobs</h1>

      {/* Search Bars */}
      <div className="mb-6 flex flex-col sm:flex-row justify-center gap-4">
        {/* Search by job title */}
        <input
          type="text"
          className="w-full sm:w-96 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
          placeholder="Search by job title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Search by location */}
        <input
          type="text"
          className="w-full sm:w-96 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
          placeholder="Search by location..."
          value={searchLocation}
          onChange={(e) => setSearchLocation(e.target.value)}
        />

        {/* Filter by recency */}
        <select
          className="w-full sm:w-96 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
          value={recencyFilter}
          onChange={(e) => setRecencyFilter(e.target.value)}
        >
          <option value="">Any time</option>
          <option value="last24hours">Last 24 hours</option>
          <option value="last7days">Last 7 days</option>
          <option value="last30days">Last 30 days</option>
        </select>
      </div>

      {/* No jobs found message */}
      {!filteredJobs.length && (
        <div className="text-center pt-10">No jobs found.</div>
      )}

      {/* Jobs Grid */}
      {!!filteredJobs.length && (
        <div className="grid grid-cols-1 mt-5 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredJobs.map((job) => (
            <Link key={job._id} href={`/jobs/${job._id}`}>
              <div className="bg-white hover:bg-gray-100 transition-colors duration-300 p-6 rounded-lg shadow-lg border border-gray-200">
                <div className="flex items-center mb-4">
                  {/* Company Logo */}
                  {job.userInfo?.logoURL && (
                    <img
                      src={job.userInfo.logoURL}
                      alt={job.userInfo.companyName}
                      className="h-12 w-12 object-cover rounded-full border-2 border-gray-200 mr-4"
                    />
                  )}
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">{job.title}</h2>
                    <p className="text-gray-500">{job.userInfo.companyName}</p>
                  </div>
                </div>

                {/* Job Details */}
                <div className="text-gray-700 mb-4">
                  <p>
                    <strong>Location:</strong> {job.location}
                  </p>
                  <p>
                    <strong>Salary:</strong> {job.salary}
                  </p>
                  <p>
                    <strong>Job Type:</strong> {job.jobType}
                  </p>
                </div>

                {/* Skills */}
                <div className="mb-4">
                  <p className="text-gray-600">
                    <strong>Skills:</strong> {job.skills.join(", ")}
                  </p>
                </div>

                {/* Job Footer */}
                <div className="flex justify-between items-center">
                  {/* Posted Date */}
                  <p className="text-gray-500 text-sm font-semibold">
                    Posted: {new Date(job.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllJobs;
