"use client";
import React, { useState } from "react";
import Link from "next/link";

const SignupDropdown: React.FC = () => {
  return (
    <div className="relative group">
      {/* Sign Up Button */}
      <button className="text-white ms-1 text-[17px]">
        Sign Up
      </button>

      {/* Dropdown (Hidden by default, shown on hover) */}
      <div className="absolute left-0  w-[100px] bg-white  shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
        <Link href="/signup/freelancer">
          <p className="block px-4 py-2 text-[14px] text-primary hover:text-blue-900 cursor-pointer">
            Freelancer
          </p>
        </Link>
        <Link href="/signup/company">
          <p className="block px-4 py-2 text-[13px] text-primary hover:text-blue-900  cursor-pointer">
            Company
          </p>
        </Link>
      </div>
    </div>
  );
};

export default SignupDropdown;
