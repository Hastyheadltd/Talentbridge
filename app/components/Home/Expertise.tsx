"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  FaCode,
  FaPencilRuler,
  FaChartLine,
  FaClipboardCheck,
  FaUserCog,
  FaBullhorn,
} from "react-icons/fa";

const expertise = [
  {
    icon: <FaCode className="text-blue-500 text-4xl" />,
    title: "Developers",
    description:
      "Seasoned software engineers, coders, and architects with expertise across hundreds of technologies.",
  },
  {
    icon: <FaPencilRuler className="text-blue-500 text-4xl" />,
    title: "Designers",
    description:
      "Expert UI, UX, Visual, and Interaction designers as well as a wide range of illustrators, animators, and more.",
  },
  {
    icon: <FaChartLine className="text-blue-500 text-4xl" />,
    title: "Finance Experts",
    description:
      "Experts in financial modeling & valuation, startup funding, interim CFO work, and market sizing.",
  },
  {
    icon: <FaClipboardCheck className="text-blue-500 text-4xl" />,
    title: "Project Managers",
    description:
      "Digital and technical project managers, scrum masters, and more with expertise in numerous PM tools, frameworks, and styles.",
  },
  {
    icon: <FaUserCog className="text-blue-500 text-4xl" />,
    title: "Product Managers",
    description:
      "Digital product managers, scrum product owners with expertise in numerous industries like banking, healthcare, e-commerce, and more.",
  },
  {
    icon: <FaBullhorn className="text-blue-500 text-4xl" />,
    title: "Marketing Experts",
    description:
      "Experts in digital marketing, growth marketing, content creation, market research, brand strategy execution, social media marketing, and more.",
  },
];

const sectionVariants = {
  hidden: { opacity: 0, y: 100 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.5, ease: "easeOut" } },
};

const ExpertiseGrid = () => {
  return (
    <motion.div
      className="max-w-[1244px] mx-auto py-16 px-4 sm:px-6 lg:px-8"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={sectionVariants}
    >
      <div className="text-center">
        <h2 className="text-3xl font-bold text-primary mb-8">
          Leverage World-Class Talent
        </h2>
        <p className="text-gray-600 text-[16px]  w-[600px] mx-auto mb-16">
          We are the largest, globally-distributed network of top business,
          design, and technology talent, ready to tackle your most important
          initiatives.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {expertise.map((item, index) => (
          <motion.div
            key={index}
            className="bg-gray-50  cursor-pointer p-6 rounded-lg shadow-md flex flex-col items-center text-center transition-transform duration-300 hover:scale-105 hover:shadow-xl"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, delay: index * 0.2 },
              },
            }}
          >
            <div className="mb-4">{item.icon}</div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              {item.title}
            </h3>
            <p className="text-gray-600 text-sm">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ExpertiseGrid;
