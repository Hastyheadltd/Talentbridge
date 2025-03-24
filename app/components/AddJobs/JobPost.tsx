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

  // State for arrays
  const [skillsInput, setSkillsInput] = useState("");
  const [skills, setSkills] = useState<string[]>([]);

  const [languageInput, setLanguageInput] = useState("");
  const [languages, setLanguages] = useState<string[]>([]);

  const [responsibilityInput, setResponsibilityInput] = useState("");
  const [responsibilities, setResponsibilities] = useState<string[]>([]);

  const router = useRouter();

  // --- Skills handlers ---
  const addSkill = () => {
    const trimmed = skillsInput.trim();
    if (trimmed && !skills.includes(trimmed)) {
      setSkills([...skills, trimmed]);
    }
    setSkillsInput("");
  };
  const removeSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  // --- Languages handlers ---
  const addLanguage = () => {
    const trimmed = languageInput.trim();
    if (trimmed && !languages.includes(trimmed)) {
      setLanguages([...languages, trimmed]);
    }
    setLanguageInput("");
  };
  const removeLanguage = (lang: string) => {
    setLanguages(languages.filter((l) => l !== lang));
  };

  // --- Responsibilities handlers ---
  const addResponsibility = () => {
    const trimmed = responsibilityInput.trim();
    if (trimmed && !responsibilities.includes(trimmed)) {
      setResponsibilities([...responsibilities, trimmed]);
    }
    setResponsibilityInput("");
  };
  const removeResponsibility = (resp: string) => {
    setResponsibilities(responsibilities.filter((r) => r !== resp));
  };

  // --- Submit handler ---
  const onSubmit = async (data: JobPostFormData) => {
    setLoading(true);
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/jobs`, {
        ...data,
        createdby: user?._id,
        createdAt: new Date(),
        // Pass our arrays
        skills,
        languages,
        responsibilities,
      });
      console.log(response);

      Swal.fire({
        title: "Success!",
        text: "Job posted successfully!",
        icon: "success",
        showConfirmButton: false,
        timer: 1000,
      });

      // Reset form and local arrays
      reset();
      setSkills([]);
      setLanguages([]);
      setResponsibilities([]);
      router.push("/dashboard");
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Something went wrong while posting the job.",
        icon: "error",
        showConfirmButton: true,
      });
      console.error("Error posting job:", error);
    } finally {
      setLoading(false);
    }
  };

  // Only allow approved companies to post a job
  if (user?.approve !== "true") {
    return (
      <div className="m-5 border border-primary rounded-[24px] p-8">
        <h1 className="text-2xl font-bold text-red-600 text-center mt-3">
          Only approved companies can post a job. Please contact support for approval.
        </h1>
      </div>
    );
  }

  return (
    <div className="w-full pe-7">
      <h1 className="text-[32px] text-center text-primary pb-3 pt-5 font-bold">Post a Job</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="mx-auto m-5 border border-primary rounded-[24px] p-8">

        {/* Row 1: Title, Location */}
        <div className="flex justify-between items-center gap-5">
          {/* Title */}
          <div className="mb-4 w-full">
            <label className="block text-gray-900 font-semibold text-[16px] mb-2">
              Job Title:
            </label>
            <input
              type="text"
              {...register("title", { required: true })}
              className="w-full p-2 rounded-md text-[16px] focus:outline-none border border-[#E8EDEF] text-gray-900"
              placeholder="Enter job title"
              required
            />
          </div>
          {/* Location */}
          <div className="mb-4 w-full">
            <label className="block text-gray-900 font-semibold text-[16px] mb-2">
              Location:
            </label>
            <input
              type="text"
              {...register("location", { required: true })}
              className="w-full p-2 rounded-md text-[16px] focus:outline-none border border-[#E8EDEF] text-gray-900"
              placeholder="Location (e.g. Remote, New York, etc.)"
              required
            />
          </div>
        </div>

        {/* Row 2: Description */}
        <div className="mb-4">
          <label className="block text-gray-900 font-semibold text-[16px] mb-2">
            Job Description:
          </label>
          <textarea
            {...register("description", { required: true })}
            className="w-full p-2 rounded-md text-[16px] focus:outline-none border border-[#E8EDEF] text-gray-900"
            placeholder="Describe the job"
            required
          />
        </div>

        {/* Row 3: Salary, Job Type */}
        <div className="flex justify-between items-center gap-5">
          {/* Salary */}
          <div className="mb-4 w-full">
            <label className="block text-gray-900 font-semibold text-[16px] mb-2">
              Salary: €
            </label>
            <input
              type="number"
              min="0"
              {...register("salary", { required: true, min: 0 })}
              className="w-full p-2 rounded-md text-[16px] focus:outline-none border border-[#E8EDEF] text-gray-900"
              placeholder="Salary (e.g. €60,000)"
              required
            />
          </div>
          {/* Job Type */}
          <div className="mb-4 w-full">
            <label className="block text-gray-900 font-semibold text-[16px] mb-2">
              Job Type:
            </label>
            <select
              {...register("jobType", { required: true })}
              className="w-full p-2 rounded-md text-[16px] focus:outline-none border border-[#E8EDEF] text-gray-900"
              required
            >
              <option value="full-time">Full-Time</option>
              <option value="part-time">Part-Time</option>
              <option value="contract">Contract</option>
              <option value="freelance">Freelance</option>
            </select>
          </div>
        </div>

        {/* Row 4: Experience, Vacancies */}
        <div className="flex justify-between items-center gap-5">
          {/* Experience */}
          <div className="mb-4 w-full">
            <label className="block text-gray-900 font-semibold text-[16px] mb-2">
              Experience (Years):
            </label>
            <input
              type="number"
              min="0"
              {...register("experience", { required: true, min: 0 })}
              className="w-full p-2 rounded-md text-[16px] focus:outline-none border border-[#E8EDEF] text-gray-900"
              placeholder="Years of experience"
              required
            />
          </div>
          {/* Vacancies */}
          <div className="mb-4 w-full">
            <label className="block text-gray-900 font-semibold text-[16px] mb-2">
              Vacancies:
            </label>
            <input
              type="number"
              {...register("vacancies", { required: true ,min: 0  })}
              className="w-full p-2 rounded-md text-[16px] focus:outline-none border border-[#E8EDEF] text-gray-900"
              placeholder="Number of vacancies"
              required
               min="0"
            />
          </div>
        </div>

        {/* Row 5: Employment Type, Industry */}
        <div className="flex justify-between items-center gap-5">
          {/* Employment Type */}
          <div className="mb-4 w-full">
            <label className="block text-gray-900 font-semibold text-[16px] mb-2">
              Employment Type
            </label>
            <select
              {...register("employmentType", { required: true })}
              className="w-full p-2 rounded-md text-[16px] focus:outline-none border border-[#E8EDEF] text-gray-900"
              required
            >
              <option value="permanent">Permanent</option>
              <option value="temporary">Temporary</option>
            </select>
          </div>
          {/* Industry */}
          <div className="mb-4 w-full">
            <label className="block text-gray-900 font-semibold text-[16px] mb-2">
              Industry
            </label>
            <select
              {...register("industry", { required: true })}
              className="w-full p-2 rounded-md text-[16px] focus:outline-none border border-[#E8EDEF] text-gray-900"
              required
            >
              <option value="IT">IT</option>
              <option value="Medicine">Medicine</option>
              <option value="Engineering">Engineering</option>
              <option value="HR">HR</option>
              <option value="Finance">Finance</option>
              <option value="Sales">Sales</option>
              <option value="Others">Others</option>
            </select>
          </div>
        </div>

        {/* Benefits */}
        <div className="mb-4 w-full">
          <label className="block text-gray-900 font-semibold text-[16px] mb-2">
            Benefits
          </label>
          <textarea
            {...register("benefits", { required: true })}
            className="w-full p-2 h-[100px] rounded-md text-[16px] focus:outline-none border border-[#E8EDEF] text-gray-900"
            placeholder="Write here......"
            required
          />
        </div>

        {/* Skills Section */}
        <div className="mb-4 w-full">
          <label className="block text-gray-900 font-semibold text-[16px] mb-2">
            Skills Required:
          </label>
          <div className="flex space-x-2">
            <input
              type="text"
              value={skillsInput}
              onChange={(e) => setSkillsInput(e.target.value)}
              className="w-full p-2 rounded-md text-[16px] focus:outline-none border border-[#E8EDEF] text-gray-900"
              placeholder="Enter a skill"
              
            />
            <button
              type="button"
              onClick={addSkill}
              className="bg-black w-[300px] text-white py-2 text-[16px] rounded-md"
            >
              + Add Skill
            </button>
          </div>

          {skills.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full inline-flex items-center"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeSkill(skill)}
                    className="text-red-500 hover:text-red-700 ml-2"
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Languages Section */}
        <div className="mb-4 w-full">
          <label className="block text-gray-900 font-semibold text-[16px] mb-2">
            Languages:
          </label>
          <div className="flex space-x-2">
            <input
              type="text"
              value={languageInput}
              onChange={(e) => setLanguageInput(e.target.value)}
              className="w-full p-2 rounded-md text-[16px] focus:outline-none border border-[#E8EDEF] text-gray-900"
              placeholder="Enter a language (e.g. English)"
            />
            <button
              type="button"
              onClick={addLanguage}
              className="bg-black w-[300px] text-white py-2 text-[16px] rounded-md"
            >
              + Add Language
            </button>
          </div>

          {languages.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2">
              {languages.map((lang, index) => (
                <span
                  key={index}
                  className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full inline-flex items-center"
                >
                  {lang}
                  <button
                    type="button"
                    onClick={() => removeLanguage(lang)}
                    className="text-red-500 hover:text-red-700 ml-2"
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Responsibilities Section */}
        <div className="mb-4 w-full">
          <label className="block text-gray-900 font-semibold text-[16px] mb-2">
            Key Responsibilities:
          </label>
          <div className="flex space-x-2">
            <input
              type="text"
              value={responsibilityInput}
              onChange={(e) => setResponsibilityInput(e.target.value)}
              className="w-full p-2 rounded-md text-[16px] focus:outline-none border border-[#E8EDEF] text-gray-900"
              placeholder="Enter a responsibility"
            />
            <button
              type="button"
              onClick={addResponsibility}
              className="bg-black w-[300px] text-white py-2 text-[16px] rounded-md"
            >
              + Add Responsibility
            </button>
          </div>

          {responsibilities.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2">
              {responsibilities.map((resp, index) => (
                <span
                  key={index}
                  className="bg-green-100 text-green-700 px-3 py-1 rounded-full inline-flex items-center"
                >
                  {resp}
                  <button
                    type="button"
                    onClick={() => removeResponsibility(resp)}
                    className="text-red-500 hover:text-red-700 ml-2"
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        <button
          type="submit"
          className={`w-1/3 mx-auto mt-10 mb-3 bg-[#0C34E4] hover:bg-blue-600 text-white font-bold py-3 px-4 rounded ${
            loading ? "cursor-not-allowed opacity-50" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Posting..." : "Post a Job"}
        </button>
      </form>
    </div>
  );
};

export default JobPostForm;
