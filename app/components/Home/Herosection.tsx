"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function HeroSection() {
  return (
    <div className="bg-[#D2E8FD]">
    

      {/* Hero Content */}
      <div className=" max-w-[1280px] mx-auto flex flex-col lg:flex-row items-center justify-between pt-[170px] pb-16 gap-5  overflow-hidden">
        {/* Text Section */}
        <div
          
          className="flex flex-col items-start  lg:w-[650px]"
        >
          <h1 className="text-[68px] leading-[75px] font-semibold text-black">
          Talent On Demand <span className="text-primary"> Hire The Best  Without The Hassle</span>
          </h1>
          <p className="text-[22px] mt-5 text-black lg:w-[603px]">
          Join hundreds of companies finding the right talents.
Flix Recruit connects You with professionals quickly and efficiently
          </p>
          <div className="flex mt-7 gap-6">
            <Link href="/login">
              <button className="bg-primary border border-primary rounded-[60px] text-white  text-[18px] py-3 px-8  transition-all">
                Get Started
              </button>
            </Link>
            <Link href="#leverage">
            <button className="border border-primary rounded-[60px] text-primary  text-[18px] py-3 px-8 transition-all">
                Learn More
              </button>
            </Link>
          </div>
        </div>

        {/* Image Section */}
        <div
       
          className=" mx-auto  ps-5"
        >
        <Image src="/images/heroimg.png" width={613} height={635} alt="hero img" />
           
       
        </div>
      </div>
    </div>
  );
}
