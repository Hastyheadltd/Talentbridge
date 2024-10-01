export interface JobSeekerProfileFormData {
    bio: string;
    linkedin: string;
    portfolio: string;
    location: string;
    phone: string;
    photoURL: File | null;
    resume: File | null;
    skills: string[];
    experience: Experience[];
  }
  
 export interface Experience {
    company: string;
    location: string;
    position: string;
    joinDate: string;
    description: string;
    endDate?: string;
    current: boolean;
  }

  export interface CompanyProfileFormData {
    about: string; 
    mission: string;
    vision: string;       
    location: string;
    website: string;  
    logoURL?: string; 
    companyName:string;
    linkedin: string;
  }
  
  export interface CompanyProfileData {
    companyName: string;
    logoURL: string;
    about: string;
    mission: string;
    vision: string;
    location: string;
    website: string;
    linkedin: string;
  }