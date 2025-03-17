export interface Message {
    sender: string;
    message: string;
    fileURL?: string; 
    timestamp: Date;
    isRead:boolean;
  }
  
  export interface Conversation {
    _id: string;
    user1: string;
    user2: string;
    messages: Message[];
  }
  
  export interface User {
    _id: string;
    username?: string;
    photoURL?: string;
    role?: string;
    companyName?: string;
    logoURL?: string;
  }
  export interface Review {
    _id: string;
    reviewerId: string | undefined;
    rating: number;
    timestamp?: string;
  };
  