"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import { useUser } from "@/app/lib/UserContext";

interface JobAlertFormData {
  jobType: string;
  salary: number;
  location: string;
  skills: string[];
  experience: number;
}

interface JobAlert extends JobAlertFormData {
  _id: string;
  createdAt: string;
}

const JobAlertForm: React.FC = () => {
  const { register, handleSubmit, reset } = useForm<JobAlertFormData>();
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [skillsInput, setSkillsInput] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [jobAlerts, setJobAlerts] = useState<JobAlert[]>([]);

  const fetchJobAlerts = async () => {
    try {
      const response = await axios.get<JobAlert[]>(
        `${process.env.NEXT_PUBLIC_BASE_URL}/job-alerts?userId=${user?._id}`
      );
      setJobAlerts(response.data);
    } catch (error) {
      console.error("Failed to fetch job alerts:", error);
    }
  };

  useEffect(() => {
    if (user?._id) {
      fetchJobAlerts();
    }
  }, [user?._id]);

  const addSkill = () => {
    if (skillsInput.trim() && !skills.includes(skillsInput.trim())) {
      setSkills([...skills, skillsInput.trim()]);
      setSkillsInput("");
    }
  };

  const removeSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  const onSubmit = async (data: JobAlertFormData) => {
    setLoading(true);
    try {
      const payload = {
        ...data,
        skills,
        userId: user?._id,
        createdAt: new Date(),
      };

      await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/job-alerts`, payload);

      Swal.fire({
        title: "Success!",
        text: "Job alert created successfully!",
        icon: "success",
        showConfirmButton: false,
        timer: 1000,
      });

      reset();
      setSkills([]);
      fetchJobAlerts(); 
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Something went wrong while creating the job alert.",
        icon: "error",
        showConfirmButton: true,
      });
      console.error("Error creating job alert:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteJobAlert = async (_id: string) => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/job-alerts/${_id}`);
      Swal.fire({
        title: "Deleted!",
        text: "Job alert deleted successfully!",
        icon: "success",
        showConfirmButton: false,
        timer: 1000,
      });
      setJobAlerts(jobAlerts.filter((alert) => alert._id !== _id));
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Failed to delete job alert.",
        icon: "error",
        showConfirmButton: true,
      });
      console.error("Error deleting job alert:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-white ">
      <h1 className="text-3xl font-bold text-primary  mb-6 text-center">Create your Job Alerts </h1>
<div className="rounded-[24px] p-6 border border-primary">


      <form onSubmit={handleSubmit(onSubmit)} className="">
       
       
       
      <div className="grid grid-cols-2 gap-5">


 {/* Job Type */}
        <div className="mb-4">
          <label className="block text-black text-[16px] font-semibold mb-2">Job Type:</label>
          <select
            {...register("jobType", { required: true })}
            className="w-full p-2  bg-white border border-[#E8EDEF] rounded-md text-gray-900"
            required
          >
            <option value="">Select job type</option>
            <option value="full-time">Full-Time</option>
            <option value="part-time">Part-Time</option>
            <option value="contract">Contract</option>
            <option value="internship">Internship</option>
          </select>
        </div>

        {/* Salary */}
        <div className="mb-4">
          <label className="block text-black text-[16px] font-semibold mb-2">Salary:</label>
          <input
            type="number"
            {...register("salary", { required: true })}
            className="w-full p-2  bg-white border border-[#E8EDEF] focus:outline-none   rounded-md text-gray-900"
            placeholder="Enter salary"
            required
          />
        </div>

        {/* Location */}
        <div className="mb-4">
          <label className="block text-black text-[16px] font-semibold mb-2">Location:</label>
          <input
            type="text"
            {...register("location", { required: true })}
            className="w-full p-2  bg-white border border-[#E8EDEF] focus:outline-none  rounded-md text-gray-900"
            placeholder="Location"
            required
          />
        </div>

        {/* Skills */}
        <div className="mb-4">
          <label className="block text-black text-[16px] font-semibold mb-2">Skills:</label>
          <div className="flex space-x-2">
            <input
              type="text"
              value={skillsInput}
              onChange={(e) => setSkillsInput(e.target.value)}
              className="w-full p-2  bg-white border border-[#E8EDEF] focus:outline-none  rounded-md text-gray-900"
              placeholder="Enter a skill"
            />
            <button
              type="button"
              onClick={addSkill}
              className="bg-black  text-white w-[160px] text-[14px]  py-2 rounded-md"
            >
              + Add Skill
            </button>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span
                key={index}
                className=" text-black border brder-black/50  text-[14px] px-3 py-1 rounded-full inline-flex items-center"
              >
                <span>{skill}</span>
                <button
                  type="button"
                  onClick={() => removeSkill(skill)}
                  className="text-black ml-2 hover:text-red-700"
                >
                  &times;
                </button>
              </span>
            ))}
          </div>
        </div>
        </div>

        {/* Experience */}
        <div className="mb-4 w-1/2">
          <label className="block text-black text-[16px] font-semibold mb-2">Experience (Years):</label>
          <input
            type="number"
            {...register("experience", { required: true })}
            className="w-full p-2  bg-white border border-[#E8EDEF] focus:outline-none  rounded-md text-gray-900"
            placeholder="Years of experience"
            required
          />
        </div>

        <button
          type="submit"
          className={`w-1/2 mx-auto flex justify-center mt-8 bg-[#0C34E4] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
            loading ? "cursor-not-allowed opacity-50" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Job Alert"}
        </button>
      </form>

      {/* Job Alerts List */}
     
      <div className="mt-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Your Job Alerts</h2>
        {jobAlerts.length > 0 ? (
         <ul className="space-y-4">
         {jobAlerts.map((alert) => (
           <li
             key={alert._id}
             className="p-4 border border-black rounded-md flex justify-between items-center"
           >
             <div>
               <ul className="list-disc space-y-1 list-inside text-gray-800">
                 <li>
                   Job Type: {alert.jobType}
                 </li>
                 <li>
                   Location: {alert.location}
                 </li>
                 <li>
                   Skills: {alert.skills.join(", ")}
                 </li>
                 <li>
                   Minimum Salary: {alert.salary} Euro(€)
                 </li>
                 <li>
                   Experience: {alert.experience} years
                 </li>
               </ul>
             </div>
             <button
               onClick={() => deleteJobAlert(alert._id)}
               className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full text-sm"
             >
               Remove
             </button>
           </li>
         ))}
       </ul>
        ) : (
          <p className="text-gray-600">No job alerts found.</p>
        )}
      </div>
    </div>
    </div>
  );
};

export default JobAlertForm;
