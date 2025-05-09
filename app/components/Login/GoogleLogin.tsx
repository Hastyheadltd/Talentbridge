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
          background: '#000',  
              color: '#fff',  
          showConfirmButton: false,
          timer: 1000
        });

        // Redirect to dashboard
        router.push('/dashboard');
      } else {
  
        Swal.fire({
          title: 'Error!',
          text: 'User does not exist. Please sign up first.',
          background: '#000',  
              color: '#fff',  
          showConfirmButton: false,
          timer: 1000
        });
      }
    } catch (error) {
      console.error("Error with Google login:", error);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to log in with Google!',
        background: '#000',  
        color: '#fff',  
    showConfirmButton: false,
    timer: 1000
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleGoogleLogin}
        className=' flex gap-3 justify-center items-center bg-white w-full rounded-full px-9 py-3'
        disabled={loading}
      >
        <Google />
        <h1 className='text-black lg:text-[16px] text-[14px] lg:leading-[28px] leading-[24px]'>
          {loading ? "Logging In..." : "Log In with Google"}
        </h1>
      </button>
    </div>
  );
}
