"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { JobDetailsType } from "../type/Jobs";
import { useUser } from "@/app/lib/UserContext";
import moment from 'moment';
import { TiUserOutline } from "react-icons/ti";
import { GrLocation, GrSend } from "react-icons/gr";
import { PiBuildingOffice } from "react-icons/pi";
import { LuClock9 } from "react-icons/lu";
import { IoBriefcase, IoLanguageOutline } from "react-icons/io5";
import { BsBriefcase } from "react-icons/bs";
import { IoIosSend, IoLogoLinkedin } from "react-icons/io";
import Link from "next/link";
import { FaUser } from "react-icons/fa";
import { GoStarFill } from "react-icons/go";


interface Review {
  reviewapproved: string;
  rating: number;
}

const JobDetails: React.FC = () => {
  const { id } = useParams();
  const [job, setJob] = useState<JobDetailsType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
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



 

  if (loading) {
    return <div className="text-center flex justify-center items-center min-h-screen">Loading job details...</div>;
  }

  if (error) {
    return <div className="text-center flex justify-center items-center min-h-screen">{error}</div>;
  }

  if (!job) {
    return <div className="text-center flex justify-center items-center min-h-screen">Job not found</div>;
  }

  const commissionValue =
    job.commission != null
      ? job.commission.toFixed(2)
      : job.salary
      ? (job.salary * 0.15).toFixed(2)
      : "0.00";


  const approvedReviews = job.userInfo?.reviews?.filter(
    (review: { reviewapproved: string; }) => review.reviewapproved === "true"
  ) || [];

  const totalApproved = approvedReviews.length;
  const sumRatings = approvedReviews.reduce((acc: number, review: Review) => acc + (review.rating || 0), 0);
  const averageRating = totalApproved > 0 ? sumRatings / totalApproved : 0;





  return (
    <div className="max-w-[1240px] mx-auto mt-[120px] mb-16 flex justify-between items-start gap-6">
      {/* Job Details */}
      <div className="mt-4 lg:w-[800px]">
        <button className="bg-[#2670FF] text-white text-center px-2 py-1 capitalize rounded-full text-[13px] font-medium">{job.jobType}</button>
        <h1 className="text-[32px] leading-[40px] mt-1 font-bold text-[#3B3A40] mb-6">{job.title}</h1>
       
       <h2 className="border-[#EBEBEB] border-t pt-5 text-[20px] text-black font-bold">Job Overview</h2>
       
       <h2 className="text-primary font-bold text-[20px] mt-5">Description</h2>
        <p className="my-4 text-[16px] text-black">{job.description}</p>
        <h2 className="text-primary font-bold text-[20px] mt-5">Key Responsibilities:</h2>
       
          <ul className="list-disc ml-6 my-4 text-[16px] text-black">
            {job.responsibilities.map((responsibility, index) => (
              <li key={index}>{responsibility}</li>
            ))}
          </ul>


          <h2 className="text-primary font-bold text-[20px] mt-5">Skills Required:</h2>
          <ul className="list-disc ml-6 my-4 text-[16px] text-black">
            {job.skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>

          <h2 className="text-primary font-bold text-[20px] mt-5">Benefits:</h2>
          <p className="my-4 text-[16px] text-black">{job?.benefits}</p>


       
      </div>

      {/* Company Details */}
      <div className="bg-white  w-[450px]">

      {/* General Job Information */}

        <div className="border border-[#EBEBEB] rounded-[16px] p-4">
  <h1 className=" text-[16px] font-bold text-black">General Job Information </h1>
  <div className="flex justify-between items-center my-3">
    <div>
      <p className="text-[14px] text-black ">Salary</p>
      <h1 className="text-[20px] tracking-[-1px] font-bold">{job?.salary} €</h1>
      {user?.role === "freelancer" && (
                    <div className="">
                      <span className="text-[14px] text-primary inline-block">
                        Your Commission: {commissionValue} €
                      </span>
                    </div>
                  )}
    </div>
<div>
  <p className="text-[#758A89] text-[14px] text-right">Posted at</p>
  <p className="text-[#758A89] text-[14px] text-right">
  {moment(job.createdAt).format('LL')}
</p>

</div>
  </div>

  <div className="border-t border-b border-[#EBEBEB] mt-1 pt-4 mb-1 pb-4  grid grid-cols-2 gap-3 ">
 
  {/* Industry */}
  <div className="flex items-center space-x-2 text-[14px]">
        <PiBuildingOffice size={18} className="text-text" />
        <span>{job?.industry}</span>
      </div>

      {/* Location */}
      <div className="flex items-center space-x-2 text-[14px]">
        <GrLocation  size={17} className="text-text" />
        <span>{job?.location}</span>
      </div>

      {/* Employment Type */}
      <div className="flex items-center space-x-2 text-[14px] capitalize">
        <LuClock9  size={16} className="text-text" />
        <span>{job?.jobType}</span>
      </div>

      {/* Number of Vacancies */}
      <div className="flex items-center space-x-2 text-[14px]">
        <TiUserOutline size={18} className="text-text" />
        <span>{job?.vacancies} Vacancies</span>
      </div>

 {/* Languages */}
<div className="flex items-center space-x-1 text-[14px] capitalize">
  <IoLanguageOutline size={16} className="text-text mr-1" />
  {job?.languages && job.languages.length > 0 ? (
    job.languages?.map((language, index) => (
      <span key={index}>
        {language}
        {index !== job.languages.length - 1 && " ,"}
      </span>
    ))
  ) : (
    <span>No languages specified</span>
  )}
</div>


      {/* Experience Required */}
      <div className="flex items-center space-x-2 text-[14px] ms-1">
        <BsBriefcase  size={13} className="text-text " />
        <span>{job?.experience}+ Years of experience</span>
      </div>


  </div>


        </div>
        {/* company details */}
        {user ? (
  <>

        <div className="border mt-5 border-[#EBEBEB] rounded-[16px] p-4">
          {/* logo and title */}
  
        <div className="flex items-center mb-4 gap-5">
          {/* Company Logo */}
          {job.userInfo.logoURL && (
            <img
              src={job.userInfo.logoURL}
              alt={job.userInfo.companyName}
              className="h-20 w-20 rounded-full border-2 object-cover border-gray-300"
            />
          )}
          <div className="">
            <h2 className="text-[22px] font-medium text-black">{job?.userInfo?.companyName}</h2>
            <h2 className="text-[16px] text-black/70">{job?.userInfo?.location}</h2>
            {job?.userInfo?.linkedin?.startsWith("http") && (
  <div className="flex items-center gap-1 mt-[2px]">
    <IoLogoLinkedin />
    <Link
      href={job?.userInfo?.linkedin}
      target="_blank"
      className="hover:underline text-[14px] text-[#434343]"
    >
      LinkedIn
    </Link>
  </div>
)}

          </div>
        </div>

        {/* company description */}
        <div className="grid grid-cols-2 gap-5 mt-6 mb-2">
          <div className="flex gap-3">
    <div className="bg-[#8743DF] h-[48px] w-[48px] flex justify-center items-center">
    <FaUser color="white" />
  </div>
  <div>
    <h3 className="text-[20px] font-semibold text-black">{job?.userInfo?.employers} +</h3>
    <p className="text-[#AEAEAE] text-[14px]">Employee</p>
  </div>
          </div>
          <div className="flex gap-3">
          <div className="bg-[#FFBE17] h-[48px] w-[48px] flex justify-center items-center">
    <GoStarFill size={20} color="white" />
  </div>
  {/* rating info */}
  <div>
  {totalApproved > 0 ? (
  <div className="flex flex-col">
    <span className="text-[20px] font-semibold text-black">
      {averageRating.toFixed(1)} <span className="text-[#AEAEAE]">/ 5.0</span>
    </span>
    <span className="text-[#AEAEAE] text-[14px]">
      {totalApproved} review{totalApproved > 1 ? "s" : ""}
    </span>
  </div>
) : (
  <div>
    <span className="text-[16px] pt-1 text-[#AEAEAE]">No reviews </span>
  </div>
)}

        </div>
          </div>
          <div className="flex gap-3">
    <div className="bg-[#EB4335] h-[48px] w-[48px] flex justify-center items-center">
    <PiBuildingOffice size={20} color="white" />
  </div>
  <div>
    <h3 className="text-[20px] font-semibold text-black">{job?.userInfo?.industry}</h3>
    <p className="text-[#AEAEAE] text-[14px]">Industry</p>
  </div>
          </div>
          <div className="flex gap-3">
    <div className="bg-[#ECECEC] h-[48px] w-[48px] flex justify-center items-center">
    <IoBriefcase color="black" />
  </div>
  <div>
    <h3 className="text-[20px] font-semibold text-black">{job?.userInfo?.founded}</h3>
    <p className="text-[#AEAEAE] text-[14px]">Founded</p>
  </div>
          </div>

        </div>
        
  {/* abbout mission vission  */}
        <div className="my-4 border-t border-[#EBEBEB] pt-4">
          <h3 className="mt-1 mb-5 text-[16px] text-black font-bold">About Company</h3>

  <h3 className="text-[20px] text-[#031700]">Mission</h3>
          <p className="text-[#898989] text-[16px]  my-2">
             {job.userInfo.mission}
          </p>
          <h3 className="text-[20px] text-[#031700] mt-5">Vision</h3>
          <p className="text-[#898989] text-[16px]  my-2">
          {job.userInfo.vision}
          </p>
          <h3 className="text-[20px] text-[#031700] mt-5">About Us</h3>
          <p className="text-[#898989] text-[16px]  my-2">
          {job.userInfo.about}
          </p>
        </div>
      </div>
      </>
      ) : (
        <div className="text-[16px] text-[#999] italic text-center mt-4">
        Login to show Company Details
        </div>
      )}
      </div>
    </div>
  );
};

export default JobDetails;
