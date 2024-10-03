"use client";
import { motion } from "framer-motion";

import Link from "next/link";

export default function HeroSection() {
  return (

<div className="max-w-[1144px] mx-auto flex justify-center mt-[100px] gap-11 overflow-hidden">
<div className="relative z-20 flex flex-col items-start justify-start text-start space-y-10 max-w-xl">
        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="text-7xl  font-extrabold text-secondary tracking-tight leading-tight"
        >
       Unlock Your 
          <motion.span
            className="text-[#0647AC] underline underline-offset-8 decoration-4 ps-4"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeInOut" }}
          >
           Career Path
          </motion.span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          className="text-lg sm:text-2xl text-secondary max-w-3xl mx-auto leading-relaxed"
        >
          Discover limitless opportunities to shape your career and unlock the
          potential within.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 1, ease: "easeInOut" }}
        >
          <Link href="/jobs">
            <button className="px-10 py-4 text-lg sm:text-lg font-semibold rounded-full bg-gradient-to-r from-[#0647AC] to-[#05388a] text-white hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out">
              Explore Jobs
            </button>
          </Link>
        </motion.div>
      </div>

    

      </div>
  
  );
}
