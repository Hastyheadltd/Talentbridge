"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "@/app/lib/UserContext";
import { useRouter } from "next/navigation";

interface CompanyProfileData {
  companyName: string;
  logoURL: string;
  about: string;
  mission: string;
  vision: string;
  location: string;
  website: string;
  linkedin: string;
}

const CompanyDashboard: React.FC = () => {
  const { user } = useUser();
  const [companyData, setCompanyData] = useState<CompanyProfileData | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/users/${user?._id}`);
        const Userdata = response.data;
        const data = Userdata?.user;

        if (data.role === "company") {
          setCompanyData({
            companyName: data.companyName,
            logoURL: data.logoURL,
            about: data.about,
            mission: data.mission,
            vision: data.vision,
            location: data.location,
            website: data.website,
            linkedin: data.linkedin,
          });
        }
      } catch (error) {
        console.error("Error fetching company data:", error);
      }
    };

    if (user?._id) {
      fetchCompanyData();
    }
  }, [user?._id]);

  if (!companyData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto mt-8 py-11 px-11 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Welcome <span className="text-primary"> {user?.username}</span> to Company&#39; Dashboard</h1>

      <div className="flex flex-col lg:flex-row lg:space-x-6">
        {/* Company Information */}
        <div className="lg:w-1/3 bg-white p-6 rounded-lg shadow-md mb-6 lg:mb-0">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Company Information</h2>
          <div className="flex items-center space-x-4 mb-4">
            {companyData.logoURL && (
              <img
                src={companyData.logoURL}
                alt="Company Logo"
                className="w-24 h-24 object-cover rounded-full shadow-md"
              />
            )}
            <div>
              <h3 className="text-xl font-bold">{companyData.companyName}</h3>
              <a
                href={companyData.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                {companyData.website}
              </a>
            </div>
          </div>
          <p className="text-gray-700 mb-4">{companyData.about}</p>
          <p className="text-gray-600">Location: {companyData.location}</p>
          <p className="text-gray-600">Mission: {companyData.mission}</p>
          <p className="text-gray-600">Vision: {companyData.vision}</p>
          <a
            href={companyData.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline mt-4 block"
          >
            LinkedIn Profile
          </a>
          <button
            className="mt-4 bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600"
            onClick={() => router.push("/dashboard/profile")}
          >
            Edit Profile
          </button>
        </div>

        {/* Services */}
        <div className="lg:w-2/3 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Company's Job</h2>
          {/* Render the list of company services here */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Example of a service card */}
            <div className="bg-white border rounded-lg p-4 shadow-sm">
              <h3 className="text-lg font-bold mb-2">Service Name</h3>
              <p className="text-gray-600">Service Description</p>
              <span className="text-sm font-medium text-gray-500">Price: $100</span>
            </div>
            {/* Add more service cards dynamically */}
          </div>
        </div>
      </div>

      {/* Performance Analytics Section */}
   
    </div>
  );
};

export default CompanyDashboard;
