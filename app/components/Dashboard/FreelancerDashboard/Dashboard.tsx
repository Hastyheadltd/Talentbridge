"use client";
import React from "react";
import { useUser } from "@/app/lib/UserContext";
import { useRouter } from "next/navigation";
import { Experience } from "../../type/User";

const Dashboard: React.FC = () => {
  const { user } = useUser();
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto py-8 px-4">
        {/* Dashboard Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 capitalize">Welcome, {user?.username}</h1>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
            onClick={() => router.push("/dashboard/edit-profile")}
          >
            Edit Profile
          </button>
        </div>

        {/* Profile Section */}
        <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
          <div className="flex items-center">
            <img
              src={
                user?.photoURL
                  ? user.photoURL
                  : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmHkj6-Tndku8K2387sMaBf2DaiwfBtHQw951-fc9zzA&s"
              }
              alt="Profile"
              className="w-24 h-24 object-cover rounded-full shadow-md mr-6"
            />
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">{user?.username}</h2>
              <p className="text-gray-600">{user?.location}</p>
              <p className="text-gray-600">{user?.phone}</p>
              <a
                href={user?.linkedin}
                className="text-blue-500 underline "
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </div>
          </div>
          <p className="mt-4 text-gray-700">{user?.bio}</p>
        </div>

        {/* Skills Section */}
        <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Skills</h2>
          <div className="flex flex-wrap">
            {user?.skills?.map((skill: string, index: number) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-600 py-1 px-3 rounded-full mr-2 mb-2 text-sm font-semibold"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Experience Section */}
        <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Experience</h2>
          {Array.isArray(user?.experience) && user?.experience.length > 0 ? (
            user.experience.map((exp: Experience, index: number) => (
              <div key={index} className="border-b border-gray-200 pb-4 mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {exp.company}
                </h3>
                <p className="text-gray-600">
                  {exp.position} - {exp.location}
                </p>
                <p className="text-gray-500">
                  {exp.joinDate} to {exp.current ? "Present" : exp.endDate}
                </p>
                <p className="mt-2 text-gray-700">{exp.description}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No experience added yet.</p>
          )}
        </div>
   

        {/* Resume Section */}
        {user?.resumeURL && (
          <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Resume</h2>
            <a
              href={user?.resumeURL}
              className="text-blue-500 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Resume
            </a>
          </div>
        )}

        {/* Portfolio Section */}
        {user?.portfolio && (
          <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Portfolio</h2>
            <a
              href={user?.portfolio}
              className="text-blue-500 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {user?.portfolio}
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
