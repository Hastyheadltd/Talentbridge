"use client";
import { useState } from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import axios from "axios";
import { useRouter } from "next/navigation";

import { auth } from "@/firebase.config";
import Swal from "sweetalert2";
import Google from "../icons/Google";
import { useUser } from "@/app/lib/UserContext";

export default function GoogleLogin() {
  const [loading, setLoading] = useState(false);
  const provider = new GoogleAuthProvider();
  const router = useRouter();
  const { loadUserFromToken } = useUser();

  // Handle Google login
  const handleGoogleLogin = async () => {
    setLoading(true);

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

   
      console.log('Email being sent to server:', user.email);


      const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/users/google-login`, {
        email: user.email
      });

      if (response.data.exists) {
   
        localStorage.setItem('token', response.data.token);
        loadUserFromToken(); 

        Swal.fire({
          title: 'Success!',
          text: 'Logged in successfully!',
          icon: 'success',
          showConfirmButton: false,
          timer: 1000
        });

        // Redirect to dashboard
        router.push('/dashboard');
      } else {
  
        Swal.fire({
          title: 'Error!',
          text: 'User does not exist. Please sign up first.',
          icon: 'error',
          showConfirmButton: true
        });
      }
    } catch (error) {
      console.error("Error with Google login:", error);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to log in with Google!',
        icon: 'error',
        showConfirmButton: true
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleGoogleLogin}
        className='hover:bg-gray-50 mt-4 mb-5 lg:h-[56px] h-[46px] mx-auto w-[90%] rounded-[5px] flex gap-4 justify-center items-center border-black border'
        disabled={loading}
      >
        <Google />
        <h1 className='text-[#121420] lg:text-[16px] text-[14px] font-medium lg:leading-[28px] leading-[24px]'>
          {loading ? "Logging In..." : "Log In with Google"}
        </h1>
      </button>
    </div>
  );
}
