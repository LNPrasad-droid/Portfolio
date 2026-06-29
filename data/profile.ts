import type { ContactLink, NavItem } from "@/types";

export const profile = {
  fullName: "Lakshmi Narasimha Prasad",
  displayName: "Leo",
  roles: [
    "AI Engineer",
    "Generative AI",
    "Agentic AI",
    "Geospatial AI",
    "Computer Vision",
    "Full Stack AI Developer",
  ],
  tagline:
    "I build AI systems that turn raw satellite data, language, and pixels into decisions — end to end, from model to interface.",
  about: {
    summary:
      "I'm an AI Engineer who works across the full stack of modern AI products — designing agentic systems, training and deploying computer vision models, and shipping the interfaces that make them usable. My background sits at the intersection of geospatial science and generative AI, which means I think as much about coordinate systems and sensor data as I do about prompts and embeddings.",
    goals:
      "I'm focused on building AI systems that operate autonomously in the real world — agents that can observe, reason, and act on geospatial and visual data without constant human supervision. The next phase of AI products will be judged on reliability in production, not demo quality, and that's the problem space I want to keep solving.",
    interests:
      "Outside of core engineering, I spend time on remote sensing research, contributing to open-source agentic frameworks, and exploring how multimodal models can be grounded in physical, spatial reality rather than just text.",
  },
  resumeUrl: "/resume/leo-resume.pdf",
} as const;

export const navItems: NavItem[] = [
  { id: "home", label: "Home", href: "#home" },
  { id: "about", label: "About", href: "#about" },
  { id: "experience", label: "Experience", href: "#experience" },
  { id: "projects", label: "Projects", href: "#projects" },
  { id: "skills", label: "Skills", href: "#skills" },
  { id: "education", label: "Education", href: "#education" },
  { id: "contact", label: "Contact", href: "#contact" },
];

export const contactLinks: ContactLink[] = [
  {
    id: "github",
    label: "GitHub",
    value: "github.com/leo-prasad",
    href: "https://github.com/",
    icon: "Github",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    value: "linkedin.com/in/leo-prasad",
    href: "https://linkedin.com/",
    icon: "Linkedin",
  },
  {
    id: "email",
    label: "Email",
    value: "leo913173@gmail.com",
    href: "mailto:leo913173@gmail.com",
    icon: "Mail",
  },
  {
    id: "phone",
    label: "Phone",
    value: "+91-8618959024",
    href: "tel:+918618959024",
    icon: "Phone",
  },
  {
    id: "resume",
    label: "Resume",
    value: "Download PDF",
    href: "/resume/leo-resume.pdf",
    icon: "FileDown",
  },
];
