"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";


const testimonials = [
  {
    title: "Partnership With Flix Recruit",
    description:
      "I've been particularly impressed with the platform's ability to match me with freelancers who have the specific skills and experience we need. The quality of talent is exceptional",
  },
  {
    title: "Flix Recruit Is My Go-To Source",
    description:
      "Flix Recruit is my go-to source to find high-quality talent I can't find elsewhere. I've been very impressed with the breadth and depth of talent they have been able to deliver.",
  },
  {
    title: "Great Platform For Finding Talent",
    description:
      "Flix Recruit delivered the talent and expertise needed to launch a brand-new fan engagement platform.",
  },
];

const TestimonialSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 3000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-[1280px] mx-auto my-20">
      <h2 className="text-black text-[56px] font-bold mb-4 text-center">
        Our Clients&#39; Satisfaction Is Our Top Priority
      </h2>
      <p className="text-text mt-3 text-[20px] text-center ">
      We have a reputation for helping clients around the world find success on their most important projects.
      </p>

      <div className="relative w-full max-w-[1280px] flex justify-center items-center overflow-hidden h-[328px] mx-auto">
        {testimonials.map((testimonial, index) => {
          const isActive = index === currentIndex;
          const isPrev = index === (currentIndex - 1 + testimonials.length) % testimonials.length;
          const isNext = index === (currentIndex + 1) % testimonials.length;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: isActive ? -200 : 200 }}
              animate={{
                opacity: isActive ? 1 : 0.5,
                scale: isActive ? 1.1 : 0.9,
                x: isActive ? 0 : isPrev ? -150 : isNext ? 150 : 0,
              }}
              exit={{ opacity: 0, x: isActive ? 200 : -200 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className={`absolute text-center p-5 rounded-[30px]  border border-[#EBEBEB]/80 shadow-lg transition-all duration-500  w-[688px] bg-white flex flex-col items-center justify-center ${
                isActive ? "z-10" : "z-0 "
              }`}
            >
              <h3 className="text-[34px] text-[#484A61] font-bold mt-2 mb-4">
                {testimonial.title}
              </h3>
              <p className="text-text w-[614px] text-[22px] pb-3 text-center">
                {testimonial.description}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* Navigation Dots */}
      <div className="flex mt-3 justify-center space-x-2 pb-10">
        {testimonials.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`cursor-pointer rounded-[20px] transition-all h-[13px] duration-300 ${
              currentIndex === index ? "bg-primary w-[71px] " : "bg-[#ccc] w-[27px]"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default TestimonialSlider;
