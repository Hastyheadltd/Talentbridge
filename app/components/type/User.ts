export interface User {
    skills: never[];
    userId: string;
    email: string;
    _id:string;
    uid:string;
    role: string;
    photoURL: string;
    name: string;
    username:string;
    currentRole :string;
    website :string;
    linkedin :string;
    location:string;
    phone:string;
    bio:string;
    resume:string;
    portfolio:string;
    resumeURL:string;
    experience : Experience [] 
  }
  export interface Experience {
    company: string;
  location: string;
  position: string;
  joinDate: string;
  description?: string;
  endDate?: string;
  current: boolean;
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