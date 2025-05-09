
 export interface JobPostFormData {
    title: string;
    description: string;
    location: string;
    salary: number;
    jobType: string;
    experience:number;
    vacancies:number;
    languages: string[]; 
    employmentType:string;
    benefits:string;
    industry:string;
    skills: string[];
    responsibilities:string[]
  }

  

export type Job = {
  _id: string;
  title: string;
  location: string;
  salary?: number;
  createdAt: string;
  jobType?: string;       
  employmentType?: string;
  description: string;
  industry?: string;  
  benefits?: string;
  languages: string[]; 
  skills: string[];       
  userInfo: {
    companyName: string;
    logoURL?: string;
  };
};

  export interface AllJobsType {
    _id: string;
    title: string;
    description: string;
    location: string;
    salary: number;
    jobType: string;
    skills: string[];
    createdAt: string;
    industry:string;
    userInfo: {
      companyName: string;
      email: string;
      address: string;
      website: string;
      contact: string;
      logoURL: string;
      location?: string;
    };
  }
  export interface JobDetailsType {
    _id: string;
    title: string;
    description: string;
    location: string;
    salary: number;
    jobType: string;
    benefits: string;
    industry:string;
    commission:number;
    skills: string[];
    createdAt: string;
    vacancies:string;
    languages: string[]; 
    experience:string;
    responsibilities:string[];
    userInfo: {
      reviews: Review[];
      companyName: string;
      about: string;
      location: string;
      website: string;
      mission: string;
      vision: string;
      linkedin:string
      logoURL: string;
      employers:number;
      industry:string;
      founded:number;
    };
  }

  interface Review {
    _id: string;
    reviewerId: string; 
    rating: number;
    reviewapproved: string; 
    timestamp: Date; 
  }