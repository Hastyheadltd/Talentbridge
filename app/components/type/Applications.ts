export interface ApplicationType {
    jobId: string;
    jobTitle: string;
    companyName: string;
    appliedAt: string;
    status:string;
  }

 export interface Experience {
    company: string;
    location: string;
    position: string;
    description: string;
    joinDate: string;
    current: boolean;
  }
  
  export interface Applicant {
    userId: string;
    jobId: string;
    status:string;
    applicantInfo: {
      username: string;
      email: string;
      location: string;
      experience: Experience[];
      skills: string[];
      linkedin: string;
      resumeURL: string;
      photoURL:string;
    };
    jobTitle: string;
    appliedAt: string;
  }