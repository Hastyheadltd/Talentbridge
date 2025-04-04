"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { useUser } from "@/app/lib/UserContext";
import { FaLinkedinIn } from "react-icons/fa";

export default function LinkedInLogin() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { loadUserFromToken } = useUser();

    // LinkedIn OAuth configuration
    const LINKEDIN_CLIENT_ID = process.env.LINKEDIN_CLIENT_ID;
    const LINKEDIN_REDIRECT_URI = 'https://talent-bridge1.vercel.app/linkedin/callback';
    const SCOPE = encodeURIComponent('openid profile email');
    const STATE = Math.random().toString(36).substring(2);

    // Handle LinkedIn login
    const handleLinkedInLogin = () => {
        setLoading(true);
        const linkedinAuthUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${LINKEDIN_CLIENT_ID}&redirect_uri=${LINKEDIN_REDIRECT_URI}&scope=${SCOPE}&state=${STATE}`;
        
        // Open popup window for LinkedIn OAuth
        const popup = window.open(
            linkedinAuthUrl,
            '_blank',
            'width=600,height=600'
        );
        console.log(popup);
    };

    // Handle message from callback page
    useEffect(() => {
        const handleMessage = async (event:MessageEvent) => {
            if (event.origin !== window.location.origin) return;

            const { code, error, error_description } = event.data;
            if (error) {
                setLoading(false);
                Swal.fire({
                    title: 'Error!',
                    text: error_description || 'Failed to authenticate with LinkedIn',
                    background: '#000',  
              color: '#fff',  
          showConfirmButton: false,
          timer: 1000
                });
                return;
            }

            if (code) {
                try {
                    // Exchange authorization code for access token
                    const response = await axios.post(
                        `${process.env.NEXT_PUBLIC_BASE_URL}/users/linkedin-login`,
                        { code }
                    );

                    if (response.data.success) {
                        localStorage.setItem('token', response.data.token);
                        loadUserFromToken();

                        Swal.fire({
                            title: 'Success!',
                            text: 'Login successful!',
                            background: '#000',  
              color: '#fff',  
          showConfirmButton: false,
          timer: 1000
                        });

                        router.push('/dashboard');
                    }
                } catch (error) {
                  console.error("LinkedIn signup error:", error);
                  Swal.fire({
                      title: 'Error!',
                      text: axios.isAxiosError(error) && error.response?.data?.message
                          ? error.response.data.message
                          : 'Failed to sign up with LinkedIn',
                          background: '#000',  
                          color: '#fff',  
                      showConfirmButton: false,
                      timer: 1000
                  });
                } finally {
                    setLoading(false);
                }
            }
        };

        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, [loadUserFromToken, router]);

    return (
        <div>
            <button
                onClick={handleLinkedInLogin}
                className='flex gap-3 justify-center items-center bg-white w-full rounded-full px-11 py-3'
                disabled={loading}
            >
                <FaLinkedinIn size={20} className="text-primary"/>
                <h1 className='text-[#121420] lg:text-[16px] text-[14px]  lg:leading-[28px] leading-[24px]'>
                    {loading ? "Logging In..." : "Log In with LinkedIn"}
                </h1>
            </button>
        </div>
    );
}