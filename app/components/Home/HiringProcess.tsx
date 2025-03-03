"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";
import HiringGraph from "../icons/HiringGraph";
import Group from "../icons/Group";
import Candidate from "../icons/Candidate";
import Secure from "../icons/Secure";

import Two from "../icons/Two";
import Three from "../icons/Three";
import One from "../icons/One";

const steps = [
  {
    id: 1,
    icon:<Group/>,
    number:<One/>,
    title: "Talk to Our Sales Expert",
    description:
"A dedicated sales expert will work with you to understand your hiring needs, company culture, and ideal candidate profile",
  },
  {
    id: 2,
    icon:<Candidate/>,
    number:<Two/>,
    title: "Get Candidate Suggestions ",
    description:
      "Within days, three freelancers will suggest suitable candidates for your position based on your requirements",
  },
  {
    id: 3,
    icon:<Secure/>,
    number:<Three/>,
    title: "Secure Your Perfect Candidate",
    description:
      "Choose the best fit and benefit from a cost-effective, transparent payment model",
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
    className="flex flex-col items-center mt-[100px] mb-20 max-w-[1280px] mx-auto overflow-hidden"
  >
    <h2 className="text-black text-[56px] font-semibold ">Hiring Made Easy</h2>
    <div className="flex flex-row items-center justify-between w-full ">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center mt-11">
          {/* Step Content */}
          <motion.div
            className="flex flex-col  justify-center text-center"
            initial="hidden"
            animate={controls}
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.6, delay: index * 0.6 }}
          >
            <div className=" flex justify-center ms-[150px]">
              {step.number}
            </div>
           <div className=" w-[119px] h-[119px] -mt-1 mx-auto rounded-full border border-primary p-2">
            <div className="bg-primary   rounded-full w-full h-full flex justify-center items-center ">
            {step.icon}
            </div>
          
           </div>
            <h3 className="text-[24px]  capitalize text-primary font-semibold my-4">{step.title}</h3>
            <p className="text-text w-[300px] text-[20px]">{step.description}</p>
          </motion.div>
  
          {/* Arrow */}
          {index < steps.length - 1 && (
            <motion.div
              className="flex items-center -mt-[160px] -mx-7 "
              initial="hidden"
              animate={controls}
              variants={{
                hidden: { opacity: 0, scale: 0.8 },
                visible: { opacity: 1, scale: 1 },
              }}
              transition={{ duration: 0.7, delay: (index + 1) * 0.7 }}
            >
              <HiringGraph/>
            </motion.div>
          )}
        </div>
      ))}
    </div>
  </div>
  
  );
};

export default HiringSteps;
