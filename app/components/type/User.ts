export interface User {
    skills: never[];
    userId: string;
    email: string;
    _id:string;
    role: string;
    photoURL: string;
    name: string;
    username:string;
    company_name:string;
    desiredRole:string;
    desiredSalary:string;
    currentRole :string;
    website :string;
    linkedin :string;
    achievements:string;
    bio:string;
    experiences: Experience[] 
  }
  export interface Experience {
    company: string;
    location: string;
    description: string;
    position: string;
    skills: string[];
    joinDate: string;
    endDate: string | null;
    isCurrentJob: boolean;
  }
  
  export interface FormData {
    name: string;
    bio: string;
    experiences: Experience[];
    desiredRole: string;
    desiredSalary: string;
    currentRole: string;
    website: string;
    linkedin: string;
    achievements: string;
    resume: File | null;
    profileImage: File | null;
  }