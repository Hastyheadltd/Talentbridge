"use client";
import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from 'next/link';
import { auth } from "@/firebase.config";
import Swal from "sweetalert2";
import { useUser } from "@/app/lib/UserContext";
import GoogleSignup from "./GoogleSignup";
import ReCAPTCHA from "react-google-recaptcha";

export default function SignUp() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [recaptchaVerified, setRecaptchaVerified] = useState(false);
    const router = useRouter();
    const { loadUserFromToken } = useUser();

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await updateProfile(user, { displayName: username });

            const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/users`, {
                uid: user.uid,
                username: user.displayName,
                email: user.email,
                password,
                role: "company",
                photoURL: user?.photoURL,
                approve: "pending",
            });

            if (response.data.success) {
                // Store token in localStorage
                localStorage.setItem('token', response.data.token);
                loadUserFromToken();

                Swal.fire({
                    title: 'Success!',
                    text: 'Account created successfully!',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1000,
                });

                // Redirect to profile for setup account
                router.push('/dashboard/profile');
            } else {
                throw new Error("Failed to create account.");
            }
        } catch (error) {
            console.error("Error signing up:", error);
            Swal.fire({
                title: 'Error!',
                text: 'Failed to create an account!',
                icon: 'error',
                showConfirmButton: false,
                timer: 1000,
            });
        } finally {
            setLoading(false);
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
        <div className='max-w-[1244px] mx-auto mt-[30px] flex flex-col relative z-20'>
            <form onSubmit={handleSignup} className="pb-3 mx-auto flex flex-col  ">
                <h1 className='py-3 text-[20px] font-semibold text-primary text-center'>Sign Up As Hiring Company</h1>
                <div className="justify-start flex flex-col mb-1">
                    <label htmlFor="exampleInputName" className="lg:text-[16px] text-[14px] lg:leading-[26px] leading-[24px] text-[#121420] text-left font-medium">Full Name</label>
                    <input
                        type="text"
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="input rounded-[5px] text-[#121420] mt-2 border-[#121420] lg:h-[56px] h-[46px] lg:w-[448px] w-[343px]" id="exampleInputName" placeholder="Your Name"></input>
                </div>
                <div className="flex justify-start flex-col mb-1">
                    <label htmlFor="exampleInputEmail" className="lg:text-[16px] text-[14px] lg:leading-[26px] leading-[24px] text-[#121420] text-left mt-3 font-medium">Email</label>
                    <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="input rounded-[5px] text-[#121420] mt-2 border-[#121420] lg:h-[56px] h-[46px] lg:w-[448px] w-[343px]" id="exampleInputEmail" placeholder="name@example.com"></input>
                </div>
                <div className="flex justify-start flex-col mb-1">
                    <label htmlFor="exampleInputPassword" className="lg:text-[16px] text-[14px] lg:leading-[26px] leading-[24px] mt-3 text-left text-[#121420] font-medium">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="input rounded-[5px] text-[#121420] mt-2 border-[#121420] lg:h-[56px] h-[46px] lg:w-[448px] w-[343px]" id="exampleInputPassword" placeholder="Password"></input>
                </div>
                <ReCAPTCHA
                    sitekey="6LdnG6wqAAAAAHk1XeHAC6dY9pTI6uyzPo_3X8Zb"
                    onChange={handleRecaptchaChange}
                    className="my-4"
                />
                <div className="mt-7">
                    <button
                        type="submit"
                        disabled={!recaptchaVerified || loading}
                        className={`bg-primary text-white text-[14px] lg:text-[16px] lg:py-[15px] py-[10px] w-[440px] rounded hover:bg-blue-700 mx-auto h-[43px] lg:h-[56px] ${!recaptchaVerified ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        {loading ? "Creating Account..." : "Sign Up"}
                    </button>
                </div>
            </form>
            <div className="divider text-[#121420] lg:text-[16px] text-[12px] w-[430px] mx-auto font-medium leading-[28px] py-3">or</div>
            <GoogleSignup />
            
            <p className='text-[#121420] text-[16px] font-medium leading-[26px] text-center mt-5 mb-8 '>
                Already have an account? <Link className='hover:underline' href='/login'>Log in</Link>
            </p>
        </div>
    );
}
