export type Theme = 'blue' | 'green' | 'purple';
export type FontSize = 'small' | 'medium' | 'large';
export type SectionType = 'skills' | 'experience' | 'projects' | 'education' | 'summary';

export interface SkillGroup {
  id: string;
  name: string; // Category name (e.g., "Core Skills")
  content: string; // Rich text content
}

export interface ResumeData {
  profile: {
    name: string;
    title: string;
    phone: string;
    email: string;
    location?: string;
    birthDate?: string;
    github?: string;
    summary: string;
  };
  education: Array<{
    id: string;
    school: string;
    degree: string;
    date: string;
  }>;
  experience: Array<{
    id: string;
    company: string;
    title: string;
    date: string;
    location?: string;
    details: string; // Rich text
  }>;
  skills: SkillGroup[];
  projects: Array<{
    id: string;
    name: string;
    date: string; // Project duration
    summary: string; // Brief project description
    role: string;
    description: string; // Responsibilities (Rich text)
    techStack: string;
  }>;
  sectionOrder?: SectionType[];
}
