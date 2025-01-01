"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Lottie from "lottie-react";
import Banner from "../../../public/Banner.json";

export default function HeroSection() {
  return (
    <div className="relative bg-gradient-to-b from-[#E3F2FD] to-white overflow-hidden">
      {/* Background Illustration */}
      <div className="absolute inset-0">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ duration: 1.5 }}
          className="absolute top-[-150px] left-[-150px] w-[500px] h-[500px] rounded-full bg-blue-400 blur-3xl"
        ></motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 1.8 }}
          className="absolute bottom-[-200px] right-[-200px] w-[600px] h-[600px] rounded-full bg-blue-200 blur-2xl"
        ></motion.div>
      </div>

      {/* Hero Content */}
      <div className="relative max-w-[1144px] mx-auto flex flex-col md:flex-row items-center justify-between py-20 px-6 gap-16 z-10">
        {/* Text Section */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex flex-col items-start space-y-8 max-w-[600px]"
        >
          <h1 className="text-[40px] font-extrabold text-gray-900 leading-tight">
            Empower Your Future
            <br />
            <span className="text-[#0647AC]">With Career Opportunities</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-700 leading-relaxed">
            Join thousands of professionals discovering new career paths. Let us
            guide you to your next big opportunity.
          </p>
          <div className="flex gap-6">
            <Link href="/jobs">
              <button className="px-8 py-3 text-lg font-semibold rounded-lg bg-gradient-to-r from-[#0647AC] to-[#05388a] text-white hover:shadow-lg hover:scale-105 transition-all">
                Get Started
              </button>
            </Link>
            <Link href="/about">
              <button className="px-8 py-3 text-lg font-semibold rounded-lg bg-white border border-blue-500 text-blue-600 hover:bg-blue-100 hover:shadow-lg hover:scale-105 transition-all">
                Learn More
              </button>
            </Link>
          </div>
        </motion.div>

        {/* Image Section */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative w-full max-w-lg"
        >
          <div className="relative">
           
            
            <Lottie animationData={Banner} loop={true} />
           
          </div>
        </motion.div>
      </div>
    </div>
  );
}
