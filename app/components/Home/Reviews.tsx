"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaGlobe, FaUsers, FaQuoteLeft } from "react-icons/fa";
import { MdStarRate } from "react-icons/md";

const testimonials = [
  {
    quote: "I have been working with Talent Bridge",
    description:
      "I have been working with Talent Bridge for several years now. They have all been exceptionally talented, very professional, highly productive, great team players, good communicators, and willing to go above and beyond. I have relied on them as key team players and they have never felt like 'outsiders'. Talent Bridge as an organization has been professional and easy to work with.",
    rating: 5,
    author: "Ian Stokes-Rees",
    position: "Partner",
    logo: "BCGX",
  },
  {
    quote: "Talent Bridge is my go-to source",
    description:
      "Talent Bridge is my go-to source to find high-quality talent I can't find elsewhere. I've been very impressed with the breadth and depth of talent they have been able to deliver.",
    rating: 5,
    author: "Tess Caputo",
    position: "Chief Operations Officer",
    logo: "Zoetis", 
  },
  {
    quote: "Creating an app for the game",
    description:
      "With the pressure on and millions watching the Cleveland Cavaliers during the NBA Playoffs, Talent Bridge delivered the talent and expertise needed to launch a brand-new fan engagement platform.",
    rating: 5,
    author: "Conor Kenney",
    position: "VP, Product and Technology",
    logo: "Cleveland Cavaliers", 
  },
];

const fadeIn = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

const Reviews = () => {
  return (
    <motion.div
      className="bg-gray-50 py-16"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-[1244px] mx-auto px-6 lg:px-8 text-center">
        <motion.h2
          className="text-3xl font-bold text-primary"
          variants={fadeIn}
          transition={{ duration: 0.6 }}
        >
          Our Clients&#39; Satisfaction is Our Top Priority
        </motion.h2>
        <motion.p
          className="text-gray-600 text-[16px] mt-4"
          variants={fadeIn}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          We have a reputation for helping clients around the world find success
          on their most important projects.
        </motion.p>

        <motion.div
          className="flex justify-center items-center mt-12 space-x-12"
          variants={fadeIn}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="flex items-center text-left">
            <FaGlobe className="text-blue-500 text-4xl mr-4" />
            <div>
              <h3 className="text-lg font-bold text-gray-900">140+</h3>
              <p className="text-gray-600 text-sm">Countries Served</p>
            </div>
          </div>
          <div className="flex items-center text-left">
            <FaUsers className="text-blue-500 text-4xl mr-4" />
            <div>
              <h3 className="text-lg font-bold text-gray-900">25,000+</h3>
              <p className="text-gray-600 text-sm">Clients Served</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12"
          variants={fadeIn}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 shadow-md text-left flex flex-col justify-between"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              variants={fadeIn}
            >
              <div>
                <div className="text-blue-500 text-xl mb-4">
                  <FaQuoteLeft />
                </div>
                <p className="text-blue-500 text-[18px] font-bold mb-3 truncate">
                  {testimonial.quote}
                </p>
                <p className="text-gray-600 text-[14px]">{testimonial.description}</p>
              </div>
              <div className="flex items-center my-6">
                {[...Array(5)].map((_, i) => (
                  <MdStarRate key={i} className="text-yellow-500 text-lg" />
                ))}
              </div>
              <div className="mt-1">
                <p className="text-gray-900 text-[16px] font-medium">{testimonial.author}</p>
                <p className="text-gray-400 text-[12px]">{testimonial.position}</p>
                <p className="mt-2 text-gray-800 text-[22px] font-bold italic">{testimonial.logo}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Reviews;
