"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "@/app/lib/UserContext";
import { Applicant } from "../type/Applications";
import Link from "next/link";
import ChatPopup from "../Messages/ChatPopup";

const Applicants: React.FC = () => {
  const { user } = useUser();
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("pending");
  const [showChat, setShowChat] = useState<boolean>(false);
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(null);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        if (!user) {
          return;
        }

        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/applications/applicants`,
          {
            params: {
              userId: user._id,
            },
          }
        );
        setApplicants(response.data);
      } catch (error) {
        console.error("Error fetching applicants:", error);
        setError("Failed to load applicants.");
      } finally {
        setLoading(false);
      }
    };

    fetchApplicants();
  }, [user]);


  const handleOpenChat = (applicant: Applicant) => {
    setSelectedApplicant(applicant);
    setShowChat(true);
  };

  const closeChat = () => {
    setShowChat(false);
    setSelectedApplicant(null);
  };
  const updateApplicationStatus = async (applicationId: string, status: string) => {
    try {
      await axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}/applications/${applicationId}`, {
        status,
      });

      // Update the local state after status change
      setApplicants((prevApplicants) =>
        prevApplicants.map((applicant) =>
          applicant._id === applicationId ? { ...applicant, status } : applicant
        )
      );
    } catch (error) {
      console.error(`Error updating status to ${status}:`, error);
      alert(`Failed to update status to ${status}.`);
    }
  };

  // Filter applicants based on the active tab
  const filteredApplicants = applicants.filter((applicant) => {
    if (activeTab === "pending") return applicant.status === "pending";
    if (activeTab === "accepted") return applicant.status === "accepted";
    if (activeTab === "rejected") return applicant.status === "rejected";
    return false;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
         
          <p className="mt-4 text-indigo-600 text-lg">Loading applicants...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center pt-10">{error}</div>;
  }

  return (
    <div className="max-w-7xl mx-auto mt-8 p-6 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
        Applicants for Your Job Posts
      </h1>

      {/* Tabs for filtering */}
      <div className="flex justify-center space-x-4 mb-8">
        <button
          onClick={() => setActiveTab("pending")}
          className={`px-4 py-2 rounded ${
            activeTab === "pending" ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-800"
          }`}
        >
          Under Review
        </button>
        <button
          onClick={() => setActiveTab("accepted")}
          className={`px-4 py-2 rounded ${
            activeTab === "accepted" ? "bg-green-600 text-white" : "bg-gray-200 text-gray-800"
          }`}
        >
          Accepted
        </button>
        <button
          onClick={() => setActiveTab("rejected")}
          className={`px-4 py-2 rounded ${
            activeTab === "rejected" ? "bg-red-600 text-white" : "bg-gray-200 text-gray-800"
          }`}
        >
          Rejected
        </button>
      </div>

      {/* Display filtered applicants */}
      {filteredApplicants.length === 0 ? (
        <p className="text-center text-gray-700">No applicants found in this category.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredApplicants.map((applicant) => (
            <div
              key={applicant._id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
            >
              <h2 className="text-2xl font-bold mb-4 text-indigo-600">
                {applicant.jobTitle}
              </h2>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-gray-800">
                    <strong>Applicant Name:</strong> {applicant.applicantInfo.username}
                  </p>
                  <p className="text-gray-800">
                    <strong>Email:</strong> {applicant.applicantInfo.email}
                  </p>
                  <p className="text-gray-800">
                    <strong>Location:</strong> {applicant?.applicantInfo?.location ?? ""}
                  </p>
                  <p className="text-gray-800">
                    <strong>Applied At:</strong> {applicant?.appliedAt ?? ""}
                  </p>

                  <h1 className="my-3 font-semibold text-primary text-[18px]">Applicant  Info</h1>
               
                  <p className="text-gray-800">
                    <strong>Bio:</strong> {applicant?.applicantInfo?.bio ?? ""}
                  </p>
                        {/* Skills Section */}
                        <div className="my-4">
                          <h2 className=""><strong>Skills:</strong> </h2>
                          <ul className="mt-3 flex space-x-2">
                            {Array.isArray(applicant?.applicantInfo?.skills) && applicant?.applicantInfo?.skills.length > 0 ? (
                              applicant.applicantInfo.skills.map((skill, index) => (
                                <li key={index} className="px-2 py-1 text-[14px] bg-blue-100 rounded-md">{skill}</li>
                              ))
                            ) : (
                              <li className="px-2 py-1 text-[14px] text-gray-500">No skills provided</li>
                            )}
                          </ul>
                        </div>

                        <div className="my-6 w-[90%]">
                          <h2 className=""><strong>Experience:</strong> </h2>
                          <div className="mt-4 space-y-4">
                            {Array.isArray(applicant?.applicantInfo?.experience) && applicant?.applicantInfo?.experience.length > 0 ? (
                              applicant.applicantInfo.experience.map((exp, index) => (
                                <div key={index} className="p-4 border rounded-lg">
                                  <h3 className="text-xl font-semibold">{exp.position} at {exp.company}</h3>
                                  <p className="text-gray-600">{exp.location}</p>
                                  <p className="text-gray-600">
                                    <span className="font-semibold">Join Date:</span> {new Date(exp.joinDate).toLocaleDateString()}
                                  </p>
                                  <p>{exp.description}</p>
                                </div>
                              ))
                            ) : (
                              <p className="text-gray-500">No experience provided</p>
                            )}
                          </div>
                        </div>

                        {/* Contact and Links Section */}
                        <div className="my-4">
                          <h2 className=""><strong>Contact:</strong> </h2>
                          <p className="mt-2"><strong>Phone:</strong> {applicant?.applicantInfo.phone}</p>
                          <p className=""><strong>Email:</strong> {applicant?.applicantInfo.email}</p>
                          <p><strong>LinkedIn:</strong> <a href={applicant?.applicantInfo.linkedin} className="text-blue-500" target="_blank" rel="noopener noreferrer">View Profile</a></p>
                          <p><strong>Portfolio:</strong> <a href={applicant?.applicantInfo.portfolio} className="text-blue-500" target="_blank" rel="noopener noreferrer">View Portfolio</a></p>
                          <p><strong>Resume:</strong> <a href={applicant?.applicantInfo.resumeURL} className="text-blue-500" target="_blank" rel="noopener noreferrer">Download Resume</a></p>
                        </div>
                </div>
                <div>
                  <img
                    src={
                      applicant?.applicantInfo?.photoURL ??
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmHkj6-Tndku8K2387sMaBf2DaiwfBtHQw951-fc9zzA&s"
                    }
                    alt="Applicant Image"
                    className="w-[100px] h-[100px]"
                  />
                </div>
              </div>

              <div className="flex  gap-4">
                {activeTab === "pending" && (
                  <div>
                    <button
                      onClick={() => updateApplicationStatus(applicant._id, "accepted")}
                      className="px-3 py-1 me-2 bg-green-500 hover:bg-green-600 text-white"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => updateApplicationStatus(applicant._id, "rejected")}
                      className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white"
                    >
                      Reject
                    </button>
                  </div>
                )}

                <Link
                  href={`/profile/${applicant?.userId}`}
                  className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white"
                >
                  View Profile
                </Link>
                <button
            onClick={() => handleOpenChat(applicant)}
            className="px-3 py-1 bg-purple-500 hover:bg-purple-600 text-white"
          >
            Message
          </button>
              </div>
            </div>
          ))}


{showChat && selectedApplicant && (
  <ChatPopup
    userId={user?._id ?? ""} 
    applicantId={selectedApplicant?.userId ?? ""}  
    closePopup={closeChat}
  />
)}



        </div>
      )}
    </div>
  );
};

export default Applicants;
