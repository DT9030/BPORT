export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  graduationYear: string;
  gpa?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  url?: string;
  github?: string;
}

export interface UserData {
  fullName: string;
  title: string;
  email: string;
  phone: string;
  summary: string;
  buildMethod: "manual" | "resume" | null;
  experience: Experience[];
  education: Education[];
  skills: string[];
  projects: Project[];
  category?: "fresher" | "professional" | "business" | null;
  categoryAnswers?: Record<string, string>;
}

export interface ColorScheme {
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  description: string;
}
