 export interface JobPostFormData {
    title: string;
    description: string;
    location: string;
    salary: string;
    jobType: string;
    experience:number;
    vacancies:number;
    skills: string[];
    responsibilities:string[]
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