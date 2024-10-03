"use client";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import axios from "axios";
import { useUser } from "@/app/lib/UserContext";
import { storage } from "@/firebase.config";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { Experience, JobSeekerProfileFormData } from "../../type/Profile";
import Link from "next/link";



const JobSeekerProfileForm: React.FC = () => {
  const { user } = useUser(); 
  const { register, handleSubmit, reset, setValue } = useForm<JobSeekerProfileFormData>();
  const [photoURL, setPhotoURL] = useState<File | null>(null);
  const [resume, setResume] = useState<File | null>(null);
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState<string>("");
  const router = useRouter();


  const [experience, setExperience] = useState<Experience[]>([]);
  const [currentExperience, setCurrentExperience] = useState<Experience>({
    company: "",
    location: "",
    position: "",
    description:"",
    joinDate: "",
    current: false,
  });

  const [existingPhotoURL, setExistingPhotoURL] = useState<string | null>(null); 
  const [existingResumeURL, setExistingResumeURL] = useState<string | null>(null); 
  console.log(existingResumeURL);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/users/${user?._id}`);
        console.log(response.data);
        const data = response.data;
        const userData = data?.user;
  
        setValue("bio", userData?.bio || "");
        setValue("linkedin", userData.linkedin || "");
        setValue("phone", userData.phone || "");
        setValue("portfolio", userData.portfolio || "");
        setValue("location", userData.location || "");
        setSkills(userData.skills || []);
        setExperience(userData.experience || []);
  
        // Set existing photoURL and resumeURL if available
        setExistingPhotoURL(userData.photoURL || null);
        setExistingResumeURL(userData.resumeURL || null);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
  
    fetchUserData();
  }, [user, setValue]);
  

  const uploadFileToFirebase = async (file: File, folder: string): Promise<string | null> => {
    const storageRef = ref(storage, `${folder}/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        null,
        (error) => {
          console.error("File upload error:", error);
          reject(null);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadURL);
        }
      );
    });
  };

  // Handle form submission
  const onSubmit = async (data: JobSeekerProfileFormData) => {
    let uploadedPhotoURL = existingPhotoURL;
    let uploadedResumeURL = existingResumeURL;

    // Upload photo to Firebase Storage
    if (photoURL) {
      uploadedPhotoURL = await uploadFileToFirebase(photoURL, "profile_photos");
    }

    // Upload resume to Firebase Storage
    if (resume) {
      uploadedResumeURL = await uploadFileToFirebase(resume, "resumes");
    }

    // Prepare the data for the PUT request
    const updatedProfileData = {
      bio: data.bio,
      linkedin: data.linkedin,
      portfolio: data.portfolio,
      location: data.location,
      phone:data.phone,
      skills,
      experience,
      ...(uploadedPhotoURL && { photoURL: uploadedPhotoURL }), 
      ...(uploadedResumeURL && { resumeURL: uploadedResumeURL }), 
    };

    try {
      const response = await axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}/users/${user?._id}`, updatedProfileData);
      console.log("Profile updated successfully:", response.data);

      Swal.fire({
        title: 'Success!',
        text: 'Profile Updated successfully!',
        icon: 'success',
        showConfirmButton: false,
        timer: 1000
      });

      // Redirect to Dashboard
      router.push('/dashboard');
      reset();
      setSkills([]);
      setExperience([]);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  // Add skill
  const addSkill = () => {
    if (skillInput && !skills.includes(skillInput)) {
      setSkills([...skills, skillInput]);
      setSkillInput("");
    }
  };

  // Remove skill
  const removeSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  // Add experience
  const addExperience = () => {
    if (currentExperience.company && currentExperience.position && currentExperience.joinDate) {
      setExperience([...experience, currentExperience]);
      setCurrentExperience({
        company: "",
        location: "",
        position: "",
        joinDate: "",
        description:"",
        current: false,
      });
    }
  };

  // Remove experience
  const removeExperience = (index: number) => {
    setExperience(experience.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-gray-900 mb-6"><span className="capitalize me-2 text-primary">{user?.username}</span>Edit Your Profile</h1>
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        {/* Bio */}
        <div className="mb-4">
          <label className="block text-gray-900 font-semibold  mb-2">Bio: <span className=" text-red-500">*</span></label>
          <textarea
            {...register("bio")}
            className="w-full p-2 rounded-md bg-gray-100 text-gray-900"
            required
            placeholder="Tell us about yourself"
          />
        </div>
          {/* phone */}
          <div className="mb-4 w-[70%]">
          <label className="block text-gray-900 mb-2 font-semibold ">Phone:  <span className=" text-red-500">*</span></label>
          <input
            type="text"
            {...register("phone")}
            className="w-full p-2 rounded-md bg-gray-100 text-gray-900"
            required
            placeholder="Enter your Phone Number "
          />
        </div>
         {/* Location */}
         <div className="mb-4 w-[70%]">
          <label className="block text-gray-900 mb-2 font-semibold ">Location:  <span className=" text-red-500">*</span></label>
          <input
            type="text"
            {...register("location")}
            className="w-full p-2 rounded-md bg-gray-100 text-gray-900"
            required
            placeholder="Enter your location"
          />
        </div>

      {/* Skills */}
      <div className="mb-4 mt-2 w-[80%]">
          <label className="block text-gray-900 mb-2 font-semibold ">Skills:  <span className=" text-red-500">*</span></label>
          <div className="flex items-center">
            <input
              type="text"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              
              className="w-1/3 p-2 rounded-md bg-gray-100 text-gray-900"
              placeholder="Enter a skill"
            />
            <button type="button" onClick={addSkill} className="ml-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
             + Add Skill
            </button>
          </div>
          <div className="mt-2">
            {skills.map((skill, index) => (
              <div key={index} className="inline-flex items-center bg-gray-200 text-gray-700 px-3 py-1 rounded-full mr-2 mt-2">
                {skill}
                <button type="button" onClick={() => removeSkill(skill)} className="ml-2 text-red-500">
                  x
                </button>
              </div>
            ))}
          </div>
        </div>
              {/* Experience */}
              <div className="mb-4 w-[70%] mt-2">
          <label className="block text-gray-900 mb-2 font-semibold ">Experience:</label>
         {/* exiting exp */}
          <div className="mt-2">
            {experience.map((exp, index) => (
              <div key={index} className="flex justify-between bg-blue-100 p-3 rounded-md mb-2">
                <div className="my-3">
                  <p className="text-[16px] capitalize font-bold">{exp?.company} - <span className="text-[14px] font-semibold">{exp?.location}</span></p>
                  <p className="font-medium capitalize text-[16px]">{exp?.position}</p>
                  <p className="pt-1 text-[13px]">{exp.joinDate} - {exp.current ? "Present" : exp.endDate}</p>
                  <p className="py-2 text-[14px] ">{exp.description ??""}</p>
                </div>
                <button type="button" onClick={() => removeExperience(index)} className="text-red-500 hover:underline">
                  Remove
                </button>
              </div>
            ))}
          </div>
         
          <div className="flex flex-col">
            {/* Company */}
            <input
              type="text"
              value={currentExperience.company}
              onChange={(e) => setCurrentExperience({ ...currentExperience, company: e.target.value })}
              className="mb-2 p-2 rounded-md bg-gray-100 text-gray-900"
              placeholder="Company Name"
            />
            {/* Location */}
            <input
              type="text"
              value={currentExperience.location}
              onChange={(e) => setCurrentExperience({ ...currentExperience, location: e.target.value })}
              className="mb-2 p-2 rounded-md bg-gray-100 text-gray-900"
              placeholder="Location"
            />
            {/* Position */}
            <input
              type="text"
              value={currentExperience.position}
              onChange={(e) => setCurrentExperience({ ...currentExperience, position: e.target.value })}
              className="mb-2 p-2 rounded-md bg-gray-100 text-gray-900"
              placeholder="Position"
            />
             <textarea
              
              value={currentExperience.description}
              onChange={(e) => setCurrentExperience({ ...currentExperience, description: e.target.value })}
              className="mb-2 p-2 rounded-md bg-gray-100 text-gray-900"
              placeholder="Description"
            />
            {/* Join Date */}
            <label htmlFor="" className="py-1">Join date</label>
            <input
              type="date"
              value={currentExperience.joinDate}
              onChange={(e) => setCurrentExperience({ ...currentExperience, joinDate: e.target.value })}
              className="mb-2 p-2 rounded-md bg-gray-100 text-gray-900"
            />
            {/* Current Job */}
            <div className="flex items-center mb-2">
              <input
                type="checkbox"
                checked={currentExperience.current}
                onChange={(e) => setCurrentExperience({ ...currentExperience, current: e.target.checked })}
              />
              <label className="ml-2 text-gray-900">Current Job</label>
            </div>
            {/* End Date (optional if current job) */}
            <label htmlFor="" className="py-1">End date</label>
            {!currentExperience.current && (
              <input
                type="date"
                value={currentExperience.endDate}
                onChange={(e) => setCurrentExperience({ ...currentExperience, endDate: e.target.value })}
                className="mb-2 p-2 rounded-md bg-gray-100 text-gray-900"
              />
            )}
            <button type="button" onClick={addExperience} className="bg-blue-500 hover:bg-blue-600 my-2 text-white font-bold py-2 px-4 rounded">
              Add Experience
            </button>
          </div>
         
        </div>



      
        {/* Profile Picture Upload */}

        {existingPhotoURL && (
            <div className="mt-2">
             
              <img src={existingPhotoURL} alt="Profile" className="w-32 h-32 object-cover rounded-full" />
            </div>
          )}
        <div className="mb-4">
          <label className="block text-gray-900 mb-2 mt-2 font-semibold">Profile Picture:  <span className=" text-red-500">*</span></label>
          <input
            type="file"
            accept="image/*"
            className="block w-full text-sm text-gray-900"
            onChange={(e) => setPhotoURL(e.target.files ? e.target.files[0] : null)}
          />
          
        </div>

        {/* Resume Upload */}
        <div className="mb-4 mt-2">
            <div><div className="mb-4">
  <label className="block text-gray-900 mb-2 font-semibold">Resume:  <span className=" text-red-500">*</span></label>
  {user?.resume ? (
    <div className="mt-2">
     <div className="mt-2">
      <embed src={user?.resume} width="100%" height="450px" type="application/pdf" />
    </div>
       
    </div>
  ) : (
    <p></p>
  )}
</div>
</div>
<div>

          <input
            type="file"
            accept=".pdf,.doc,.docx"
            className="block w-full text-sm text-gray-900"
            onChange={(e) => setResume(e.target.files ? e.target.files[0] : null)}
          />
          {existingResumeURL && (
            <div className="mt-2">
              <p>Current Resume:</p>
              <a href={existingResumeURL} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                View Resume
              </a>
            </div>
          )}
          </div>
        </div>
                {/* LinkedIn */}
                <div className="mb-4 mt-9">
          <label className="block text-gray-900 mb-2 font-semibold">LinkedIn Profile:</label>
          <input
            type="url"
            {...register("linkedin")}
            className="w-full p-2 rounded-md bg-gray-100 text-gray-900"
            placeholder="Enter your LinkedIn URL"
          />
        </div>

        {/* Portfolio */}
        <div className="mb-11">
          <label className="block text-gray-900 mb-2 font-semibold">Portfolio Website:</label>
          <input
            type="url"
            {...register("portfolio")}
            className="w-full p-2 rounded-md bg-gray-100 text-gray-900"
            placeholder="Enter your portfolio URL"
          />
        </div>

  

  <div className="flex justify-between items-center gap-9">
      <Link href="/dashboard" className="bg-red-500 text-center mb-11 hover:bg-red-600 text-white w-1/2 mx-auto font-bold py-2 px-4 rounded">
        Cancel
      </Link>


        <button type="submit" className="bg-blue-500 mb-11 hover:bg-blue-600 text-white w-1/2 mx-auto font-bold py-2 px-4 rounded">
          Update Profile
        </button>
        </div>
      </form>
    </div>
  );
};

export default JobSeekerProfileForm;
