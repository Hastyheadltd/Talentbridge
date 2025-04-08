"use client";
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useUser } from '@/app/lib/UserContext';
import GoogleLogin from './GoogleLogin';
import ReCAPTCHA from "react-google-recaptcha";
import LinkedInLogin from './Linkedinogin';
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FaRegEyeSlash, FaSpinner } from "react-icons/fa"; 
import SignupDropdown from './SignupDropdown';
import Image from 'next/image';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [recaptchaVerified, setRecaptchaVerified] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false); 
  const router = useRouter();
  const { loadUserFromToken } = useUser();
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Send POST
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/users/login`, {
        email,
        password,
      });

      const { token } = response.data;
      localStorage.setItem('token', token);
      loadUserFromToken();
      router.push('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      setError('Invalid email or password');
    } finally {
      setLoading(false); 
    }
  };

  const handleRecaptchaChange = (token: string | null) => {
    setRecaptchaVerified(!!token);
  };

  return (
    <div className="flex flex-col justify-center py-12 items-center min-h-screen bg-primary">
      <div className="w-full max-w-[1280px] text-gray-800 flex flex-col md:flex-row items-center justify-center md:justify-between">
        {/* Left Section (Form) */}
        <div className="w-[551px] text-white">
          <h2 className="text-[50px] font-bold mb-6 text-center">Log In</h2>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          
          <form onSubmit={handleLogin}>
            {/* Email Field */}
            <div className="mb-4">
              <input
                type="email"
                id="email"
                className="w-full px-4 py-3 text-black text-[15px] placeholder:text-black border rounded-[10px] focus:outline-none bg-[#F2F2F2]"
                placeholder="E-Mail Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password Field */}
            <div className="mb-4">
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className="w-full px-4 py-3 text-black text-[15px] placeholder:text-black border rounded-[10px] focus:outline-none bg-[#F2F2F2]"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-900"
                >
                  {showPassword ? <MdOutlineRemoveRedEye size={18} /> : <FaRegEyeSlash size={18} />}
                </button>
              </div>
            </div>

            {/* reCAPTCHA */}
            <div className="mb-4 flex">
              <ReCAPTCHA
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
                onChange={handleRecaptchaChange}
                className="rounded-[14px] w-[150px]"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!recaptchaVerified || loading}
              className={`w-full py-3 mt-4 rounded-full transition duration-300 ${
                recaptchaVerified && !loading
                  ? "bg-black text-white hover:shadow-lg"
                  : "bg-gray-700 text-white cursor-not-allowed"
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <FaSpinner className="animate-spin mr-2" /> Logging in...
                </span>
              ) : (
                "Login"
              )}
            </button>
          </form>

          <div className="mt-6 text-[18px] text-center flex justify-center">
            <p>Don&#39;t have an account?</p>
            <SignupDropdown />
          </div>
          <div className="divider text-white py-4 text-[18px]">OR</div>

          {/* Social Logins */}
          <div className="flex w-full items-center justify-between gap-4 mt-6">
            <LinkedInLogin />
            <GoogleLogin />
          </div>
        </div>

        {/* Right Section (Image) */}
        <div className="mt-8 md:mt-0 md:ml-8">
          <Image
            src="/images/login.png"
            alt="login img"
            width={616}
            height={598}
            className="rounded-[16px] object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
