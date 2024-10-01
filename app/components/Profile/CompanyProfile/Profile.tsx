"use client";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useUser } from "@/app/lib/UserContext"; 
import { storage } from "@/firebase.config"; 
import { CompanyProfileFormData } from "../../type/Profile"; 

const CompanyProfileForm: React.FC = () => {
  const { user } = useUser(); 
  const { register, handleSubmit, setValue } = useForm<CompanyProfileFormData>();
  const [logo, setLogo] = useState<File | null>(null);
  const [existingLogoURL, setExistingLogoURL] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/users/${user?._id}`); // Fetch the user data
        const data = response.data;

        if (data.role === 'company') {
          setValue("about", data.about || "");
          setValue("mission", data.mission || "");
          setValue("vision", data.vision || "");
          setValue("location", data.location || "");
          setValue("website", data.website || "");

          setExistingLogoURL(data.logoURL || null);
        }
      } catch (error) {
        console.error("Error fetching company data:", error);
      }
    };

    if (user?._id) {
      fetchCompanyData();
    }
  }, [setValue, user?._id]);

  const uploadLogoToFirebase = async (file: File): Promise<string | null> => {
    const storageRef = ref(storage, `company_logos/${file.name}`);
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

  const onSubmit = async (data: CompanyProfileFormData) => {
    let uploadedLogoURL = existingLogoURL;

    if (logo) {
      uploadedLogoURL = await uploadLogoToFirebase(logo);
    }

    const updatedCompanyData = {
      ...data,
      logoURL: uploadedLogoURL,
    };

    try {
      const response = await axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}/users/${user?._id}`, updatedCompanyData);

      Swal.fire({
        title: 'Success!',
        text: 'Company profile updated successfully!',
        icon: 'success',
        showConfirmButton: false,
        timer: 1000
      });

      router.push('/dashboard');
    } catch (error) {
      console.error("Error updating company profile:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Company Profile</h1>
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        {/* About */}
        <div className="mb-4">
          <label className="block text-gray-900 font-semibold mb-2">About the Company:</label>
          <textarea
            {...register("about")}
            className="w-full p-2 rounded-md bg-gray-100 text-gray-900"
            required
            placeholder="Describe your company"
          />
        </div>

        {/* Mission */}
        <div className="mb-4">
          <label className="block text-gray-900 font-semibold mb-2">Mission:</label>
          <textarea
            {...register("mission")}
            className="w-full p-2 rounded-md bg-gray-100 text-gray-900"
            required
            placeholder="Company's mission"
          />
        </div>

        {/* Vision */}
        <div className="mb-4">
          <label className="block text-gray-900 font-semibold mb-2">Vision:</label>
          <textarea
            {...register("vision")}
            className="w-full p-2 rounded-md bg-gray-100 text-gray-900"
            required
            placeholder="Company's vision"
          />
        </div>

        {/* Location */}
        <div className="mb-4">
          <label className="block text-gray-900 font-semibold mb-2">Location:</label>
          <input
            type="text"
            {...register("location")}
            className="w-full p-2 rounded-md bg-gray-100 text-gray-900"
            required
            placeholder="Company location"
          />
        </div>

        {/* Website */}
        <div className="mb-4">
          <label className="block text-gray-900 font-semibold mb-2">Website:</label>
          <input
            type="url"
            {...register("website")}
            className="w-full p-2 rounded-md bg-gray-100 text-gray-900"
            required
            placeholder="Company website URL"
          />
        </div>

        {/* Company Logo */}
        {existingLogoURL && (
          <div className="mt-2">
            <img src={existingLogoURL} alt="Company Logo" className="w-32 h-32 object-cover rounded-full" />
          </div>
        )}
        <div className="mb-4">
          <label className="block text-gray-900 font-semibold mb-2">Company Logo:</label>
          <input
            type="file"
            accept="image/*"
            className="block w-full text-sm text-gray-900"
            onChange={(e) => setLogo(e.target.files ? e.target.files[0] : null)}
          />
        </div>

        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white w-full font-bold py-2 px-4 rounded">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default CompanyProfileForm;
