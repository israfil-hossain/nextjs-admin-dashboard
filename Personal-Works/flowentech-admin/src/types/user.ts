export interface User {
    username: string;
    email : string; 
    password: string;
    accessSection: string;
    role: "admin" | "operator";
    createdAt?: Date;
  }