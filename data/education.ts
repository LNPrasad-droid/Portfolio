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
    highlights: [
      "Completed with 75% aggregate score",
    ],
  },
  {
    id: "edu-sslc",
    institution: "St. John's High School",
    degree: "SSLC",
    field: "General Education",
    startDate: "2019",
    endDate: "2020",
    location: "Bengaluru, Karnataka",
    highlights: [
      "Completed with 89% aggregate score",
    ],
  },
];

export const certifications: Certification[] = [
  {
    id: "cert-aws-ml",
    name: "AWS Certified Machine Learning – Specialty",
    issuer: "Amazon Web Services",
    date: "2024",
    icon: "Cloud",
  },
  {
    id: "cert-deep-learning",
    name: "Deep Learning Specialization",
    issuer: "DeepLearning.AI",
    date: "2023",
    icon: "Brain",
  },
  {
    id: "cert-gee",
    name: "Google Earth Engine for Geospatial Analysis",
    issuer: "Google",
    date: "2023",
    icon: "Satellite",
  },
  {
    id: "cert-langchain",
    name: "Building Agentic Systems with LangGraph",
    issuer: "LangChain",
    date: "2024",
    icon: "Workflow",
  },
];
