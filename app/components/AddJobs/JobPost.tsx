"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/lib/UserContext";
import { JobPostFormData } from "../type/Jobs";



const JobPostForm: React.FC = () => {
  const { register, handleSubmit, reset } = useForm<JobPostFormData>();
  const { user } = useUser(); 
  const [loading, setLoading] = useState(false);
  const [skillsInput, setSkillsInput] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const router = useRouter();

  const addSkill = () => {
    if (skillsInput.trim() && !skills.includes(skillsInput.trim())) {
      setSkills([...skills, skillsInput.trim()]);
      setSkillsInput(""); 
    }
  };

  const removeSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  const onSubmit = async (data: JobPostFormData) => {
    setLoading(true);
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/jobs`, {
        ...data,
      createdby: user?._id,
      createdAt: new Date(),
        skills,
      });

      Swal.fire({
        title: 'Success!',
        text: 'Job posted successfully!',
        icon: 'success',
        showConfirmButton: false,
        timer: 1000
      });

      reset();
      setSkills([]); 
      router.push("/dashboard");
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'Something went wrong while posting the job.',
        icon: 'error',
        showConfirmButton: true,
      });
      console.error("Error posting job:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 w-[90%] p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Post a Job</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Job Title */}
        <div className="mb-4">
          <label className="block text-gray-900 font-semibold mb-2">Job Title:</label>
          <input
            type="text"
            {...register("title", { required: true })}
            className="w-full p-2 rounded-md bg-gray-100 text-gray-900"
            placeholder="Enter job title"
            required
          />
        </div>

        {/* Job Description */}
        <div className="mb-4">
          <label className="block text-gray-900 font-semibold mb-2">Job Description:</label>
          <textarea
            {...register("description", { required: true })}
            className="w-full p-2 rounded-md bg-gray-100 text-gray-900"
            placeholder="Describe the job"
            required
          />
        </div>

        {/* Location */}
        <div className="mb-4">
          <label className="block text-gray-900 font-semibold mb-2">Location:</label>
          <input
            type="text"
            {...register("location", { required: true })}
            className="w-full p-2 rounded-md bg-gray-100 text-gray-900"
            placeholder="Location (e.g. Remote, New York, etc.)"
            required
          />
        </div>

        {/* Salary */}
        <div className="mb-4">
          <label className="block text-gray-900 font-semibold mb-2">Salary:</label>
          <input
            type="text"
            {...register("salary", { required: true })}
            className="w-full p-2 rounded-md bg-gray-100 text-gray-900"
            placeholder="Salary (e.g. $60,000)"
            required
          />
        </div>

        {/* Job Type */}
        <div className="mb-4">
          <label className="block text-gray-900 font-semibold mb-2">Job Type:</label>
          <select
            {...register("jobType", { required: true })}
            className="w-full p-2 rounded-md bg-gray-100 text-gray-900"
            required
          >
            <option value="">Select job type</option>
            <option value="full-time">Full-Time</option>
            <option value="part-time">Part-Time</option>
            <option value="contract">Contract</option>
            <option value="freelance">Freelance</option>
          </select>
        </div>

        {/* Skills */}
        <div className="mb-4 w-[70%]">
          <label className="block text-gray-900 font-semibold mb-2">Skills Required:</label>
          <div className="flex space-x-2">
            <input
              type="text"
              value={skillsInput}
              onChange={(e) => setSkillsInput(e.target.value)}
              className="w-[50%] p-2 rounded-md bg-gray-100 text-gray-900"
              placeholder="Enter a skill"
            />
            <button
              type="button"
              onClick={addSkill}
              className="bg-blue-500 text-white w-[30%] py-2 text-[18px] rounded-md"
            >
             + Add Skill
            </button>
          </div>
          <div className="mt-5 mb-5">
            {skills.length > 0 && (
              <div className="flex flex-wrap space-x-2">
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full inline-flex items-center space-x-1"
                  >
                    <span>{skill}</span>
                    <button
                      type="button"
                      onClick={() => removeSkill(skill)}
                      className="text-red-500 hover:text-red-700 "
                    >
                      &times;
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <button
          type="submit"
          className={`w-full mt-10 mb-11 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded ${loading ? 'cursor-not-allowed opacity-50' : ''}`}
          disabled={loading}
        >
          {loading ? 'Posting...' : 'Post Job'}
        </button>
      </form>
    </div>
  );
};

export default JobPostForm;
