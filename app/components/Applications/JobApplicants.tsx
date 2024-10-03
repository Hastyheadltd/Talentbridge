"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "@/app/lib/UserContext";
import { Applicant } from "../type/Applications";
import Link from "next/link";

const Applicants: React.FC = () => {
  const { user } = useUser();
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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

  if (loading) {
    return <div className="text-center pt-10">Loading applicants...</div>;
  }

  if (error) {
    return <div className="text-center pt-10">{error}</div>;
  }

  return (
    <div className="max-w-7xl mx-auto mt-8 p-6 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
        Applicants for Your Job Posts
      </h1>

      {applicants.length === 0 ? (
        <p className="text-center text-gray-700">Sorry, no applicants found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {applicants.map((applicant) => (
            <div
              key={applicant.userId}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
            >
              <h2 className="text-2xl font-bold mb-4 text-indigo-600">
                {applicant.jobTitle}
              </h2>
              <div className="flex justify-between items-start mb-4">
                <div className="">
                  <p className="text-gray-800">
                    <strong>Applicant Name:</strong> {applicant.applicantInfo.username}
                  </p>
                  <p className="text-gray-800">
                    <strong>Email:</strong> {applicant.applicantInfo.email}
                  </p>
                  <p className="text-gray-800">
                    <strong>Location:</strong> {applicant?.applicantInfo?.location ?? ""}
                  </p>
                </div>
                <div>
                  <img
                    src={
                      applicant?.applicantInfo?.photoURL ??
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmHkj6-Tndku8K2387sMaBf2DaiwfBtHQw951-fc9zzA&s"
                    }
                    alt="Applicant Image"
                    className=" w-[100px] h-[100px]"
                  />
                </div>
              </div>

              <Link
                href={`/profile/${applicant?.userId}`}
                className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white"
              >
                View Profile
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Applicants;
