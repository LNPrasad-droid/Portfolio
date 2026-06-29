import type { ExperienceEntry } from "@/types";

export const experience: ExperienceEntry[] = [
  {
    id: "exp-mitcon",
    company: "MITCON Consultancy and Engineering Services",
    role: "AI/ML Engineer Intern – Remote Sensing & Geospatial AI",
    location: "Remote",
    startDate: "Jan 2026",
    endDate: "Present",
    summary:
      "Built ML pipelines for satellite imagery analysis, crop classification, and anomaly detection workflows using multispectral imagery, thermal datasets, and ensemble ML models.",
    responsibilities: [
      "Built ML pipelines for satellite imagery analysis using Sentinel-2 and Landsat datasets, processing 10,000+ geospatial data points for large-scale feature extraction and predictive monitoring",
      "Designed crop classification system for 6 crop types (cotton, rice, papaya, pomegranate, mango, tea) using multispectral imagery with hyperparameter-optimized ensemble ML models",
      "Applied OpenCV, TensorFlow, and PyTorch for computer vision workflows; optimized models using precision, recall, and F1-score evaluation",
    ],
    technologies: ["Python", "OpenCV", "TensorFlow", "PyTorch", "XGBoost", "LightGBM", "CatBoost", "Ollama", "Sentinel-2", "Landsat"],
    achievements: [
      "Developed solar hotspot and anomaly detection workflows using thermal imaging, reducing manual inspection effort by ~40%",
      "Integrated Generative AI report generation via Ollama for automated anomaly summaries, cutting reporting time by ~30%",
    ],
  },
  {
    id: "exp-dhee-coding-lab",
    company: "Dhee Coding Lab",
    role: "Python Full Stack GenAI Developer Intern",
    location: "Remote",
    startDate: "Oct 2025",
    endDate: "May 2026",
    summary:
      "Developed an AI-powered Student Management System with LLM-integrated chatbot, role-based access, and intelligent analytics using FastAPI backend and React frontend.",
    responsibilities: [
      "Developed an AI-powered Student Management System with LLM-integrated chatbot, role-based access, and intelligent analytics using FastAPI backend and React frontend",
      "Integrated PostgreSQL, Firebase Firestore, and Supabase for real-time data management",
      "Implemented Firebase Authentication and BaaS workflows for scalable cloud-hosted operations",
    ],
    technologies: ["Python", "FastAPI", "React", "PostgreSQL", "Firebase", "Supabase", "LLM"],
    achievements: [
      "Designed modular, production-oriented application architecture enabling AI/ML workflow extensibility and maintainability",
    ],
  },
  {
    id: "exp-genz-educate",
    company: "Genz Educate Wing",
    role: "Machine Learning Engineer Intern",
    location: "Remote",
    startDate: "Mar 2025",
    endDate: "Sep 2025",
    summary:
      "Built Sentiment Analysis and Fake News Detection pipelines using BERT transformer models and NLP preprocessing.",
    responsibilities: [
      "Developed Fake News Detection pipeline using NLP preprocessing, tokenization, and transformer-based classification; evaluated with Scikit-learn metrics",
    ],
    technologies: ["Python", "BERT", "Transformers", "NLP", "Scikit-learn"],
    achievements: [
      "Built Sentiment Analysis models using BERT transformer fine-tuning, achieving improved classification accuracy over baseline NLP approaches",
    ],
  },
];
