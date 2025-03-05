"use client";

import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { auth } from "@/firebase.config";
import Swal from "sweetalert2";
import { useUser } from "@/app/lib/UserContext";
import GoogleSignup from "./GoogleSignup";
import LinkedInSignup from "./Linkedin";
import ReCAPTCHA from "react-google-recaptcha";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FaRegEyeSlash } from "react-icons/fa";
import Image from "next/image";

export default function FreelancerSignup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [recaptchaVerified, setRecaptchaVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { loadUserFromToken } = useUser();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      Swal.fire({
        title: "Error!",
        text: "Passwords do not match!",
        icon: "error",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await updateProfile(user, { displayName: name });

      const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/users`, {
        uid: user.uid,
        username: user.displayName,
        email: user.email,
        password,
        role: "freelancer",
        photoURL: user?.photoURL,
        approve: "pending",
      });

      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        await loadUserFromToken();

        Swal.fire({
          title: "Success!",
          text: "Account created successfully!",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });

        router.push("/dashboard/profile");
      } else {
        throw new Error("Failed to create account.");
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Failed to create an account!",
        icon: "error",
        showConfirmButton: false,
        timer: 1500,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-[#0047AB]">
      <div className="w-full max-w-[1280px] text-white flex flex-col md:flex-row items-center justify-between">
        
        {/* Left Section (Form) */}
        <div className="w-full lg:w-[551px] text-white">
          <h2 className="text-[51px] font-bold mb-6 text-center ">
          Sign Up as Freelancer
          </h2>

          <form onSubmit={handleSignup}>
            {/* Name Fields */}
            <div className=" mb-4">
              <input
                type="text"
                className="w-full px-4 py-3 text-black text-[15px] placeholder:text-black border rounded-[10px] focus:outline-none bg-[#F2F2F2]"
                placeholder="Full name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
             
            </div>

            {/* Email Field */}
            <div className="mb-4">
              <input
                type="email"
                className="w-full px-4 py-3 text-black text-[15px] placeholder:text-black border rounded-[10px] focus:outline-none bg-[#F2F2F2]"
                placeholder="E-Mail Address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password Field */}
            <div className="mb-4 relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full px-4 py-3 text-black text-[15px] placeholder:text-black border rounded-[10px] focus:outline-none bg-[#F2F2F2]"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setShowPassword(!showPassword);
                }}
                className="absolute inset-y-0 right-4 flex items-center text-gray-700"
              >
                {showPassword ? <MdOutlineRemoveRedEye size={20} /> : <FaRegEyeSlash size={20} />}
              </button>
            </div>

            {/* Confirm Password Field */}
            <div className="mb-4 relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                className="w-full px-4 py-3 text-black text-[15px] placeholder:text-black border rounded-[10px] focus:outline-none bg-[#F2F2F2]"
                placeholder="Confirm Password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setShowConfirmPassword(!showConfirmPassword);
                }}
                className="absolute inset-y-0 right-4 flex items-center text-gray-700"
              >
                {showConfirmPassword ? <MdOutlineRemoveRedEye size={20} /> : <FaRegEyeSlash size={20} />}
              </button>
            </div>

            {/* reCAPTCHA */}
            <div className="mb-4 ">
              <ReCAPTCHA
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
                onChange={(token) => setRecaptchaVerified(!!token)}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!recaptchaVerified || loading}
              className={`w-full py-3 mt-4 rounded-full transition duration-300 ${
                recaptchaVerified
                  ? "bg-black text-white hover:shadow-lg"
                  : "bg-gray-700 text-white cursor-not-allowed"
              }`}
            >
              {loading ? "Creating Account..." : "Signup"}
            </button>
          </form>

          {/* Already have an account */}
          <p className="mt-6 text-[18px] text-center text-white">
            Already have an account? <Link href="/login" >Log In</Link>
          </p>

          {/* Social Logins */}
          <div className="divider text-white py-4 text-[18px] text-center">OR</div>
          <div className="flex justify-center gap-4">
         
            <LinkedInSignup />
            <GoogleSignup />
          </div>
        </div>
          <div className="mt-8 md:mt-0 md:ml-8">
               <Image src="/images/signup.png" alt="login img" width={616} height={598} className='rounded-[16px] object-cover'/>
              </div>
      </div>
    </div>
  );
}
