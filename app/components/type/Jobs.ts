 export interface JobPostFormData {
    title: string;
    description: string;
    location: string;
    salary: string;
    jobType: string;
    skills: string[];
  }

  
export interface Job {
    _id: string;
    title: string;
    description: string;
    location: string;
    salary: string;
    jobType: string;
    skills: string[];
    createdAt: string;
  }