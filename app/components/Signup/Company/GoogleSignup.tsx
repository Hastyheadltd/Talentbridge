"use client";
import { useState } from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import axios from "axios";
import { useRouter } from "next/navigation";
import Google from '../../icons/Google'
import { auth } from "@/firebase.config";
import Swal from "sweetalert2";

export default function GoogleSignup() {
    const [loading, setLoading] = useState(false);
    const provider = new GoogleAuthProvider();
    const router= useRouter();
    //handle google login
    const handleGoogleSignup = async () => {
        setLoading(true);
    
        try {
          const result = await signInWithPopup(auth, provider);
          const user = result.user;
    
          const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/users`, {
            uid: user.uid,
            username: user.displayName,
            email: user.email,
            role: "company",
            photoURL: user.photoURL,
          });
          if (response.data.success) {
            // Store token in localStorage
            localStorage.setItem('token', response.data.token);
    
            Swal.fire({
              title: 'Success!',
              text: 'Account created successfully!',
              icon: 'success',
              showConfirmButton: false,
              timer: 1000
            });
    
            // Redirect to profile for setup account
            router.push('/dashboard/profile');
          } else {
            throw new Error("Failed to create account.");
          }
        } catch (error) {
          console.error("Error with Google sign-up:", error);
          alert("Failed to sign up with Google!");
        } finally {
          setLoading(false);
        }
      };
  
  return (
    <div>
        <button   onClick={handleGoogleSignup}
          className=' hover:bg-gray-50 mt-4 mb-5 lg:h-[56px] h-[46px] mx-auto  w-[430px] rounded-[5px] flex gap-4  justify-center items-center border-black border'
          disabled={loading}
          >
        <Google/>
        <h1 className='text-[#121420] lg:text-[16px] text-[14px] font-medium lg:leading-[28px] leading-[24px]'> {loading ? "Signing Up..." : "Sign Up with Google"}</h1>
      </button>
    </div>
  )
}
