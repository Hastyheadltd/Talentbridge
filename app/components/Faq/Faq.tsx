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
    answer:
      "Yes, businesses can define custom screening criteria, such as required specific hard and soft skills, experience backgrounds, location preferences, and cultural fit. Recruiters will use these criteria to ensure only the most relevant candidates are presented.",
  },
  {
    question: "What pricing plans does FlixRecruit offer for businesses?",
    answer:
      "FlixRecruit offers a pay-per-hire model (only pay when you successfully hire a candidate). For detailed pricing information, book a free call with us.",
  },
  {
    question: "How does FlixRecruit ensure the quality of the candidates?",
    answer:
      "FlixRecruit's recruiters conduct in-depth screening based on job requirements, using AI-assisted evaluations and manual assessments. We also rely on a recruiter rating system to ensure high-quality service.",
  },
  {
    question: "What happens if a candidate I hire leaves shortly after starting?",
    answer:
      "If a candidate leaves within a short period, the conditions for a replacement or refund depend on the specific terms agreed upon with the hiring company. FlixRecruit offers flexible solutions, such as providing a replacement candidate or partial refund, based on the agreed-upon conditions in your service contract.",
  },
  {
    question: "Can I edit or delete a job posting after publishing it?",
    answer:
      "Yes, you can edit or delete job postings directly from your dashboard. If the job is deleted, recruiters will be notified immediately to stop sourcing candidates.",
  },
  {
    question: "How do I update my profile information?",
    answer:
      "You can update your profile details, including company information, payment preferences, and recruiter requirements, via the account settings in your FlixRecruit dashboard.",
  },
  {
    question: "Is there a rating or feedback system for recruiters and employers?",
    answer:
      "Yes, FlixRecruit has a rating system where businesses can rate recruiters based on their performance. Similarly, recruiters can provide feedback on companies to ensure a transparent and high-quality experience.",
  },
  {
    question: "Does FlixRecruit offer resume-building or career coaching services?",
    answer:
      "While FlixRecruit primarily focuses on recruitment, we plan to introduce a 'Freelancer Academy' with resources for recruiters, including training and mentorship programs. Freelancers looking for career coaching or resume-building may find guidance through our partner services.",
  },
  {
    question: "Does FlixRecruit offer integrations with other HR tools?",
    answer:
      "FlixRecruit will integrate with popular HR software, such as Personio, for seamless applicant tracking and management in the future.",
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
