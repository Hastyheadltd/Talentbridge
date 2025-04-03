"use client";
import Link from "next/link";
import {  FaLinkedinIn } from "react-icons/fa";

import Email from "../icons/Email";
import Location from "../icons/Location";
import Image from "next/image";
import axios from 'axios';
import { useState } from 'react';
import Swal from 'sweetalert2';

export default function Footer() {

  const [email, setEmail] = useState("");

  const handleSubscribe = async () => {
    if (!email) {
      Swal.fire({
      
        title: 'Please enter an email address.',
      
        background: '#000', 
        color: '#fff',   
        showConfirmButton:false,
        timer: 1500
      });
      return;
    }
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/subscribe`,
        { email }
      );
  

      Swal.fire({
       
        title: 'Subscription Successful!',
        text: response.data.message || 'You have subscribed successfully.',
        background: '#000',  
        color: '#fff',  
        showConfirmButton:false,
        timer: 1500
      });
  
      setEmail(""); 
    } catch (error) {
      Swal.fire({
       
        text: 'Unable to subscribe at this time.',
        background: '#000',       
        color: '#fff',
        confirmButtonColor: '#3271D2'
      });
    }
  };
  

  return (
    <footer className="bg-primary rounded-t-[12px] text-white ">
      <div className="max-w-[1280px] mx-auto  pt-7">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          
          {/* Left Section - Logo & Socials */}
          <div className=" ">
          <Image src="/logo.png" alt="logo " width={210} height={160} className="rounded-lg"/>
            <div className="mt-4">
              <p className="my-4 text-[30px] font-medium">Follow Us</p>
              <Link href="https://linkedin.com" target="_blank" className="w-11 h-11  rounded-full flex footer-icon-bg  justify-center items-center ">
                <FaLinkedinIn className="text-xl" />
              </Link>
            </div>
          </div>

          {/* Center Section - Contact Info */}
          <div>
            <h3 className="text-[30px] font-medium">Contact Us</h3>
            <Link href="mailto:support@Flix Recruit.com" className=" flex mt-4 items-center gap-3  ">
             <div className="w-[26px] h-[26px]  rounded-full flex footer-icon-bg  justify-center items-center gap-2">
            <Email/>
            </div>
          <p className="text-[18px]">Email: support@Flix Recruit.com</p> 
            </Link>
            
           <div className=" flex mt-8  gap-3 ">
           <div className="w-[26px] h-[26px]  rounded-full flex footer-icon-bg  justify-center items-center gap-2">
            <Location/>
            </div>
          <p className="text-[18px] w-[270px]">A108 Adam Street New York, NY 535022 United States</p> 
           </div>
          </div>

          {/* Right Section - Newsletter */}
          <div>
            <h3 className="text-[30px] font-medium">Newsletter</h3>
            <p className="mt-3 w-[386px] text-[20px]">
            Sign up for the Flix Recruit newsletter and stay up to date! Get exclusive updates and news to your inbox. 🚀
            </p>
            <div className="flex items-center bg-white rounded-full mt-6 px-1 py-1">
              <input
              type="email"
              placeholder="Enter Your Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
                className="flex-1 border-none outline-none px-3 py-3 text-text text-[14px] rounded-full overflow-hidden"
              />
              <button  onClick={handleSubscribe} className="bg-primary  text-[16px] text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700">
                Subscribe
              </button>
            </div>
          </div>
        </div>

       
      </div>
      <div className="bg-[#3271D2] mt-5 py-6 ">
        <div className="flex justify-between items-center max-w-[1280px] mx-auto">
        <h3 className="text-[18px] ">© Copyright Flix Recruit. All Rights Reserved</h3>
        <h3 className="text-[18px]  capitalize">term & conditions / Privacy Policy / Imprint</h3>
        </div>
      </div>
    </footer>
  );
}
