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
      fetchJobAlerts(); // Refresh the list of job alerts
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
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">Create Job Alert</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="max-w-[90%] mx-auto">
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
            <option value="internship">Internship</option>
          </select>
        </div>

        {/* Salary */}
        <div className="mb-4">
          <label className="block text-gray-900 font-semibold mb-2">Salary:</label>
          <input
            type="number"
            {...register("salary", { required: true })}
            className="w-full p-2 rounded-md bg-gray-100 text-gray-900"
            placeholder="Enter salary"
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
            placeholder="Location"
            required
          />
        </div>

        {/* Skills */}
        <div className="mb-4">
          <label className="block text-gray-900 font-semibold mb-2">Skills:</label>
          <div className="flex space-x-2">
            <input
              type="text"
              value={skillsInput}
              onChange={(e) => setSkillsInput(e.target.value)}
              className="w-[70%] p-2 rounded-md bg-gray-100 text-gray-900"
              placeholder="Enter a skill"
            />
            <button
              type="button"
              onClick={addSkill}
              className="bg-blue-500 text-white w-[30%] py-2 rounded-md"
            >
              + Add Skill
            </button>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full inline-flex items-center"
              >
                <span>{skill}</span>
                <button
                  type="button"
                  onClick={() => removeSkill(skill)}
                  className="text-red-500 ml-2 hover:text-red-700"
                >
                  &times;
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Experience */}
        <div className="mb-4">
          <label className="block text-gray-900 font-semibold mb-2">Experience (Years):</label>
          <input
            type="number"
            {...register("experience", { required: true })}
            className="w-full p-2 rounded-md bg-gray-100 text-gray-900"
            placeholder="Years of experience"
            required
          />
        </div>

        <button
          type="submit"
          className={`w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded ${
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
                className="p-4 bg-gray-100 rounded-md shadow flex justify-between items-center"
              >
                <div>
                  <p>
                    <strong>Job Type:</strong> {alert.jobType}
                  </p>
                  <p>
                    <strong>Location:</strong> {alert.location}
                  </p>
                  <p>
                    <strong>Skills:</strong> {alert.skills.join(", ")}
                  </p>
                  <p>
                    <strong>Salary:</strong> ${alert.salary}
                  </p>
                  <p>
                    <strong>Experience:</strong> {alert.experience} years
                  </p>
                </div>
                <button
                  onClick={() => deleteJobAlert(alert._id)}
                  className="text-red-500 hover:text-red-600"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No job alerts found.</p>
        )}
      </div>
    </div>
  );
};

export default JobAlertForm;
