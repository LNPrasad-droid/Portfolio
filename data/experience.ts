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
      "Earth-observation ML on Google Earth Engine: Sentinel-1/2 crop detection for 5 crops and Landsat-8 thermal risk monitoring for a utility-scale solar plant, with LLM-generated maintenance reports.",
    responsibilities: [
      "Built Earth Engine pipelines that turn KML field polygons into Sentinel-2 optical and Sentinel-1 SAR time-series features (cloud masking, dB conversion, spectral indices, phenology metrics)",
      "Trained per-crop detectors for cotton, rice, mango, papaya and pomegranate (Random Forest with calibration, LightGBM, XGBoost, Keras LSTM), validated with field- and region-grouped cross-validation and leakage checks",
      "Served crop detectors through FastAPI endpoints that take an uploaded KML and return per-field probabilities",
      "Modelled solar panel temperature with a NOCT/albedo approach plus ERA5 and Open-Meteo weather, with XGBoost, LightGBM and CatBoost regressors for hourly offsets",
    ],
    technologies: ["Python", "Google Earth Engine", "Sentinel-1/2", "Landsat-8", "XGBoost", "LightGBM", "CatBoost", "TensorFlow", "GeoPandas", "FastAPI", "Folium", "OpenRouter"],
    achievements: [
      "Built satellite-based thermal-risk monitoring for ~2,000 solar panel tables: Landsat-8 LST and Sentinel-2 NDVI anomalies combined into a zone-level risk index, energy-loss estimates and interactive maps",
      "Automated zone-prioritised maintenance reports with an LLM (OpenRouter) generated from plant statistics",
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
      "Built EduVerse AI, a student management system with a Flask REST API, MySQL storage, analytics dashboards and LLM-generated student performance analysis.",
    responsibilities: [
      "Built a Flask REST API with full student CRUD, search and filtering, session-based authentication and MySQL storage",
      "Built dashboards with Chart.js for grade, department and semester analytics",
    ],
    technologies: ["Python", "Flask", "MySQL", "Ollama", "JavaScript", "Chart.js"],
    achievements: [
      "Added LLM-generated student performance analysis with a local Ollama model (phi3:mini), with a rule-based fallback when the model is unavailable",
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
      "NLP and text classification: a fake-news classifier comparing classic ML models on TF-IDF features, and a BERT fine-tuning pipeline for sentiment analysis.",
    responsibilities: [
      "Built a fake-news pipeline: NLTK preprocessing, TF-IDF features, and a comparison of Naive Bayes, Logistic Regression and other classic models with accuracy, F1 and confusion matrices",
      "Implemented a BERT (bert-base-uncased) fine-tuning pipeline for sentiment classification with PyTorch and Hugging Face Transformers",
    ],
    technologies: ["Python", "scikit-learn", "NLTK", "TF-IDF", "PyTorch", "Transformers", "BERT"],
    achievements: [
      "Best fake-news model reached 0.997 test accuracy and 0.997 F1 on ~9,000 held-out articles",
    ],
  },
];
