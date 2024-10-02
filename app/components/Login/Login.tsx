"use client";
import { useState } from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import axios from "axios";
import { useRouter } from "next/navigation"; 
import { auth } from "@/firebase.config";
import Google from "../icons/Google";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const provider = new GoogleAuthProvider();

const handleLogin = async () => {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/users/login`, {
      email,
      password,
    });

    if (response.data.success) {
      // Store the JWT token 
      localStorage.setItem('token', response.data.token); 
      
      alert('Login successful!');
      router.push('/dashboard');
    } else {
      alert('Login failed: ' + response.data.message);
    }
  } catch (error) {
    console.error('Login error:', error);
  }
};

  // Function to handle Google login
  const handleGoogleLogin = async () => {
    setLoading(true);

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Verify user details with your backend
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/users/login`, {
        uid: user.uid,
        email: user.email,
        username: user.displayName,
        photoURL: user.photoURL,
      });

      if (response.data.success) {
     
        localStorage.setItem('token', response.data.token); 
        

        alert('Login successful!');
        router.push('/dashboard');
      }  else {
        alert("Google login failed. Please try again.");
      }
    }  finally {
      setLoading(false);
    }
  };

  return (
    <div className=" flex  justify-center p-7">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className={`w-full p-3 mt-5 rounded bg-blue-600 text-white font-semibold ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="mt-6 flex items-center justify-center">
          <button
            onClick={handleGoogleLogin}
            className="hover:bg-gray-50 mt-4 mb-5 lg:h-[56px] h-[46px] mx-auto  w-[430px] rounded-[5px] flex gap-4  justify-center items-center border-black border"
            disabled={loading}
          >
           <Google/>
           <h1 className='text-[#121420] lg:text-[16px] text-[14px] font-medium lg:leading-[28px] leading-[24px]'> {loading ? "Login..." : "Login with Google"}</h1>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
