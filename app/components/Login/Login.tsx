"use client";
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useUser } from '@/app/lib/UserContext';
import GoogleLogin from './GoogleLogin';
import ReCAPTCHA from "react-google-recaptcha";
import LinkedInLogin from './Linkedinogin';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [recaptchaVerified, setRecaptchaVerified] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const router = useRouter();
  const { loadUserFromToken } = useUser();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Send POST
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/users/login`, {
        email,
        password,
      });

      const { token } = response.data;

      localStorage.setItem('token', token);
      loadUserFromToken();

      // Redirect to dashboard 
      router.push('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      setError('Invalid email or password');
    }
  };

  const handleRecaptchaChange = (token: string | null) => {
    if (token) {
      setRecaptchaVerified(true); 
    } else {
      setRecaptchaVerified(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <ReCAPTCHA
            sitekey='6LdnG6wqAAAAAHk1XeHAC6dY9pTI6uyzPo_3X8Zb'
            onChange={handleRecaptchaChange}
          />
          <button
            type="submit"
            disabled={!recaptchaVerified} 
            className={`w-full py-2 mt-4 px-4 rounded-md transition duration-300 ${
              recaptchaVerified
                ? 'bg-blue-500 text-white hover:bg-blue-600'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Login
          </button>
        </form>
        <GoogleLogin />
        <LinkedInLogin/>
      </div>
    </div>
  );
};

export default Login;
