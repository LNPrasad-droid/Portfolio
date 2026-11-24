import type { Skill } from "@/types";

/**
 * Only skills with evidence in code (GitHub repos or local projects).
 * `proficiency` is kept for the type but is not shown anywhere.
 */
const s = (
  id: string,
  name: string,
  category: Skill["category"],
  usages: Skill["usages"],
): Skill => ({ id, name, category, proficiency: 3, usages });

export const skills: Skill[] = [
  // Programming Languages
  s("python", "Python", "Programming Languages", [
    { context: "Crop Detection & Solar Monitoring", detail: "Earth Engine pipelines, feature engineering and model training." },
    { context: "RON, EduVerse, RAG", detail: "Flask and FastAPI backends." },
  ]),
  s("sql", "SQL", "Programming Languages", [
    { context: "EduVerse (Dhee Coding Lab)", detail: "MySQL schema and queries for student records." },
  ]),
  s("typescript", "TypeScript", "Programming Languages", [
    { context: "Agentic GeoAI Platform", detail: "React dashboard with typed API services." },
    { context: "This portfolio", detail: "Next.js components and typed content." },
  ]),
  s("javascript", "JavaScript", "Programming Languages", [
    { context: "RON, EduVerse", detail: "Chat UI, voice input and Chart.js dashboards." },
  ]),

  // Geospatial & Remote Sensing
  s("gee", "Google Earth Engine", "Geospatial & Remote Sensing", [
    { context: "Crop Detection", detail: "Sentinel-1/2 composites and per-field statistics." },
    { context: "Solar Monitoring", detail: "Landsat-8 LST and Sentinel-2 NDVI per panel table." },
  ]),
  s("sentinel", "Sentinel-1 SAR / Sentinel-2", "Geospatial & Remote Sensing", [
    { context: "Crop Detection", detail: "Cloud-masked optical plus dB-converted radar backscatter." },
  ]),
  s("landsat", "Landsat-8/9 thermal", "Geospatial & Remote Sensing", [
    { context: "Solar Monitoring", detail: "ST_B10 converted to land surface temperature." },
  ]),
  s("indices", "Spectral indices & phenology", "Geospatial & Remote Sensing", [
    { context: "Crop Detection", detail: "NDVI, EVI, NDWI, SAVI time series; slope, peaks, area under curve." },
  ]),
  s("geopandas", "GeoPandas / Shapely", "Geospatial & Remote Sensing", [
    { context: "Crop Detection", detail: "KML parsing, polygon handling and Earth Engine conversion." },
  ]),
  s("maps", "Folium / Leaflet", "Geospatial & Remote Sensing", [
    { context: "Solar Monitoring", detail: "Interactive zone and hotspot maps." },
    { context: "Agentic GeoAI Platform", detail: "AOI map preview in the dashboard." },
  ]),

  // AI & Machine Learning
  s("sklearn", "scikit-learn", "AI & Machine Learning", [
    { context: "Crop Detection", detail: "Random Forest, calibration and grouped cross-validation." },
    { context: "Genz Educate", detail: "TF-IDF with Naive Bayes and Logistic Regression." },
  ]),
  s("boosting", "XGBoost / LightGBM / CatBoost", "AI & Machine Learning", [
    { context: "Crop Detection", detail: "LightGBM and XGBoost crop detectors." },
    { context: "Solar Monitoring", detail: "Boosting regressors for hourly panel temperature." },
  ]),
  s("tensorflow", "TensorFlow / Keras", "AI & Machine Learning", [
    { context: "Crop Detection", detail: "LSTM on monthly NDVI sequences." },
  ]),
  s("transformers", "Hugging Face Transformers", "AI & Machine Learning", [
    { context: "RON", detail: "DistilBERT and XLM-RoBERTa sentiment." },
    { context: "Genz Educate", detail: "BERT fine-tuning pipeline with PyTorch." },
  ]),
  s("nlp", "NLTK / spaCy / TextBlob", "AI & Machine Learning", [
    { context: "RON", detail: "VADER sentiment and sarcasm detection." },
    { context: "Genz Educate", detail: "Text preprocessing for fake-news detection." },
  ]),

  // Generative AI
  s("langgraph", "LangChain / LangGraph", "Generative AI", [
    { context: "Document RAG", detail: "Retrieve → generate state graph with citations." },
  ]),
  s("rag", "RAG & vector search", "Generative AI", [
    { context: "Document RAG", detail: "MiniLM embeddings in ChromaDB." },
    { context: "Agentic GeoAI Platform", detail: "Retrieval agent with sentence-transformers." },
  ]),
  s("llm-apis", "OpenRouter / Ollama", "Generative AI", [
    { context: "Solar Monitoring", detail: "LLM-written maintenance reports." },
    { context: "RON, EduVerse", detail: "CBT chat replies; student analysis with phi3:mini." },
  ]),

  // Frameworks
  s("fastapi", "FastAPI", "Frameworks", [
    { context: "Agentic GeoAI Platform", detail: "Versioned routers, auth and monitoring middleware." },
    { context: "Crop Detection, RAG", detail: "Inference and Q&A endpoints." },
  ]),
  s("flask", "Flask", "Frameworks", [
    { context: "RON, EduVerse", detail: "Full web apps with REST APIs and sessions." },
  ]),
  s("react", "React / Next.js", "Frameworks", [
    { context: "Agentic GeoAI Platform", detail: "Dashboard with React Query, Leaflet and Recharts." },
    { context: "This portfolio", detail: "Next.js, Tailwind and three.js." },
  ]),

  // Databases
  s("mysql", "MySQL", "Databases", [
    { context: "EduVerse, Solar Monitoring", detail: "Student records; hourly model outputs." },
  ]),
  s("mongodb", "MongoDB", "Databases", [
    { context: "Agentic GeoAI Platform", detail: "Async Motor driver for jobs, traces and models." },
  ]),
  s("chromadb", "ChromaDB", "Databases", [
    { context: "Document RAG, Agentic GeoAI", detail: "Persistent vector store." },
  ]),
  s("sqlite-supabase", "SQLite / Supabase / Firebase Auth", "Databases", [
    { context: "RON", detail: "SQLite through Flask-SQLAlchemy." },
    { context: "Tracker01 (personal)", detail: "Supabase auth and data in a Next.js app." },
    { context: "Agentic GeoAI Platform", detail: "Firebase token authentication." },
  ]),

  // Cloud / hosting
  s("hosting", "Netlify / Vercel / Render", "Cloud", [
    { context: "This portfolio and side projects", detail: "Static and serverless deployments." },
  ]),

  // Developer Tools
  s("git", "Git & GitHub", "Developer Tools", [
    { context: "All projects", detail: "Version control." },
  ]),
  s("pytest", "pytest", "Developer Tools", [
    { context: "Agentic GeoAI Platform", detail: "25 tests across agents and services." },
  ]),
  s("jupyter", "Jupyter / Colab", "Developer Tools", [
    { context: "Genz Educate", detail: "Model experiments and evaluation notebooks." },
  ]),
];
