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
import { BiPlus } from "react-icons/bi";



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
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/users/${user?._id}`, updatedProfileData);
      console.log("Profile Info Added successfully:", response.data);

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
    <div className="w-full mt-6 p-6 bg-white mb-12">
      <h1 className="text-[32px] font-bold text-primary text-center mb-6"><span className="capitalize me-2 ">{user?.username}</span>Edit Your Profile</h1>
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" className="border p-7 me-7 rounded-[24px] border-[#0C34E4] shadow-md">
         {/* Profile Picture Upload */}
         <label className="block text-black mb-2 text-[16px] font-semibold">Profile Picture  <span className=" text-red-500">*</span></label>
         <div className="mt-3 flex items-center gap-6">
        
         {existingPhotoURL && (
            <div className="mt-2">
             
              <img src={existingPhotoURL} alt="Profile"className="w-20 h-20 object-cover border border-primary/10 rounded-full" />
            </div>
          )}
        <div className="mb-4">
        <label className="inline-block px-4 py-2 border border-[#0C34E4] text-[#0C34E4]  text-[16px] rounded-md cursor-pointer hover:bg-gray-100"> Upload  picture
          <input
            type="file"
            accept="image/*"
              className="hidden"
            onChange={(e) => setPhotoURL(e.target.files ? e.target.files[0] : null)}
          />
           </label>
        </div>
        </div>
       
        {/* Resume Upload */}
        <div className="mb-4 mt-2">
            <div><div className="mb-4">
  <label className="block text-black mb-2 text-[16px] font-semibold">Resume:</label>
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

         {existingResumeURL && (

    
<div className="border border-black rounded-md mb-5">
  <iframe
    src={existingResumeURL}
    width="100%"
    height="500px"
    className="p-2 rounded-md"
  />


</div>
)}
          </div>
          <label className="inline-block px-4 py-2 border border-[#0C34E4] text-[#0C34E4]  text-[16px] rounded-md cursor-pointer hover:bg-gray-100"> Upload Resume
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            className="hidden"
            onChange={(e) => setResume(e.target.files ? e.target.files[0] : null)}
          />
          </label>
        </div>
      

 {/* contact info */}
       <div className="grid grid-cols-2 gap-4 pt-5">
                {/* LinkedIn */}
                <div className="">
          <label className="block text-black mb-2 text-[16px] font-semibold">LinkedIn Profile</label>
          <input
            type="url"
            {...register("linkedin")}
            className="w-full py-2 px-4  rounded-md text-black border border-black focus:outline-none "
            placeholder="Enter your LinkedIn URL"
          />
        </div>

        {/* Portfolio */}
        <div className="">
          <label className="block text-black mb-2 text-[16px] font-semibold">Portfolio Website:</label>
          <input
            type="url"
            {...register("portfolio")}
            className="w-full py-2 px-4  rounded-md text-black border border-black focus:outline-none"
            placeholder="Enter your portfolio URL"
          />
        </div>
                  {/* phone */}
                  <div className="">
          <label className="block text-black mb-2 text-[16px] font-semibold ">Phone:  <span className=" text-red-500">*</span></label>
          <input
            type="text"
            {...register("phone")}
            className="w-full py-2 px-4  rounded-md text-black border border-black focus:outline-none "
            required
            placeholder="Enter your Phone Number "
          />
        </div>
         {/* Location */}
         <div className="">
          <label className="block text-black mb-2 text-[16px] font-semibold">Location:  <span className=" text-red-500">*</span></label>
          <input
            type="text"
            {...register("location")}
            className="w-full py-2 px-4  rounded-md text-black border border-black focus:outline-none "
            required
            placeholder="Enter your location"
          />
        </div>


       </div>
       
       
        {/* Bio */}
       
        <div className="mb-4 pt-5">
          <label className="block text-black mb-2 text-[16px] font-semibold">Bio: <span className=" text-red-500">*</span></label>
          <textarea
            {...register("bio")}
            className="w-full py-2 px-4  rounded-md text-black border border-black focus:outline-none"
            required
            placeholder="Tell us about yourself"
          />
        </div>

      {/* Skills */}
      <div className="mb-4 mt-2 w-[80%]">
          <label className="block text-black mb-2 text-[16px] font-semibold">Skills:  <span className=" text-red-500">*</span></label>
          <div className="flex items-center">
            <input
              type="text"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              
              className="w-1/3  py-2 px-4  rounded-md text-black border border-black focus:outline-none"
              placeholder="Enter a skill"
            />
            <button type="button" onClick={addSkill} className="ml-2 bg-black flex items-center gap-2 text-white font-bold py-2 px-16 rounded">
             <BiPlus/> Add Skill
            </button>
          </div>
          <div className="mt-4">
            {skills.map((skill, index) => (
              <div key={index} className="inline-flex items-center text-black border border-black  px-4 py-[6px] mr-2 mt-2 rounded-[30px]">
                <p className="text-[14px]">{skill}</p>
                <button type="button" onClick={() => removeSkill(skill)} className="ml-2 text-black">
                  x
                </button>
              </div>
            ))}
          </div>
        </div>
              {/* Experience */}
              <div className="mb-4 mt-5">
          <label className="block text-black mb-2 text-[16px] font-semibold ">Experience:</label>
         {/* exiting exp */}
          <div className="mt-2">
            {experience.map((exp, index) => (
              <div key={index} className="flex justify-between gap-4 items-center border border-black px-4 py-2 rounded-md mb-2">
                <div className="my-1 w-[80%]">
                  <p className="text-[16px] capitalize font-bold">{exp?.company} - <span className="text-[14px] font-semibold">{exp?.location}</span></p>
                  <p className="font-medium capitalize text-[16px]">{exp?.position}</p>
                  <p className="pt-1 text-[13px]">{exp.joinDate} - {exp.current ? "Present" : exp.endDate}</p>
                  <p className="py-2 text-[14px] ">{exp.description ??""}</p>
                </div>
                <button type="button" onClick={() => removeExperience(index)} className="text-white  py-2 px-6 rounded-[30px] bg-[#DD0000] hover:bg-red-600">
                  Remove
                </button>
              </div>
            ))}
          </div>
         
          <div className="flex flex-col pt-5">
            <div className="grid grid-cols-2 gap-5">
 {/* Company */}
 <div>
 <label className="block text-black mb-2 text-[16px] font-semibold">Company Name</label>
 <input
              type="text"
              value={currentExperience.company}
              onChange={(e) => setCurrentExperience({ ...currentExperience, company: e.target.value })}
              className="w-full py-2 px-4  rounded-md text-black border border-black focus:outline-none"
              placeholder="Company Name"
            />
            </div>
            <div>
            {/* Location */}
            <label className="block text-black mb-2 text-[16px] font-semibold">Location</label>
            <input
              type="text"
              value={currentExperience.location}
              onChange={(e) => setCurrentExperience({ ...currentExperience, location: e.target.value })}
              className="w-full py-2 px-4  rounded-md text-black border border-black focus:outline-none"
              placeholder="Location"
            />
            </div>
            </div>
           
            {/* Position */}
            <label className="block mt-5 text-black mb-2 text-[16px] font-semibold">Position</label>
            <input
              type="text"
              value={currentExperience.position}
              onChange={(e) => setCurrentExperience({ ...currentExperience, position: e.target.value })}
              className="w-full py-2 px-4  rounded-md text-black border border-black focus:outline-none"
              placeholder="Position"
            />
              <label className="block mt-5 text-black mb-2 text-[16px] font-semibold">Main Tasks</label>
             <textarea
              
              value={currentExperience.description}
              onChange={(e) => setCurrentExperience({ ...currentExperience, description: e.target.value })}
              className="w-full py-2 px-4  rounded-md text-black border border-black focus:outline-none"
              placeholder="Main Tasks"
            />
            <div className="grid grid-cols-2 gap-4 pt-5">
              {/* Join Date */}
              <div className="w-full flex flex-col">
            <label htmlFor="" className="block text-black mb-2 text-[16px] font-semibold">Join date</label>
            <input
              type="date"
              value={currentExperience.joinDate}
              onChange={(e) => setCurrentExperience({ ...currentExperience, joinDate: e.target.value })}
              className="w-full py-2 px-4  rounded-md text-black border border-black focus:outline-none"
            />
            </div>
             {/* End Date (optional if current job) */}
             <div className="w-full flex flex-col">
             <label htmlFor="" className="block text-black mb-2 text-[16px] font-semibold">End date</label>
            {!currentExperience.current && (
              <input
                type="date"
                value={currentExperience.endDate}
                onChange={(e) => setCurrentExperience({ ...currentExperience, endDate: e.target.value })}
                className="w-full py-2 px-4  rounded-md text-black border border-black focus:outline-none"
              />
            )}
              </div>
            </div>
            <div className="flex justify-between items-center mt-4">
 {/* Current Job */}
 <div className="flex items-center mb-2">
              <input
                type="checkbox"
                checked={currentExperience.current}
                onChange={(e) => setCurrentExperience({ ...currentExperience, current: e.target.checked })}
              />
              <label className="ml-2 text-[16px] font-semibold">Current Job</label>
            </div>
            
            
           
           
            <button type="button" onClick={addExperience} className="bg-black my-2 text-white font-semibold py-2 px-8 rounded">
              Add Experience
            </button>
            </div>
          </div>
         
        </div>


  

        <button type="submit" className="bg-blue-500 mb-11 hover:bg-blue-600 text-white w-1/2 mx-auto font-bold py-2 px-4 rounded">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default JobSeekerProfileForm;
