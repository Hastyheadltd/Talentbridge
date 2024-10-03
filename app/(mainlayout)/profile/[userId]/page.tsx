"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';

interface Experience {
  position: string;
  company: string;
  location: string;
  joinDate: string;
  description: string;
}

interface User {
  username: string;
  photoURL: string;
  bio: string;
  location: string;
  experience: Experience[];
  skills: string[];
  phone: string;
  email: string;
  linkedin: string;
  portfolio: string;
  resumeURL: string;
}

const ProfileDetails: React.FC = () => {

  const { userId } =  useParams();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch user data from backend API
    const fetchUserProfile = async () => {
      if (!userId) return;

      try {
        setLoading(true);
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/users/${userId}`);
        if (response.data.success) {
          setUser(response.data.user);
        } else {
          setError('User not found');
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        setError('Failed to load user data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto my-8 p-8 bg-white shadow-md rounded-lg">
      {user && (
        <>
          {/* Profile Header */}
          <div className="flex items-center space-x-6">
            <img
              className="w-32 h-32 rounded-full object-cover"
              src={user.photoURL}
              alt={`${user.username}'s profile`}
            />
            <div>
              <h1 className="text-3xl font-bold">{user.username}</h1>
              <p className="text-gray-600 w-[50%] py-2">{user.bio}</p>
              <p className="text-gray-500 font-semibold">{user.location}</p>
            
            </div>
          </div>

          {/* Experience Section */}
          <div className="my-6 w-[50%]">
            <h2 className="text-2xl font-semibold">Experience</h2>
            <div className="mt-4 space-y-4">
              {user.experience.map((exp, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <h3 className="text-xl font-semibold">{exp.position} at {exp.company}</h3>
                  <p className="text-gray-600">{exp.location}</p>
                  <p className="text-gray-600">
                    <span className="font-semibold">Join Date:</span> {new Date(exp.joinDate).toLocaleDateString()}
                  </p>
                  <p>{exp.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Skills Section */}
          <div className="my-6">
            <h2 className="text-2xl font-semibold">Skills</h2>
            <ul className="mt-4 flex space-x-4">
              {user.skills.map((skill, index) => (
                <li key={index} className="px-4 py-2 bg-blue-100 rounded-md">{skill}</li>
              ))}
            </ul>
          </div>

          {/* Contact and Links Section */}
          <div className="my-6">
            <h2 className="text-2xl font-semibold">Contact</h2>
            <p className="mt-2"><strong>Phone:</strong> {user.phone}</p>
            <p className=""><strong>Email:</strong> {user.email}</p>
            <p><strong>LinkedIn:</strong> <a href={user.linkedin} className="text-blue-500" target="_blank" rel="noopener noreferrer">View Profile</a></p>
            <p><strong>Portfolio:</strong> <a href={user.portfolio} className="text-blue-500" target="_blank" rel="noopener noreferrer">View Portfolio</a></p>
            <p><strong>Resume:</strong> <a href={user.resumeURL} className="text-blue-500" target="_blank" rel="noopener noreferrer">Download Resume</a></p>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfileDetails;
