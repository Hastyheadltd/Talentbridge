export interface Review {
    _id?: string;
    reviewerId?: string;
    rating?: number;
    reviewapproved?: string;
    timestamp?: string;
  }
  
  export interface ExperienceItem {
    position: string;
    company: string;
    location: string;
    joinDate: string; 
    description?: string;
  }
  
 export  interface UserType {
    _id: string;
    username?: string;
    photoURL?: string;
    bio?: string;
    location?: string;
    email: string;
    phone?: string;
    linkedin?: string;
    portfolio?: string;
    resumeURL?: string;
    experience: ExperienceItem[];
    skills: string[];
    reviews?: Review[];
  }
  