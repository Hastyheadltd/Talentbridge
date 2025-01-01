"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";
import Arrow from "../icons/Arrow";

const steps = [
  {
    id: 1,
    title: "Talk to One of Our Industry Experts",
    description:
      "An expert on our team will work with you to understand your goals, technical needs, and team dynamics.",
  },
  {
    id: 2,
    title: "Work With Hand-Selected Talent",
    description:
      "Within days, we'll introduce you to the right talent for your project. Average time to match is under 24 hours.",
  },
  {
    id: 3,
    title: "The Right Fit, Guaranteed",
    description:
      "Work with your new team member on a trial basis (pay only if satisfied), ensuring you hire the right people for the job.",
  },
];

const HiringSteps = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <div
    ref={ref}
    className="flex flex-col items-center my-20 max-w-[1244px] mx-auto overflow-hidden"
  >
    <h2 className="text-3xl text-center font-bold mb-12 text-primary">Hiring Made Easy</h2>
    <div className="flex flex-row items-center justify-between w-full ">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center space-x-4">
          {/* Step Content */}
          <motion.div
            className="flex flex-col items-center justify-center text-center"
            initial="hidden"
            animate={controls}
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.6, delay: index * 0.6 }}
          >
            <div className="flex items-center justify-center w-12 h-12 border-2 border-blue-500 text-blue-500 font-bold rounded-full mb-4">
              {step.id}
            </div>
            <h3 className="text-[18px] font-semibold mb-2">{step.title}</h3>
            <p className="text-gray-600 w-[300px] text-sm">{step.description}</p>
          </motion.div>
  
          {/* Arrow */}
          {index < steps.length - 1 && (
            <motion.div
              className="flex items-center px-5"
              initial="hidden"
              animate={controls}
              variants={{
                hidden: { opacity: 0, scale: 0.8 },
                visible: { opacity: 1, scale: 1 },
              }}
              transition={{ duration: 0.6, delay: (index + 1) * 0.6 }}
            >
              <Arrow  />
            </motion.div>
          )}
        </div>
      ))}
    </div>
  </div>
  
  );
};

export default HiringSteps;
