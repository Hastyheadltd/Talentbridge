"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import { UserType } from "@/app/components/type/ProfileDetails";


const ProfileDetails: React.FC = () => {
  const { userId } = useParams();

  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!userId) return;

      try {
        setLoading(true);
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/users/${userId}`
        );
        if (response.data.success) {
          setUser(response.data.user);
        } else {
          setError("User not found");
        }
      } catch (err) {
        console.error("Error fetching user:", err);
        setError("Failed to load user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [userId]);

  // Calculate rating from approved reviews
  const getApprovedRatingInfo = () => {
    if (!user || !Array.isArray(user.reviews)) {
      return { average: 0, count: 0 };
    }

    const approvedReviews = user.reviews.filter(
      (review) => review.reviewapproved === "true"
    );

    if (approvedReviews.length === 0) {
      return { average: 0, count: 0 };
    }

    const sumRatings = approvedReviews.reduce(
      (acc, curr) => acc + (curr.rating || 0),
      0
    );
    const avg = sumRatings / approvedReviews.length;
    return { average: avg, count: approvedReviews.length };
  };

  const renderStars = (ratingValue: number) => {
    const rounded = Math.round(ratingValue);
    const fullStar = "★";
    const emptyStar = "☆";
    return (
      <span className="text-yellow-400 text-[22px]">
        {fullStar.repeat(rounded) + emptyStar.repeat(5 - rounded)}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-700 font-medium">Loading user profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-red-600 font-semibold">{error}</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-red-600 font-semibold">User data unavailable.</p>
      </div>
    );
  }

  // Compute rating stats
  const { average, count } = getApprovedRatingInfo();
  const totalReviews = user.reviews?.length || 0;

  return (
    <div className="min-h-screen bg-gradient-to-tl from-white to-gray-100 py-10">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Main Card */}
        <div className="bg-white shadow-md rounded-lg p-8">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* LEFT*/}
            <div>
              {/* Profile Photo + Basic Info Card */}
              <div className="flex flex-col items-center  lg:flex-row space-x-0 lg:space-x-4 mb-8">
                <img
                  className="w-32 h-32 rounded-full object-cover border border-gray-200"
                  src={user.photoURL || "/default-avatar.png"}
                  alt={`${user.username || "User"}'s profile`}
                />
                <div className="mt-4 lg:mt-0">
                  <h1 className="text-3xl font-bold text-gray-800 capitalize">
                    {user.username || "Unnamed User"}
                  </h1>
                  {user.location && (
                    <p className="text-gray-500 mt-1 font-medium">
                      {user.location}
                    </p>
                  )}
                        <div className=" mt-1">
               
                {totalReviews === 0 ? (
                  <p className="text-gray-500 text-sm">No reviews yet.</p>
                ) : count === 0 ? (
                  <p className="text-gray-500 text-sm">
                    There are reviews, but none are approved yet.
                  </p>
                ) : (
                  <div className="flex items-center gap-2">
                    <div>{renderStars(average)}</div>
                    <span className="text-gray-700 font-semibold">
                      {average.toFixed(1)} / 5.0
                    </span>
                    <span className="text-gray-500 text-sm">
                      ({count} review{count > 1 ? "s" : ""})
                    </span>
                  </div>
                )}
              </div>
                </div>
              </div>

    
        

              {/* Contact + Bio Card */}
              <div className="bg-gray-50 border border-gray-100 rounded-lg p-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  About
                </h2>
                {user.bio ? (
                  <p className="text-gray-600 mb-4">{user.bio}</p>
                ) : (
                  <p className="text-gray-500 mb-4 italic">No bio available</p>
                )}

                {/* Contact Details */}
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  Contact
                </h2>
                <ul className="space-y-1 text-gray-600">
                  <li>
                    <strong>Email:</strong> {user.email}
                  </li>
                  {user.phone && (
                    <li>
                      <strong>Phone:</strong> {user.phone}
                    </li>
                  )}
                  {user.linkedin && (
                    <li>
                      <strong>LinkedIn:</strong>{" "}
                      <a
                        href={user.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        View Profile
                      </a>
                    </li>
                  )}
                  {user.portfolio && (
                    <li>
                      <strong>Portfolio:</strong>{" "}
                      <a
                        href={user.portfolio}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        View Portfolio
                      </a>
                    </li>
                  )}
                  {user.resumeURL && (
                    <li>
                      <strong>Resume:</strong>{" "}
                      <a
                        href={user.resumeURL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        Download Resume
                      </a>
                    </li>
                  )}
                </ul>
              </div>
            </div>

            {/* RIGHT COLUMN: Experience, Skills */}
            <div className="flex flex-col space-y-8">
              {/* Experience */}
              <div className="bg-gray-50 border border-gray-100 rounded-lg p-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Experience
                </h2>
                {user.experience && user.experience.length > 0 ? (
                  <div className="space-y-4 gap-4">
                    {user.experience.map((exp, index) => (
                      <div
                        key={index}
                        className="p-4 mt-3 bg-white shadow-sm rounded-md border border-gray-100"
                      >
                        <h3 className="text-lg font-semibold text-gray-700">
                          {exp.position}{" "}
                          <span className="text-sm font-normal text-gray-500">
                            at {exp.company}
                          </span>
                        </h3>
                        <p className="text-sm text-gray-500 mb-2">
                          {exp.location}
                        </p>
                        <p className="text-sm text-gray-600">
                          <span className="font-semibold">Join Date:</span>{" "}
                          {new Date(exp.joinDate).toLocaleDateString()}
                        </p>
                        {exp.description && (
                          <p className="text-sm text-gray-600 mt-2">
                            {exp.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No experience listed.</p>
                )}
              </div>

              {/* Skills */}
              <div className="bg-gray-50 border border-gray-100 rounded-lg p-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Skills
                </h2>
                {user.skills && user.skills.length > 0 ? (
                  <ul className="flex flex-wrap gap-3">
                    {user.skills.map((skill, index) => (
                      <li
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                      >
                        {skill}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">No skills listed.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
