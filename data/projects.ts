import type { Project } from "@/types";

/**
 * Every claim below is backed by code in the linked repository (or, for private
 * work, in the private repository). Galleries stay empty until real screenshots
 * are added to /public/images/projects/<slug>/; the gallery section is hidden
 * while empty. Add measured results only once they can be reproduced.
 */

export const projects: Project[] = [
  {
    id: "crop-detection",
    band: "vegetation",
    data: "Sentinel-1 SAR, Sentinel-2 MSI, KML field boundaries",
    slug: "geospatial-crop-detection",
    title: "Geospatial Crop Detection",
    category: "Earth Observation · Machine Learning",
    context: "MITCON internship",
    summary:
      "Per-crop detectors that decide whether a farm polygon grows cotton, rice, mango, papaya or pomegranate, using Sentinel-1 radar and Sentinel-2 optical time series from Google Earth Engine.",
    thumbnail: "/images/projects/crop-classification/thumbnail.svg",
    technologies: ["Google Earth Engine", "Sentinel-1/2", "XGBoost", "LightGBM", "TensorFlow", "FastAPI"],
    featured: true,
    codeUrl: "https://github.com/LNPrasad-droid/cropdetection",
    caseStudy: {
      overview:
        "Five binary crop detectors (crop vs. not-crop) built on multi-temporal satellite features. A user uploads a KML of field boundaries and gets a probability and confidence label for each field.",
      problemStatement:
        "Knowing which crop is growing in which field normally means ground surveys. Optical imagery alone struggles with clouds during the monsoon, and crops look alike on a single date. A detector needs the season's time series and radar data that sees through clouds.",
      solution:
        "Field polygons from KML are sent to Google Earth Engine, which builds cloud-masked Sentinel-2 composites and Sentinel-1 SAR backscatter (converted to dB, speckle-filtered) over monthly windows. Per-field statistics become spectral-index and phenology features, and a separate model is trained per crop.",
      architecture: [
        { id: "a1", label: "KML field polygons", description: "Labelled crop and non-crop fields, parsed into GeoPandas geometries." },
        { id: "a2", label: "Google Earth Engine", description: "Sentinel-2 SR (cloud-masked) and Sentinel-1 GRD (VV/VH, dB) composites per time window." },
        { id: "a3", label: "Feature engineering", description: "NDVI, EVI, NDWI, SAVI and SAR ratios; phenology metrics (slope, peaks, area under curve); GLCM texture." },
        { id: "a4", label: "Per-crop models", description: "Random Forest + calibration (cotton, rice), LightGBM (mango), XGBoost (papaya, pomegranate), Keras LSTM on NDVI sequences (pomegranate)." },
        { id: "a5", label: "Spatial validation", description: "GroupKFold / GroupShuffleSplit by KML file or region, plus explicit leakage checks." },
        { id: "a6", label: "FastAPI inference", description: "Upload a KML, get per-field probability, confidence label and saved prediction files." },
      ],
      techStack: ["Python", "Google Earth Engine", "Sentinel-2", "Sentinel-1 SAR", "GeoPandas", "Shapely", "scikit-learn", "XGBoost", "LightGBM", "TensorFlow / Keras", "Segment Anything", "FastAPI"],
      keyFeatures: [
        "Optical + radar fusion so cloudy months still contribute data",
        "Phenology features that describe how a crop greens up and senesces over the season",
        "Optional Segment Anything (SAM) field segmentation for cotton",
        "Negative-sample generation and self-training to reduce false positives",
        "One FastAPI service per crop with KML upload",
      ],
      challenges: [
        "Neighbouring pixels from the same field leak between train and test sets if you split randomly, so splits are grouped by field file and region",
        "Cloud gaps in Sentinel-2 needed fallbacks and SAR features to keep every field's time series usable",
        "Very different crop calendars (orchards vs. seasonal crops) needed crop-specific time windows",
      ],
      results: [
        "Five working crop detectors with FastAPI inference",
        "Spatially grouped validation and leakage checks built into training",
      ],
      lessonsLearned: [
        "How you split the data matters as much as which model you choose",
        "Radar is what makes monsoon-season crop mapping reliable",
      ],
      gallery: [],
    },
  },
  {
    id: "solar-thermal-risk",
    band: "thermal",
    data: "Landsat-8 TIRS (LST), Sentinel-2 NDVI, ERA5 / Open-Meteo weather",
    slug: "solar-thermal-risk-monitoring",
    title: "Solar Plant Thermal-Risk Monitoring",
    category: "Earth Observation · Energy",
    context: "MITCON internship",
    codeNote: "Code is private: it contains client plant data.",
    summary:
      "Satellite-based thermal risk screening for ~2,000 solar panel tables: Landsat-8 surface temperature and Sentinel-2 NDVI anomalies, a zone-level risk index, energy-loss estimates and an LLM-written maintenance report.",
    thumbnail: "/images/projects/solar-hotspot/thumbnail.svg",
    technologies: ["Google Earth Engine", "Landsat-8 LST", "XGBoost", "CatBoost", "Folium", "OpenRouter"],
    featured: true,
    caseStudy: {
      overview:
        "A pipeline that screens a utility-scale solar plant from space, ranks zones by thermal risk, estimates energy loss, and drafts a maintenance plan, so drone and field crews know where to inspect first.",
      problemStatement:
        "Inspecting every table of a large plant on foot or by drone is slow. Free satellite data can't see individual cells, but it can flag zones that run hotter than their own history and deserve a closer look.",
      solution:
        "Panel-table polygons are sent to Google Earth Engine for Landsat-8 surface temperature and Sentinel-2 NDVI composites. Each table gets a thermal anomaly against its own baseline and a plant-wide z-score, combined into a weighted risk index that is aggregated by zone. A physics-informed temperature model and boosting regressors add hourly context, and an LLM turns the statistics into a maintenance brief.",
      architecture: [
        { id: "a1", label: "Panel-table KMLs", description: "About 2,000 table polygons grouped into spatial zones." },
        { id: "a2", label: "Google Earth Engine", description: "Landsat-8 ST_B10 → land surface temperature; Sentinel-2 NDVI; 30-day composites per table." },
        { id: "a3", label: "Anomaly features", description: "Per-table temperature baseline and anomaly, plant-wide z-score, NDVI change." },
        { id: "a4", label: "Temperature modelling", description: "NOCT/albedo cell-temperature model with ERA5 / Open-Meteo weather; XGBoost, LightGBM and CatBoost regressors." },
        { id: "a5", label: "Risk index", description: "Weighted thermal, vegetation and health components, aggregated by zone; energy-loss estimate per table." },
        { id: "a6", label: "Maps & LLM report", description: "Interactive Folium zone maps, KPI charts and an OpenRouter-generated maintenance report." },
      ],
      techStack: ["Python", "Google Earth Engine", "Landsat-8", "Sentinel-2", "GeoPandas", "scikit-learn", "XGBoost", "LightGBM", "CatBoost", "xarray / ERA5", "MySQL", "Folium", "Matplotlib", "OpenRouter"],
      keyFeatures: [
        "Zone-level thermal risk index combining temperature, vegetation and health signals",
        "Physics-informed panel temperature with weather data",
        "Energy-loss estimates per table and per zone",
        "Interactive zone and hotspot maps",
        "LLM-generated, zone-prioritised maintenance recommendations",
      ],
      challenges: [
        "Landsat thermal pixels are 30 m while a panel table is a few metres wide, so the output is honest zone- and table-level screening rather than cell-level defect detection",
        "LLM reports must be checked against the source statistics before they reach a client",
      ],
      results: [
        "About 2,000 panel tables screened and grouped into zones for prioritised inspection",
        "End-to-end pipeline from satellite data to maps and a written maintenance plan",
      ],
      lessonsLearned: [
        "Know the resolution limits of your sensor and say them up front",
        "Satellite screening works best as a way to point drones and crews at the right zones",
      ],
      gallery: [],
    },
  },
  {
    id: "agentic-geoai",
    band: "radar",
    data: "Sentinel-2, Landsat 8/9, user AOIs, reference documents",
    slug: "agentic-geoai-platform",
    title: "Agentic GeoAI Platform",
    category: "Agentic AI · Earth Observation",
    context: "Personal project",
    codeUrl: "https://github.com/LNPrasad-droid/ai_report",
    summary:
      "Ask a question about an area of interest and a planner routes it through satellite, GIS, ML, retrieval and report agents, with every step traced and shown on a dashboard.",
    thumbnail: "/images/projects/agentic-remote-sensing/thumbnail.svg",
    technologies: ["FastAPI", "MongoDB", "ChromaDB", "Google Earth Engine", "Ollama", "React"],
    featured: true,
    caseStudy: {
      overview:
        "A full-stack platform where specialist agents handle each part of an Earth-observation question, from finding imagery to writing the report, and the user can watch the execution timeline.",
      problemStatement:
        "Answering 'is the vegetation in this area healthy?' takes several tools: imagery search, index calculation, a model, background documents and a written summary. Stitching them together by hand is slow and hard to trace.",
      solution:
        "A planner maps the question to an intent and a list of agents. An orchestrator runs them in order on a shared context, keeps going when one fails, and records a trace of each step with timing. The React dashboard shows jobs, maps and the execution timeline.",
      architecture: [
        { id: "a1", label: "Planner", description: "Maps the query to an intent (analyse area, detect anomalies, explain, report) and picks agents. Rule-based today, built behind an interface so an LLM planner can replace it." },
        { id: "a2", label: "Orchestrator", description: "Runs agents in sequence on a shared context, degrades gracefully on failure, records an execution trace." },
        { id: "a3", label: "Satellite & GIS agents", description: "Earth Engine search (Sentinel-2, Landsat 8/9), cloud masking, NDVI/NDWI/NDMI/SAVI/EVI/NDBI, zonal statistics." },
        { id: "a4", label: "ML & Retrieval agents", description: "Registered crop models with confidence and feature importance; RAG with sentence-transformers and ChromaDB." },
        { id: "a5", label: "Report agent", description: "Prompt templates and a local LLM through Ollama." },
        { id: "a6", label: "React dashboard", description: "AOI upload, Leaflet map preview, jobs, execution timeline, monitoring charts, Firebase login." },
      ],
      techStack: ["FastAPI", "Pydantic", "MongoDB (Motor)", "ChromaDB", "sentence-transformers", "Google Earth Engine", "Ollama", "Firebase Auth", "React", "Vite", "Leaflet", "Recharts", "pytest"],
      keyFeatures: [
        "Planner → orchestrator → specialist agents with a per-step execution trace",
        "Satellite search and spectral indices through Google Earth Engine",
        "Document retrieval with embeddings and ChromaDB",
        "LLM-written reports",
        "Dashboard with map, job timeline and monitoring charts",
      ],
      challenges: [
        "Keeping each agent independent so one failure doesn't stop the whole job",
        "Making the execution visible to the user without dumping raw logs",
      ],
      results: [
        "Layered FastAPI backend with versioned routers, auth and monitoring middleware",
        "25 pytest tests across agents and services",
      ],
      lessonsLearned: [
        "Traceability is what makes a multi-step AI system debuggable",
        "Design the planner behind an interface so it can grow from rules to an LLM",
      ],
      gallery: [],
    },
  },
  {
    id: "ron",
    band: "language",
    data: "Chat messages, diary entries, mood logs",
    slug: "ron-mental-health-companion",
    title: "RON: AI Mental-Health Companion",
    category: "Applied NLP · Generative AI",
    context: "Personal project",
    codeNote: "Code not public yet.",
    summary:
      "A CBT-style support chatbot that pairs an LLM with layered sentiment analysis, crisis-keyword safety escalation, a diary and a mood tracker.",
    thumbnail: "/images/projects/ron-ai/thumbnail.svg",
    technologies: ["Flask", "OpenRouter", "DistilBERT", "XLM-RoBERTa", "NLTK VADER", "SQLite"],
    featured: true,
    caseStudy: {
      overview:
        "RON is a web companion that listens, reads the emotional tone of each message, suggests CBT techniques, and escalates to helpline resources when a message signals crisis.",
      problemStatement:
        "A plain chatbot answers words, not feelings. A support tool needs to track mood over time, notice sarcasm and other languages, and never miss a crisis signal.",
      solution:
        "Each message goes through a layered sentiment pipeline (VADER and TextBlob, then DistilBERT and a multilingual XLM-RoBERTa model, plus a sarcasm detector). The result picks an emotion level and CBT technique for the LLM prompt. Crisis keywords bypass everything and return helpline resources.",
      architecture: [
        { id: "a1", label: "User", description: "Types or speaks (browser Web Speech API) in the chat." },
        { id: "a2", label: "Flask app", description: "Login, chat, diary and mood APIs; SQLite through Flask-SQLAlchemy." },
        { id: "a3", label: "Sentiment pipeline", description: "VADER + TextBlob baseline; DistilBERT SST-2; XLM-RoBERTa multilingual; spaCy-based sarcasm detection." },
        { id: "a4", label: "Safety layer", description: "Regex crisis detection that returns helpline resources and logs the event." },
        { id: "a5", label: "LLM", description: "OpenRouter chat completion with a CBT system prompt and the detected emotion." },
        { id: "a6", label: "Mood insights", description: "Diary, mood tracker with time-weighted trends, personalised responses and a report page." },
      ],
      techStack: ["Python", "Flask", "Flask-SQLAlchemy", "SQLite", "OpenRouter", "Hugging Face Transformers", "NLTK VADER", "TextBlob", "spaCy", "JavaScript"],
      keyFeatures: [
        "Five emotion levels from Joyful to Critical",
        "Crisis-keyword escalation with helpline resources",
        "Diary and mood tracker with time-weighted trends",
        "Multilingual sentiment and sarcasm detection",
        "Voice input in the browser",
      ],
      challenges: [
        "Balancing a warm, natural tone with strict safety behaviour",
        "Sarcasm and mixed languages break simple sentiment scores",
      ],
      results: [
        "Working web app with chat, diary, mood tracking and reports",
        "Test scripts for features, ML improvements and the report API",
      ],
      lessonsLearned: [
        "Safety rules belong outside the LLM, where they can't be talked around",
        "Layering cheap and heavy sentiment models keeps responses fast",
      ],
      gallery: [],
    },
  },
  {
    id: "langgraph-rag",
    band: "language",
    data: "PDF, DOCX and TXT documents",
    slug: "langgraph-document-rag",
    title: "Document RAG with LangGraph",
    category: "Generative AI · RAG",
    context: "Personal project",
    codeUrl: "https://github.com/LNPrasad-droid/rag",
    summary:
      "Upload PDF, DOCX or text files and ask questions; answers cite the exact file and page.",
    thumbnail: "/images/projects/langgraph-rag/thumbnail.svg",
    technologies: ["LangChain", "LangGraph", "ChromaDB", "Hugging Face", "OpenRouter", "FastAPI"],
    caseStudy: {
      overview:
        "A small, clean retrieval-augmented generation service with a LangGraph state machine, a persistent Chroma store and source citations.",
      problemStatement:
        "LLMs answer confidently from memory. For questions about your own documents you need answers grounded in the text, with a citation you can check.",
      solution:
        "Documents are chunked with metadata, embedded with MiniLM and stored in Chroma. A LangGraph graph retrieves the top chunks, then generates an answer with a strict 'context only' prompt and returns the unique file/page sources.",
      architecture: [
        { id: "a1", label: "Upload", description: "FastAPI /upload accepts PDF, DOCX and TXT." },
        { id: "a2", label: "Ingestion", description: "LangChain loaders → recursive chunking (500/50) with file and page metadata." },
        { id: "a3", label: "Embeddings", description: "Hugging Face all-MiniLM-L6-v2." },
        { id: "a4", label: "Vector store", description: "Persistent ChromaDB." },
        { id: "a5", label: "LangGraph", description: "retrieve (k=4) → generate, with an LRU cache for repeated questions." },
        { id: "a6", label: "Answer", description: "FastAPI /ask returns the answer plus file and page citations." },
      ],
      techStack: ["Python", "FastAPI", "LangChain", "LangGraph", "ChromaDB", "Hugging Face embeddings", "OpenRouter"],
      keyFeatures: [
        "Page-level source citations",
        "LangGraph state machine for the RAG flow",
        "Bounded LRU cache for repeated questions",
        "Configurable model and chunking through environment variables",
      ],
      challenges: ["Keeping citations exact through chunking", "Refusing to answer when the context doesn't contain the answer"],
      results: ["Working /upload and /ask API with cited answers"],
      lessonsLearned: ["Small, explicit graphs are easier to test and extend than one big chain"],
      gallery: [],
    },
  },
];
