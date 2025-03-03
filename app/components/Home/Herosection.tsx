"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import dynamic from "next/dynamic";
import Image from "next/image";

export default function HeroSection() {
  return (
    <div className="bg-[#D2E8FD]">
    

      {/* Hero Content */}
      <div className=" max-w-[1244px] mx-auto flex flex-col md:flex-row items-center justify-between pt-20 pb-11 gap-6  overflow-hidden">
        {/* Text Section */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex flex-col items-start  lg:w-[640px]"
        >
          <h1 className="text-[68px] leading-[75px] font-bold text-black">
          Talent On Demand <span className="text-primary"> Hire The Best  Without The Hassle</span>
          </h1>
          <p className="text-[22px] mt-4 text-black lg:w-[603px]">
          Join hundreds of companies finding the right talents.
FlixRecruit connects You with professionals quickly and efficiently
          </p>
          <div className="flex mt-5 gap-6">
            <Link href="/jobs">
              <button className="bg-primary border border-primary rounded-[60px] text-white  text-[18px] py-2 px-8  transition-all">
                Get Started
              </button>
            </Link>
            <Link href="/about">
            <button className="border border-primary rounded-[60px] text-primary  text-[18px] py-2 px-8 transition-all">
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
          className="w-[613px] h-[635px]"
        >
       
           
            <Image src="/images/heroimg.png" layout="fill" alt="hero img"/>
           
       
        </motion.div>
      </div>
    </div>
  );
}
