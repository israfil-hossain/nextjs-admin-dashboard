export interface Portfolio {
    title: string;
    description : string; 
    url: string;
    cover_img: string;
    category: "web" | "mobile" | "nocode";
    createdAt?: Date;
    updatedAt?:Date;
  }