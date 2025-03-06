"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useUser } from "@/app/lib/UserContext";
import { storage } from "@/firebase.config";
import { CompanyProfileFormData } from "../../type/Profile";

const CompanyProfileForm: React.FC = () => {
  const { user } = useUser();
  const { register, handleSubmit, setValue, watch } =
    useForm<CompanyProfileFormData>();
  const [logo, setLogo] = useState<File | null>(null);
  const [existingLogoURL, setExistingLogoURL] = useState<string | null>(null);
  const router = useRouter();
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/users/${user?._id}`
        );
        const Userdata = response.data;
        const data = Userdata?.user;

        if (data.role === "company") {
          setValue("companyName", data.companyName || "");
          setValue("about", data.about || "");
          setValue("mission", data.mission || "");
          setValue("vision", data.vision || "");
          setValue("location", data.location || "");
          setValue("website", data.website || "");
          setValue("employers", data.employers || "");
          setValue("industry", data.industry || "");
          setValue("founded", data.founded || "");
          setValue("linkedin", data.linkedin || "");
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
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/users/${user?._id}`,
        updatedCompanyData
      );
      console.log(response);

      Swal.fire({
        title: "Success!",
        text: "Company profile updated successfully!",
        icon: "success",
        showConfirmButton: false,
        timer: 1000,
      });

      router.push("/dashboard");
    } catch (error) {
      console.error("Error updating company profile:", error);
    }
  };

  return (
    <div className="m-5 border border-primary rounded-[24px] p-8">
      
      <label className="block text-gray-900 font-semibold text-[16px] mb-2">
        Company Logo:
      </label>
      <div className="flex items-center gap-5">
        {existingLogoURL && (
          <div className="mt-2">
            <img
              src={existingLogoURL}
              alt="Company Logo"
              className="w-20 h-20 object-cover rounded-full"
            />
          </div>
        )}

      
        <div>
          <label className="inline-block px-4 py-2 border border-primary text-primary  text-sm rounded-md cursor-pointer hover:bg-gray-100">
            Upload new picture
            <input
              type="file"
              accept="image/*"
              className="hidden"
              required
              onChange={(e) =>
                setLogo(e.target.files ? e.target.files[0] : null)
              }
            />
          </label>

        
          <div className="mt-1 text-sm text-gray-500">
            {logo ? logo.name : "No file selected"}
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-5">
        <div className="flex justify-between items-center gap-5">
          <div className="mb-4 w-full">
            <label className="block text-gray-900 font-semibold text-[16px] mb-2">
              Company Name:
            </label>
            <input
              type="text"
              {...register("companyName")}
              className="w-full p-2 rounded-md border border-[#E8EDEF] text-[16px] text-gray-900"
              required
              placeholder="Company name"
            />
          </div>
          <div className="mb-4 w-full">
            <label className="block text-gray-900 font-semibold text-[16px] mb-2">
              Location:
            </label>
            <input
              type="text"
              {...register("location")}
              className="w-full p-2 rounded-md text-[16px] border border-[#E8EDEF] text-gray-900"
              required
              placeholder="Company location"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-900 font-semibold text-[16px] mb-2">
            About the Company:
          </label>
          <textarea
            {...register("about")}
            className="w-full p-2 h-[100px] rounded-md text-[16px] border border-[#E8EDEF] text-gray-900"
            required
            placeholder="Describe your company"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-900 font-semibold text-[16px] mb-2">
            Mission:
          </label>
          <textarea
            {...register("mission")}
            className="w-full p-2 h-[100px] rounded-md text-[16px] border border-[#E8EDEF] text-gray-900"
            required
            placeholder="Company's mission"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-900 font-semibold text-[16px] mb-2">
            Vision:
          </label>
          <textarea
            {...register("vision")}
            className="w-full p-2 h-[100px] rounded-md text-[16px] border border-[#E8EDEF] text-gray-900"
            required
            placeholder="Company's vision"
          />
        </div>

        <div className="flex justify-between items-center gap-5">
          <div className="mb-4 w-full">
            <label className="block text-gray-900 font-semibold text-[16px] mb-2">
              Employers:
            </label>
            <input
              type="number"
              {...register("employers")}
              className="w-full p-2 rounded-md text-[16px] border border-[#E8EDEF] text-gray-900"
              required
              placeholder="Number of employees"
            />
          </div>
          <div className="mb-4 w-full">
            <label className="block text-gray-900 font-semibold text-[16px] mb-2">
              Industry:
            </label>
            <input
              type="text"
              {...register("industry")}
              className="w-full p-2 rounded-md text-[16px] border border-[#E8EDEF] text-gray-900"
              required
              placeholder="E.g., IT"
            />
          </div>
        </div>

        <div className="mb-4 w-full">
          <label className="block text-gray-900 font-semibold text-[16px] mb-2">
            Founded:
          </label>
          <input
            type="text"
            {...register("founded")}
            className="w-full p-2 rounded-md text-[16px] border border-[#E8EDEF] text-gray-900"
            required
            placeholder="Founded Year"
          />
        </div>

        <div className="flex justify-between items-center gap-5">
          <div className="mb-4 w-full">
            <label className="block text-gray-900 font-semibold text-[16px] mb-2">
              Website:
            </label>
            <input
              type="url"
              {...register("website")}
              className="w-full p-2 rounded-md text-[16px] border border-[#E8EDEF] text-gray-900"
              required
              placeholder="Company website URL"
            />
          </div>
          <div className="mb-4 w-full">
            <label className="block text-gray-900 font-semibold text-[16px] mb-2">
              LinkedIn Profile:
            </label>
            <input
              type="url"
              {...register("linkedin")}
              className="w-full p-2 rounded-md text-[16px] border border-[#E8EDEF] text-gray-900"
              required
              placeholder="LinkedIn profile URL"
            />
          </div>
        </div>

        <button
  type="submit"
  className={`bg-[#0C34E4] mt-6 w-1/3 mx-auto font-bold py-3 px-4 rounded text-white ${
    uploading
      ? "cursor-not-allowed bg-gray-400"
      : "hover:bg-blue-600"
  }`}
  disabled={uploading}
>
  {uploading ? "Creating..." : "Create Profile"}
</button>

      </form>
    </div>
  );
};

export default CompanyProfileForm;
