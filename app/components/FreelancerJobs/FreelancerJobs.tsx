"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

import { Job } from "../type/Jobs";
import { FiHome } from "react-icons/fi";
import { CiLocationOn } from "react-icons/ci";
import { IoBriefcaseOutline } from "react-icons/io5";
import { GoClock } from "react-icons/go";

export default function FreelancerJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("All");
  const [releaseDate, setReleaseDate] = useState("");
  const [employmentType, setEmploymentType] = useState("");
  const [salaryMin, setSalaryMin] = useState(1000);
  const [region, setRegion] = useState("");
  const [language, setLanguage] = useState("");

  const [skills, setSkills] = useState<string[]>([]);
  const [visibleSkillsCount, setVisibleSkillsCount] = useState(5); 

 
  const VALID_SKILLS = [
    "Front End",
    "Back End",
    "Full Stack",
    "Javascript",
    "Typescript",
    "React",
    "Next.js",
    "Vue.js",
    "Angular",
    "HTML",
    "CSS",
    "SASS",
    "Tailwind CSS",
    "Bootstrap",
    "Node.js",
    "Express.js",
    "NestJS",
    "Python",
    "Django",
    "Flask",
    "Java",
    "Spring Boot",
    "C#",
    ".NET",
    "PHP",
    "Laravel",
    "Ruby",
    "Ruby on Rails",
    "Go",
    "Rust",
    "SQL",
    "MySQL",
    "PostgreSQL",
    "MongoDB",
    "Firebase",
    "AWS",
    "Azure",
    "Google Cloud",
    "Docker",
    "Kubernetes",
    "GraphQL",
    "REST API",
    "Microservices",
    "Cybersecurity",
    "DevOps",
    "CI/CD",
    "Git",
    "Linux",
    "Machine Learning",
    "AI Development",
    "Data Science",
    "Big Data",
    "Blockchain",
    "Solidity",
    "Smart Contracts",
    "Game Development",
    "Unity",
    "Unreal Engine",
    "Swift",
    "Kotlin",
    "iOS Development",
    "Android Development",
    "Flutter",
    "React Native",
    "UI/UX Design",
    "Figma",
    "Adobe XD",
    "WordPress",
    "Webflow",
    "Shopify",
    "E-commerce",
    "SEO",
    "Content Writing",
    "Copywriting",
    "Marketing",
    "Social Media Management",
    "Project Management",
    "Scrum",
    "Agile",
    "German",
    "English",
    "Spanish",
    "French"
  ];
  
 

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/jobs`);
    
        const sorted = response.data.sort(
          (a: Job, b: Job) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setJobs(sorted);
        setFilteredJobs(sorted);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, []);


  const checkJobRecency = (createdAt: string, filter: string): boolean => {
    const jobDate = new Date(createdAt);
    const now = new Date();
    switch (filter) {
      case "last24hours":
        return now.getTime() - jobDate.getTime() <= 24 * 60 * 60 * 1000;
      case "last7days":
        return now.getTime() - jobDate.getTime() <= 7 * 24 * 60 * 60 * 1000;
      case "last30days":
        return now.getTime() - jobDate.getTime() <= 30 * 24 * 60 * 60 * 1000;
      default:
        return true;
    }
  };
  // State for Skill Search
const [skillSearchTerm, setSkillSearchTerm] = useState("");

// Filter jobs based on skills search
useEffect(() => {
  let tempJobs = [...jobs];

  // Check if skill search term is entered
  if (skillSearchTerm) {
    tempJobs = tempJobs.filter((job) =>
      job.skills.some((js) =>
        js.toLowerCase().includes(skillSearchTerm.toLowerCase())
      )
    );
  }

  setFilteredJobs(tempJobs);
}, [jobs, skillSearchTerm]);

  const getReleaseDateCount = (value: string) =>
    jobs.filter((job) => checkJobRecency(job.createdAt, value)).length;

  // Distinct Employment Types 
  const distinctEmploymentTypes = Array.from(
    new Set(jobs.map((j) => j.employmentType).filter(Boolean))
  ) as string[];
  const getEmploymentTypeCount = (etype: string) =>
    jobs.filter((job) => job.employmentType === etype).length;

  //  Distinct Languages 
  const distinctLanguages = Array.from(
    new Set(jobs.map((j) => j.languages).filter(Boolean))
  ) as string[];
  const getLanguageCount = (lang: string) =>
    jobs.filter((job) => job.languages === lang).length;

  // Skills 
  let skillCounts: Record<string, number> = {};
  VALID_SKILLS.forEach((vs) => (skillCounts[vs] = 0));
  jobs.forEach((job) => {
    if (!job.skills) return;
    job.skills.forEach((jobSkill) => {
      VALID_SKILLS.forEach((valid) => {

        if (jobSkill.toLowerCase().includes(valid.toLowerCase())) {
          skillCounts[valid] += 1;
        }
      });
    });
  });


  
  // Sort skills by job count 
  const sortedSkills = Object.entries(skillCounts)
    .sort((a, b) => b[1] - a[1]) 
    .map(([skill]) => skill);
  

  const filteredSkills = sortedSkills.filter((skill) =>
    skill.toLowerCase().includes(skillSearchTerm.toLowerCase())
  );
  
  // Paginate skills
  const visibleSkills = filteredSkills.slice(0, visibleSkillsCount);

  const industries = Array.from(
    new Set(jobs.map((job) => job.industry).filter(Boolean))
  ) as string[];


  useEffect(() => {
    let tempJobs = [...jobs];

    //  Industry
    if (selectedIndustry !== "All") {
      tempJobs = tempJobs.filter((job) => job.industry === selectedIndustry);
    }

    //  Search term (job title)
    if (searchTerm) {
      tempJobs = tempJobs.filter((job) =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    //  Release date
    if (releaseDate) {
      tempJobs = tempJobs.filter((job) => checkJobRecency(job.createdAt, releaseDate));
    }

    //  Employment type
    if (employmentType) {
      tempJobs = tempJobs.filter((job) => job.employmentType === employmentType);
    }

    // Region
    if (region) {
      tempJobs = tempJobs.filter((job) =>
        job.location.toLowerCase().includes(region.toLowerCase())
      );
    }

    // Language
    if (language) {
      tempJobs = tempJobs.filter((job) => job?.languages === language);
    }

    //Skills 
    if (skills.length) {
      tempJobs = tempJobs.filter((job) => {
        return skills.every((selectedSkill) =>
          job.skills.some((js) =>
            js.toLowerCase().includes(selectedSkill.toLowerCase())
          )
        );
      });
    }

    // Salary
    tempJobs = tempJobs.filter((job) => {
      if (!job.salary) return false; 
      return job.salary >= salaryMin;
    });

    setFilteredJobs(tempJobs);
  }, [
    jobs,
    selectedIndustry,
    searchTerm,
    releaseDate,
    employmentType,
    region,
    language,
    skills,
    salaryMin,
  ]);

  // Reset all filters
  const resetFilters = () => {
    setSelectedIndustry("All");
    setSearchTerm("");
    setReleaseDate("");
    setEmploymentType("");
    setSalaryMin(40000);
    setRegion("");
    setLanguage("");
    setSkills([]);
  };

  // Handle skills checkbox 
  const handleSkillChange = (skill: string) => {
    if (skills.includes(skill)) {
      setSkills(skills.filter((s) => s !== skill));
    } else {
      setSkills([...skills, skill]);
    }
  };


  if (!jobs.length && !filteredJobs.length) {
    return <div className="text-center flex items-center justify-center min-h-screen">Loading jobs or no jobs found...</div>;
  }

  return (
    <div className="max-w-[1136px] mx-auto mt-5 mb-16 px-3 py-5 ">
      {/* Page Title + Top Filters  */}
      <div className=" text-center">
        <h1 className="text-[48px] sm:text-4xl font-semibold text-black">
          Job Openings
        </h1>

        {/* Search Field & Reset Button */}
        <div className="flex gap-2 mt-5 justify-center items-center">
          <input
            type="text"
            placeholder="Search for Position"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-[#475467] w-[500px] text-[14px] rounded-[24px] focus:outline-none py-3 px-5"
          />
          <button
            onClick={resetFilters}
            className="bg-[#4F9EF6] text-[14px] rounded-[24px] px-5 py-3 text-white"
          >
            Reset Filter
          </button>
        </div>
      </div>

      {/* Tabs for Industry */}
      <div className="flex flex-wrap justify-center items-center mt-6 gap-5">
        {/* 'All' tab */}
        <button
          onClick={() => setSelectedIndustry("All")}
          className={`px-4 py-1 rounded-[24px] text-[14px] 
            ${
              selectedIndustry === "All"
                ? "border border-primary text-primary"
                : "border border-[#475467] text-[#475467]"
            }`}
        >
          All
        </button>

        {/*tabs */}
        {industries.map((ind) => (
          <button
            key={ind}
            onClick={() => setSelectedIndustry(ind)}
            className={`px-5 py-1 rounded-[24px] text-[14px] 
              ${
                selectedIndustry === ind
                  ? "border border-primary text-primary"
                  : "border border-[#475467] text-[#475467]"
              }`}
          >
            {ind}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex items-start gap-5 mt-6">
        {/* SIDEBAR */}
        <aside className="w-[273px] border border-primary rounded-[20px] p-3 h-fit">
          {/* Release Date */}
          <div className="mb-4 border border-[#2367EA]/20 p-4 rounded-[20px]">
            <h3 className="font-semibold text-[18px] text-[#373940] mb-3">Release date</h3>
            <div className="flex flex-col space-y-3">
              {/* 24h */}
              <label className="inline-flex items-center justify-between cursor-pointer">
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="releaseDate"
                    value="last24hours"
                    checked={releaseDate === "last24hours"}
                    onChange={(e) => setReleaseDate(e.target.value)}
                    className="cursor-pointer"
                  />
                  <span className=" text-text text-[14px]">Newer than 24h</span>
                </div>
                <span className="bg-[#2E90FA24] w-5 h-5 text-center rounded-full flex justify-center items-center text-[10px] text-primary">
                  {getReleaseDateCount("last24hours")}
                </span>
              </label>
              {/* 7 days */}
              <label className="inline-flex items-center justify-between cursor-pointer">
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="releaseDate"
                    value="last7days"
                    checked={releaseDate === "last7days"}
                    onChange={(e) => setReleaseDate(e.target.value)}
                    className="cursor-pointer"
                  />
                  <span className="text-text text-[14px]">Newer than 7 days</span>
                </div>
                <span className="bg-[#2E90FA24] w-5 h-5 text-center rounded-full flex justify-center items-center text-[10px] text-primary">
                  {getReleaseDateCount("last7days")}
                </span>
              </label>
              {/* 30 days */}
              <label className="inline-flex items-center justify-between cursor-pointer">
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="releaseDate"
                    value="last30days"
                    checked={releaseDate === "last30days"}
                    onChange={(e) => setReleaseDate(e.target.value)}
                    className="cursor-pointer"
                  />
                  <span className="text-text text-[14px]">Newer than 30 days</span>
                </div>
                <span className="bg-[#2E90FA24] w-5 h-5 text-center rounded-full flex justify-center items-center text-[10px] text-primary">
                  {getReleaseDateCount("last30days")}
                </span>
              </label>
            </div>
          </div>

          {/* Employment Type  */}
          <div className="mb-4 border border-[#2367EA]/20 p-4 rounded-[20px]">
            <h3 className="font-semibold text-[18px] text-[#373940] mb-3">Employment Type</h3>
            <div className="flex flex-col space-y-3">
              {distinctEmploymentTypes.map((etype) => (
                <label
                  key={etype}
                  className="inline-flex items-center justify-between cursor-pointer"
                >
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="employmentType"
                      value={etype}
                      checked={employmentType === etype}
                      onChange={(e) => setEmploymentType(e.target.value)}
                      className="cursor-pointer"
                    />
                    <span className="text-text text-[14px] capitalize ">{etype}</span>
                  </div>
                  <span className="bg-[#2E90FA24] w-5 h-5 text-center rounded-full flex justify-center items-center text-[10px] text-primary">
                    {getEmploymentTypeCount(etype)}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Salary */}
          <div className="mb-4 border border-[#2367EA]/20 p-4 rounded-[20px]">
            <h3 className="font-semibold text-[18px] text-[#373940] mb-3">Salary</h3>
            <div className="mb-2 text-text text-[14px]">
              €1000 — €300,000
            </div>
            <input
              type="range"
              min={1000}
              max={300000}
              step={1000}
              value={salaryMin}
              onChange={(e) => setSalaryMin(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
            <div className="mt-2 text-text text-[14px]">
              Current: €{salaryMin.toLocaleString()}
            </div>
          </div>

          {/* Region */}
          <div className="mb-4 border border-[#2367EA]/20 p-4 rounded-[20px]">
  <h3 className="font-semibold text-[18px] text-[#373940] mb-2">Region</h3>
  <label className="block text-text text-[14px] font-semibold mb-[6px]">
    Where Are You Starting From?
  </label>
  <div className="relative">
    <FiHome  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />

    <input
      type="text"
      placeholder="Address, zip code or city"
      value={region}
      onChange={(e) => setRegion(e.target.value)}
      className="border border-gray-200 rounded-full ps-8 pe-4 py-2 focus:outline-none w-full text-sm"
    />
  </div>
</div>
          {/* Language (single-select) */}
          <div className="mb-4 border border-[#2367EA]/20 p-4 rounded-[20px]">
            <h3 className="font-semibold text-[18px] text-[#373940] mb-3">Language</h3>
            <div className="flex flex-col space-y-3">
              {distinctLanguages.map((lang) => (
                <label
                  key={lang}
                  className="inline-flex items-center justify-between cursor-pointer"
                >
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="language"
                      value={lang}
                      checked={language === lang}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="cursor-pointer"
                    />
                    <span className="text-text text-[14px] capitalize">{lang}</span>
                  </div>
                  <span className="bg-[#2E90FA24] w-5 h-5 text-center rounded-full flex justify-center items-center text-[10px] text-primary">
                    {getLanguageCount(lang)}
                  </span>
                </label>
              ))}
            </div>
          </div>


{/* Skills */}
<div className=" border border-[#2367EA]/20 p-4 rounded-[20px]">
  <h3 className="font-semibold text-[18px] text-[#373940] mb-3">Skills</h3>

  {/* Search Input for Skills */}
  <input
    type="text"
    placeholder="Seek Ability"
    className="border border-gray-300 rounded-full px-4 py-2 w-full text-sm focus:outline-none"
    value={skillSearchTerm}
    onChange={(e) => {
      setSkillSearchTerm(e.target.value);
      setVisibleSkillsCount(7); 
    }}
  />

  <div className="flex flex-col space-y-3 text-sm mt-3">
    {visibleSkills.map((skill) => (
      <label key={skill} className="inline-flex items-center justify-between cursor-pointer">
        <div className="flex items-center space-x-2">
        <input
            type="checkbox"
            checked={skills.includes(skill)}
            onChange={() => handleSkillChange(skill)}
            className="cursor-pointer"
          />
          <span className="text-gray-700">{skill}</span>
        </div>
        <span className="bg-[#2E90FA24] w-5 h-5 text-center rounded-full flex justify-center items-center text-[10px] text-primary">{skillCounts[skill] || 0}</span>
      </label>
    ))}


    {visibleSkillsCount < filteredSkills.length && (
      <button
        type="button"
        onClick={() => setVisibleSkillsCount(visibleSkillsCount + 5)}
        className="text-blue-600  text-sm  mt-2 text-center font-semibold"
      >
        + More...
      </button>
    )}

    {/* Show "Show Less"  */}
    {visibleSkillsCount > 7 && (
      <button
        type="button"
        onClick={() => setVisibleSkillsCount(7)}
        className="text-blue-600 text-sm  mt-1 text-center"
      >
        Show Less
      </button>
    )}
  </div>
</div>




        </aside>

        {/* JOB CARDS */}
        <div className=" grid grid-cols-1 lg:grid-cols-3 gap-4">
          {filteredJobs.map((job) => {
            const commission = job.salary ? (job.salary * 0.15).toFixed(2) : 0;

            return (
              <div
                key={job._id}
                className="w-[255px] mb-4"
              >
                 <div className=" p-6 bg-[#031830] text-white border border-gray-700 rounded-2xl  hover:shadow-md hover:shadow-blue-900 transition-all duration-300">
            <h2 className="text-[16px] font-semibold mb-3 h-[50px] line-clamp-2">{job.title}</h2>

            <div className="flex items-center justify-end mb-3 text-[#CACACA]">
              <CiLocationOn  className="mr-2 text-white " />
              <p className="text-[14px]">{job.location}</p>
            </div>
           <div className="flex items-center gap-4 pt-2">
            <div className="flex items-center mb-3 text-[#CACACA]">
              <IoBriefcaseOutline className="mr-2" />
              <p className="text-[14px]">{job.industry}</p>
            </div>
            <div className="flex items-center mb-3 text-[#CACACA]">
              <GoClock className="mr-2" />
              <p className="text-[14px] capitalize">{job.jobType}</p>
            </div>
            </div>

            {/* Open Job Description Button */}
            <Link href={`jobs/${job._id}`}>
            <button className="w-full py-2 mt-4 bg-[#4F9EF6] text-[16px] text-white rounded-full  hover:bg-blue-600 transition">
              Open Job Description
            </button>
            </Link>
            </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
