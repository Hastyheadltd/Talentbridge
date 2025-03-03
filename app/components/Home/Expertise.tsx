"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaChartLine } from "react-icons/fa";
import Developer from "../icons/Developer";
import Medicine from "../icons/Medicine";
import Engineering from "../icons/Engineering";
import HR from "../icons/HR";
import Finance from "../icons/Finance";

const expertise = [
  {
    icon: <Developer/>,
    title: "Developers",
    description:
      "Hire experienced software engineers, developers, and architects skilled in a wide range of technologies",
  },
  {
    icon: <Medicine/>,
    title: "Medicine",
    description:
      "Connect with top medical professionals, including healthcare consultants and researchers",
  },
  {
    icon: <Engineering/>,
    title: "Engineering",
    description:
      "Find experts in engineering, product development, and innovative solutions for your business needs",
  },
  {
    icon: <HR/>,
    title: "HR",
    description:
      "Get access to skilled HR professionals specializing in recruitment and talent management",
  },
  {
    icon: <FaChartLine className="text-white text-4xl"/>,
    title: "Sales",
    description:
      "Hire top-performing sales professionals with expertise in business development and customer acquisition"
  },
  {
    icon: <Finance />,
    title: "Finance",
    description:
      "Get access to financial analysts, CFO consultants, and experts in valuation, startup funding, and financial modeling",
  },

];

const sectionVariants = {
  hidden: { opacity: 0, y: 100 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.5, ease: "easeOut" } },
};

const ExpertiseGrid = () => {
  return (
    <motion.div
      className="max-w-[1280px] mx-auto py-16 px-4 sm:px-6 lg:px-8"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={sectionVariants}
    >
      <div className="text-center">
        <h2 className="text-[56px] font-bold text-black mb-6">
        Leverage A Players
        </h2>
        <p className="text-text text-[22px]  w-[1004px] mx-auto mb-10">
        Our global network of Freelance recruiters connects you with high-performer employers to drive your company&#39;s success across various industries:
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {expertise.map((item, index) => (
          <motion.div
            key={index}
            className="bg-white border border-[#EBEBEB]/50  mt-11  cursor-pointer p-6 rounded-[30px] shadow-lg flex flex-col items-center text-center transition-transform duration-300 hover:scale-105 hover:shadow-xl"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, delay: index * 0.2 },
              },
            }}
          >
            <div className="h-[100px] w-[100px] rounded-full -mt-16 bg-primary flex justify-center items-center border-4 border-[#3271D2]">{item.icon}</div>
            <h3 className="text-[29px] text-secondary mt-3 text-center font-bold">
              {item.title}
            </h3>
            <p className="text-text mt-1 text-[18px]">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ExpertiseGrid;
