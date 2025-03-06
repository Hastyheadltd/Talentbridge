"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "@/app/lib/UserContext";
import { Applicant } from "../../type/Applications";

const Applicants: React.FC = () => {
  const { user } = useUser();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [applicants, setApplicants] = useState<Applicant[]>([]);

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

  // Calculate total applicants and their statuses
  const totalApplicants = applicants.length;
  const acceptedCount = applicants.filter((app) => app.status === "accepted").length;
  const pendingCount = applicants.filter((app) => app.status === "pending").length;
  const rejectedCount = applicants.filter((app) => app.status === "rejected").length;

  return (
    <div className="p-4 border border-[#F0F0F0] rounded-lg  shadow-lg">
      <h1 className="text-[20px] text-black font-bold tracking-[-1px] mb-6">
        Applicant Management
      </h1>
      <table className="w-full border-collapse border border-gray-300">
        <tbody>
          <tr className="border border-gray-300">
            <td className="p-2 text-[14px] font-semibold">Total Applicants</td>
            <td className="p-2 text-[14px]">{totalApplicants}</td>
          </tr>
          <tr className="border border-gray-300">
            <td className="p-2 text-[14px] font-semibold">Accepted</td>
            <td className="p-2 text-[14px]">{acceptedCount}</td>
          </tr>
          <tr className="border border-gray-300">
            <td className="p-2 text-[14px] font-semibold">Pending</td>
            <td className="p-2 text-[14px]">{pendingCount}</td>
          </tr>
          <tr className="border border-gray-300">
            <td className="p-2  text-[14px] font-semibold">Rejected</td>
            <td className="p-2 text-[14px]">{rejectedCount}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Applicants;
