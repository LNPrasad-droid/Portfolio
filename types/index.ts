// -------------------------------------------------------------------------
// Core content types for Leo's Portfolio
// Keeping these centralized lets data/*.ts stay the single source of truth
// for content, while components remain purely presentational.
// -------------------------------------------------------------------------

export type SkillCategory =
  | "Programming Languages"
  | "Geospatial & Remote Sensing"
  | "AI & Machine Learning"
  | "Generative AI"
  | "Frameworks"
  | "Databases"
  | "Cloud"
  | "Developer Tools";

export interface SkillUsage {
  /** Project slug or internship name where this skill was applied */
  context: string;
  /** Short description of how it was used */
  detail: string;
}

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  /** 1 (familiar) - 5 (expert), used only for subtle visual weighting — never shown as a bar */
  proficiency: 1 | 2 | 3 | 4 | 5;
  usages: SkillUsage[];
}

export interface ExperienceEntry {
  id: string;
  company: string;
  role: string;
  location: string;
  startDate: string; // e.g. "Jan 2023"
  endDate: string; // e.g. "Present"
  summary: string;
  responsibilities: string[];
  technologies: string[];
  achievements: string[];
}

export interface EducationEntry {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  location: string;
  highlights: string[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
  icon: string; // lucide-react icon name
}

export interface ArchitectureStage {
  id: string;
  label: string;
  description: string;
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  caption?: string;
}

export interface ProjectCaseStudy {
  overview: string;
  problemStatement: string;
  solution: string;
  architecture: ArchitectureStage[];
  techStack: string[];
  keyFeatures: string[];
  challenges: string[];
  results: string[];
  lessonsLearned: string[];
  gallery: GalleryImage[];
}

export type Band = "vegetation" | "thermal" | "radar" | "language";

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: string;
  summary: string;
  thumbnail: string;
  technologies: string[];
  caseStudy: ProjectCaseStudy;
  featured?: boolean;
  /** Sensor "false-colour" band that tags the project's data type */
  band: Band;
  /** Short data-source line, e.g. "Sentinel-1 SAR, Sentinel-2 MSI" */
  data: string;
  /** Where the work was done, e.g. "MITCON internship" or "Personal project" */
  context?: string;
  /** Public repository URL, when the code can be shared */
  codeUrl?: string;
  /** Shown instead of a code link when the code is private (e.g. client data) */
  codeNote?: string;
}

export interface ContactLink {
  id: string;
  label: string;
  value: string;
  href: string;
  icon: string; // lucide-react icon name
}

export interface NavItem {
  id: string;
  label: string;
  href: string;
}
