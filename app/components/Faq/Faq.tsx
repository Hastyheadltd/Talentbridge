"use client";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { GoPlus } from "react-icons/go";

const faqs = [
  {
    question: "How does the candidate-matching process work?",
    answer:
      "FlixRecruit assigns recruiters based on their qualifications and an AI matching system. For each job, three recruiters are selected to source and assess top candidates. A messaging bar opens between the client and recruiters, allowing candidate information to be shared directly. The position will typically be filled quickly, thanks to our efficient matching process and recruiter collaboration.",
  },
  {
    question: "Can I set specific screening criteria for applicants?",
    answer: "Yes, you can define screening criteria based on experience, skills, and location.",
  },
  {
    question: "What pricing plans does FlixRecruit offer for businesses?",
    answer: "FlixRecruit offers flexible pricing plans, including pay-per-hire and subscription models.",
  },
  {
    question: "How does FlixRecruit ensure the quality of the candidates?",
    answer: "We vet candidates using AI-powered screening and recruiter assessments.",
  },
  {
    question: "What happens if a candidate I hire leaves shortly after starting?",
    answer: "FlixRecruit offers replacement guarantees within a set period.",
  },
  {
    question: "Can I edit or delete a job posting after publishing it?",
    answer: "Yes, you can edit or delete job postings from your dashboard.",
  },
  {
    question: "How do I update my profile information?",
    answer: "You can update your profile from the account settings page.",
  },
  {
    question: "Is there a rating or feedback system for recruiters and employers?",
    answer: "Yes, both recruiters and employers can leave feedback and ratings.",
  },
  {
    question: "Does FlixRecruit offer resume-building or career coaching services?",
    answer: "Yes, we provide professional resume-building and career coaching services.",
  },
  {
    question: "Does FlixRecruit offer integrations with other HR tools?",
    answer: "Yes, we integrate with major HR tools for seamless workflow management.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-primary pt-[130px] pb-16">
      <h2 className="text-[53px] font-bold text-center mb-4 text-white mt-5">Frequently Asked Questions</h2>

      <div className="max-w-[744px] mx-auto">
        {faqs.map((faq, index) => (
          <div key={index} className="mb-3">
            <div
              className={`bg-white text-black rounded-[16px] transition-all duration-300 ${
                openIndex === index ? "shadow-lg" : ""
              }`}
            >
              {/* Question Button */}
              <button
                onClick={() => toggleFAQ(index)}
                className={`flex justify-between items-center w-full px-6 py-4 text-left focus:outline-none ${
                  openIndex === index ? "rounded-t-lg" : "rounded-lg"
                }`}
              >
                <span className="font-medium text-[15.6px] text-black">{faq.question}</span>
                <span className="text-xl">{openIndex === index ? <IoMdClose /> :<GoPlus />}</span>
              </button>

              
              {openIndex === index && (
                <div className="px-5 pb-4 text-[15px] tracking-[-0.38px]  rounded-b-lg">
                  {faq.answer}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <p className="text-center my-10 text-white text-[16px] tracking-[-0.38px]">
        Still have more questions? Contact us at{" "}
        <a href="mailto:support@flixrecruit.com" >
          support@flixrecruit.com
        </a>
      </p>
    </div>
  );
};

export default FAQSection;
