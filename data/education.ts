import type { EducationEntry, Certification } from "@/types";

export const education: EducationEntry[] = [
  {
    id: "edu-be-aiml",
    institution: "Coorg Institute of Technology",
    degree: "Bachelor of Engineering",
    field: "Artificial Intelligence & Machine Learning",
    startDate: "2022",
    endDate: "2026",
    location: "Kodagu, Karnataka",
    highlights: [
      "Graduated with a CGPA of 8.4 / 10 in 2026",
      "Coursework includes: Machine Learning, Deep Learning, NLP, Computer Vision, AI, DSA, DBMS, Data Science, and Predictive Analytics",
    ],
  },
  {
    id: "edu-puc",
    institution: "St. Joseph's Indian Composite PU College",
    degree: "Pre-University (PCMB)",
    field: "Science",
    startDate: "2020",
    endDate: "2022",
    location: "Bengaluru, Karnataka",
    highlights: ["Completed with 75% aggregate score"],
  },
  {
    id: "edu-sslc",
    institution: "St. John's High School",
    degree: "SSLC",
    field: "General Education",
    startDate: "2019",
    endDate: "2020",
    location: "Bengaluru, Karnataka",
    highlights: ["Completed with 89% aggregate score"],
  },
];

/** Certifications exactly as listed on the resume. */
export const certifications: Certification[] = [
  {
    id: "cert-ai-certs",
    name: "AI+ Foundation™",
    issuer: "AI CERTs",
    date: "",
    icon: "BadgeCheck",
  },
  {
    id: "cert-infosys",
    name: "NLP, Machine Learning, Generative AI, Python, Java",
    issuer: "Infosys Springboard",
    date: "",
    icon: "Brain",
  },
  {
    id: "cert-genz-ml",
    name: "Machine Learning in Python",
    issuer: "Genz Educate Wing Pvt. Ltd.",
    date: "",
    icon: "Cpu",
  },
  {
    id: "cert-simplilearn-sql",
    name: "SQL for Data Science",
    issuer: "Simplilearn",
    date: "",
    icon: "Database",
  },
  {
    id: "cert-aiml",
    name: "AIML Certification – AI & Machine Learning",
    issuer: "",
    date: "",
    icon: "GraduationCap",
  },
];
