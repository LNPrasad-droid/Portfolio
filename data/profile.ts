import type { ContactLink, NavItem } from "@/types";

export const profile = {
  fullName: "Lakshmi Narasimha Prasad",
  displayName: "Leo",
  headline: "AI/ML engineer working on Earth observation, data pipelines and agentic systems.",
  tagline:
    "I build the pipelines that turn Sentinel and Landsat imagery into crop maps and solar-plant risk scores, and the APIs and agents that put those models in front of people.",
  location: "Bengaluru, India",
  availability: "B.E. AIML, 2026. Open to AI/ML engineer, data science and data engineering roles.",
  about: {
    summary:
      "B.E. in Artificial Intelligence & Machine Learning (CGPA 8.4, 2026). At MITCON I build Earth-observation ML pipelines on Google Earth Engine: Sentinel-1/2 crop detection and Landsat-8 thermal risk monitoring for solar plants, with gradient boosting, Random Forest and LSTM models.",
    goals:
      "I care about honest validation as much as model choice: spatial train/test splits, leakage checks, and saying clearly what a 30 m thermal pixel can and cannot tell you. I want to keep building geospatial and applied-AI systems that hold up outside a notebook.",
    interests:
      "Around the models I build the software: FastAPI and Flask services, RAG with LangGraph and ChromaDB, LLM reporting with OpenRouter and Ollama, and React dashboards. I also build NLP side projects, like RON, a CBT-style mental-health companion.",
  },
  resumeUrl: "/resume/leo-resume.pdf",
} as const;

export const navItems: NavItem[] = [
  { id: "home", label: "Home", href: "#home" },
  { id: "about", label: "About", href: "#about" },
  { id: "experience", label: "Experience", href: "#experience" },
  { id: "projects", label: "Projects", href: "#projects" },
  { id: "agents", label: "Agent demo", href: "#agents" },
  { id: "skills", label: "Skills", href: "#skills" },
  { id: "education", label: "Education", href: "#education" },
  { id: "contact", label: "Contact", href: "#contact" },
];

export const contactLinks: ContactLink[] = [
  {
    id: "github",
    label: "GitHub",
    value: "github.com/LNPrasad-droid",
    href: "https://github.com/LNPrasad-droid",
    icon: "Github",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    value: "linkedin.com/in/lakshmi-narsimha-prasad",
    href: "https://www.linkedin.com/in/lakshmi-narsimha-prasad-44306827b",
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
