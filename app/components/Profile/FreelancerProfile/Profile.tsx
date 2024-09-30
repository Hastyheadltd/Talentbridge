"use client";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { useUser } from "@/app/lib/UserContext"; 
import Swal from "sweetalert2";

interface Experience {
    company: string;
    location: string;
    description: string;
    position: string;
    skills: string[];
    joinDate: string;
    endDate: string | null;
    isCurrentJob: boolean;
  }

interface FormData {
  bio: string;
  experiences: Experience[];
  desiredRole: string;
  desiredSalary: string;
  currentRole: string;
  website: string;
  linkedin: string;
  achievements: string;
  skills: string[]; // New field for skills
  resume: File | null;
  photoURL: File | null;
}

const ProfessionalProfileForm = () => {
  const { user, setUser } = useUser();
  const [formData, setFormData] = useState<FormData>({
    bio: "",
    experiences: [{
      company: "",
      location: "",
      description: "",
      position: "",
      skills: [],
      joinDate: "",
      endDate: null,
      isCurrentJob: false,
    }],
    desiredRole: "",
    desiredSalary: "",
    currentRole: "",
    website: "",
    linkedin: "",
    achievements: "",
    skills: [], 
    resume: null,
    photoURL: null,
  });
  const [newSkill, setNewSkill] = useState<string>(""); 
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      setFormData({
        bio: user?.bio || "",
        experiences: user?.experiences || [{
          company: "",
          location: "",
          description: "",
          position: "",
          skills: [],
          joinDate: "",
          endDate: null,
          isCurrentJob: false,
        }],
        desiredRole: user?.desiredRole || "",
        desiredSalary: user?.desiredSalary || "",
        currentRole: user?.currentRole || "",
        website: user?.website || "",
        linkedin: user?.linkedin || "",
        achievements: user?.achievements || "",
        skills: user?.skills || [], // Use skills from user data
        resume: null,
        photoURL: null,
      });
    }
  }, [user]);

  // Handle input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle file changes (profile image and resume)
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      setFormData((prevData) => ({
        ...prevData,
        [name]: files[0],
      }));
    }
  };

  const handleExperienceChange = <T extends keyof Experience>(
    index: number, 
    field: T, 
    value: Experience[T] // Infer the correct type based on the field
  ) => {
    const newExperienceFields = [...formData.experiences];
  
    if (field === "skills" && Array.isArray(value)) {
      newExperienceFields[index][field] = value as Experience["skills"];
    } else if (field === "isCurrentJob" && typeof value === "boolean") {
      newExperienceFields[index][field] = value as Experience["isCurrentJob"];
      if (value === true) {
        newExperienceFields[index].endDate = null; // Disable endDate if current job is selected
      }
    } else if (typeof value === "string") {
      newExperienceFields[index][field] = value as Experience[T]; 
    }
  
    setFormData((prevData) => ({
      ...prevData,
      experiences: newExperienceFields,
    }));
  };
  
  const addExperienceField = () => {
    setFormData((prevData) => ({
      ...prevData,
      experiences: [...prevData.experiences, { company: "", location: "", description: "", position: "", skills: [], joinDate: "", endDate: null, isCurrentJob: false }],
    }));
  };

  const removeExperienceField = (index: number) => {
    const newExperienceFields = [...formData.experiences];
    newExperienceFields.splice(index, 1);
    setFormData((prevData) => ({
      ...prevData,
      experiences: newExperienceFields,
    }));
  };

  // Handle adding a new skill
  const addSkill = () => {
    if (newSkill.trim()) {
      setFormData((prevData) => ({
        ...prevData,
        skills: [...prevData.skills, newSkill.trim()],
      }));
      setNewSkill(""); // Clear the input after adding
    }
  };

  // Handle removing a skill
  const removeSkill = (skillToRemove: string) => {
    setFormData((prevData) => ({
      ...prevData,
      skills: prevData.skills.filter(skill => skill !== skillToRemove),
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const profileFormData = new FormData();
      profileFormData.append("bio", formData.bio);
      profileFormData.append("experiences", JSON.stringify(formData.experiences)); 
      profileFormData.append("desiredRole", formData.desiredRole);
      profileFormData.append("desiredSalary", formData.desiredSalary);
      profileFormData.append("currentRole", formData.currentRole);
      profileFormData.append("website", formData.website);
      profileFormData.append("linkedin", formData.linkedin);
      profileFormData.append("achievements", formData.achievements);
      profileFormData.append("skills", JSON.stringify(formData.skills));
      if (formData.resume) profileFormData.append("resume", formData.resume);
      if (formData.photoURL) profileFormData.append("photoURL", formData.photoURL);

      const response = await axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}/users/${user?._id}`, profileFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        setUser(response.data.user); 
        Swal.fire({
          title: "Success!",
          text: "Profile updated successfully!",
          icon: "success",
          confirmButtonText: "OK",
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: "Failed to update profile!",
          icon: "error",
          confirmButtonText: "Try Again",
        });
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      Swal.fire({
        title: "Error!",
        text: "Server error occurred!",
        icon: "error",
        confirmButtonText: "Try Again",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[1070px] mx-auto p-6 mt-10 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4 text-primary py-3">
        {user?.username}, <span className="text-secondary">Set Your Profile</span>
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Bio */}
        <div>
          <label htmlFor="bio" className="block font-semibold mb-1">Bio</label>
          <textarea
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            placeholder="Write Your Bio"
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        {/* Experiences */}
        <div>
          <label className="block font-semibold">Experience</label>
          {formData.experiences?.map((experience, index) => (
            <div key={index} className="experience-field mb-4 border border-gray-300 p-4 rounded-md">
              <input
                type="text"
                placeholder="Company"
                value={experience.company}
                onChange={(e) => handleExperienceChange(index, "company", e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mb-2"
              />
              <input
                type="text"
                placeholder="Location"
                value={experience.location}
                onChange={(e) => handleExperienceChange(index, "location", e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mb-2"
              />
              <input
                type="text"
                placeholder="Position"
                value={experience.position}
                onChange={(e) => handleExperienceChange(index, "position", e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mb-2"
              />
              <textarea
                placeholder="Experience Description"
                value={experience.description}
                onChange={(e) => handleExperienceChange(index, "description", e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mb-2"
              />
              <div>
                <label className="block font-semibold">Join Date</label>
                <input
                  type="date"
                  value={experience.joinDate}
                  onChange={(e) => handleExperienceChange(index, "joinDate", e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded mb-2"
                />
              </div>
              <div>
                <label className="block font-semibold">End Date</label>
                <input
                  type="date"
                  value={experience.isCurrentJob ? "" : experience.endDate || ""}
                  onChange={(e) => handleExperienceChange(index, "endDate", e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded mb-2"
                  disabled={experience.isCurrentJob}
                />
              </div>
              <div>
                <label className="block font-semibold">Current Job</label>
                <input
                  type="checkbox"
                  checked={experience.isCurrentJob}
                  onChange={(e) => handleExperienceChange(index, "isCurrentJob", e.target.checked)}
                  className="w-4 h-4"
                />
              </div>
              <button
                type="button"
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 text-[16px] rounded mt-2"
                onClick={() => removeExperienceField(index)}
              >
                Remove Experience
              </button>
            </div>
          ))}
          <button
            type="button"
            className="bg-primary hover:bg-blue-900 text-white px-3 py-2 text-[16px] rounded mt-2"
            onClick={addExperienceField}
          >
            Add Experience
          </button>
        </div>

        {/* Skills */}
        <div>
          <label className="block font-semibold">Skills</label>
          <div className="flex space-x-2 mb-2">
            <input
              type="text"
              placeholder="Add a skill"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <button
              type="button"
              className="bg-primary hover:bg-blue-900 text-white px-3 py-2 text-[16px] rounded"
              onClick={addSkill}
            >
              Add Skill
            </button>
          </div>
          <div className="flex flex-wrap space-x-2">
            {formData.skills.map((skill, index) => (
              <div key={index} className="bg-gray-200 text-black px-3 py-1 rounded-md mb-2">
                {skill}
                <button
                  type="button"
                  className="ml-2 text-red-500"
                  onClick={() => removeSkill(skill)}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Other Fields */}
        <div>
          <label htmlFor="desiredRole" className="block font-semibold">Desired Role</label>
          <input
            type="text"
            id="desiredRole"
            name="desiredRole"
            value={formData.desiredRole}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="desiredSalary" className="block font-semibold">Desired Salary</label>
          <input
            type="text"
            id="desiredSalary"
            name="desiredSalary"
            value={formData.desiredSalary}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="currentRole" className="block font-semibold">Describe Your Current Role</label>
          <textarea
            id="currentRole"
            name="currentRole"
            value={formData.currentRole}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label htmlFor="website" className="block font-semibold">Website</label>
          <input
            type="url"
            id="website"
            name="website"
            value={formData.website}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label htmlFor="linkedin" className="block font-semibold">LinkedIn</label>
          <input
            type="url"
            id="linkedin"
            name="linkedin"
            value={formData.linkedin}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label htmlFor="achievements" className="block font-semibold">Achievements</label>
          <textarea
            id="achievements"
            name="achievements"
            value={formData.achievements}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {/* Profile Image Upload */}
        <div>
          <label htmlFor="profileImage" className="block font-semibold">Upload Profile Image</label>
          <input
            type="file"
            id="profileImage"
            name="profileImage"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full p-2"
          />
        </div>

        {/* Resume Upload */}
        <div>
          <label htmlFor="resume" className="block font-semibold">Upload Resume</label>
          <input
            type="file"
            id="resume"
            name="resume"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            className="w-full p-2"
          />
        </div>

        <button
          type="submit"
          className={`w-full p-3 bg-blue-500 text-white rounded font-semibold hover:bg-blue-600 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
};

export default ProfessionalProfileForm;
