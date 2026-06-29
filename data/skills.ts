import type { Skill } from "@/types";

export const skills: Skill[] = [
  // Programming Languages
  {
    id: "python",
    name: "Python",
    category: "Programming Languages",
    proficiency: 5,
    usages: [
      { context: "RON AI", detail: "Core agent orchestration and model-serving logic." },
      { context: "Solar Hotspot Detection", detail: "Image processing pipeline and CV model training." },
    ],
  },
  {
    id: "typescript",
    name: "TypeScript",
    category: "Programming Languages",
    proficiency: 5,
    usages: [
      { context: "RON AI", detail: "Frontend application and API layer for the platform dashboard." },
    ],
  },
  {
    id: "javascript",
    name: "JavaScript",
    category: "Programming Languages",
    proficiency: 4,
    usages: [{ context: "This Portfolio", detail: "Client-side interactivity and animation logic." }],
  },
  {
    id: "cpp",
    name: "C++",
    category: "Programming Languages",
    proficiency: 3,
    usages: [{ context: "Remote Sensing Research", detail: "Performance-critical raster processing routines." }],
  },
  {
    id: "sql",
    name: "SQL",
    category: "Programming Languages",
    proficiency: 4,
    usages: [{ context: "Geospatial Crop Classification", detail: "Spatial queries over PostGIS-backed datasets." }],
  },

  // AI & Machine Learning
  {
    id: "pytorch",
    name: "PyTorch",
    category: "AI & Machine Learning",
    proficiency: 5,
    usages: [
      { context: "Solar Hotspot Detection", detail: "Trained CNN-based anomaly detectors on thermal imagery." },
      { context: "Geospatial Crop Classification", detail: "Built segmentation models over multispectral tiles." },
    ],
  },
  {
    id: "tensorflow",
    name: "TensorFlow",
    category: "AI & Machine Learning",
    proficiency: 4,
    usages: [{ context: "Geospatial Crop Classification", detail: "Early model prototyping before migrating to PyTorch." }],
  },
  {
    id: "scikit-learn",
    name: "scikit-learn",
    category: "AI & Machine Learning",
    proficiency: 4,
    usages: [{ context: "Solar Hotspot Detection", detail: "Baseline classical models and feature engineering." }],
  },
  {
    id: "computer-vision",
    name: "Computer Vision",
    category: "AI & Machine Learning",
    proficiency: 5,
    usages: [
      { context: "Solar Hotspot Detection", detail: "Defect and hotspot detection from drone-captured thermal images." },
    ],
  },
  {
    id: "remote-sensing",
    name: "Remote Sensing",
    category: "AI & Machine Learning",
    proficiency: 5,
    usages: [
      { context: "Geospatial Crop Classification", detail: "Multispectral and SAR imagery analysis pipelines." },
      { context: "Agentic Remote Sensing Platform", detail: "Automated satellite tasking and change detection." },
    ],
  },

  // Generative AI
  {
    id: "llm-orchestration",
    name: "LLM Orchestration",
    category: "Generative AI",
    proficiency: 5,
    usages: [{ context: "RON AI", detail: "Multi-agent task planning and tool-calling orchestration." }],
  },
  {
    id: "rag",
    name: "RAG Systems",
    category: "Generative AI",
    proficiency: 4,
    usages: [{ context: "RON AI", detail: "Retrieval-augmented grounding over internal knowledge bases." }],
  },
  {
    id: "langgraph",
    name: "LangGraph",
    category: "Generative AI",
    proficiency: 4,
    usages: [{ context: "Agentic Remote Sensing Platform", detail: "Stateful agent graphs for multi-step automation." }],
  },
  {
    id: "prompt-engineering",
    name: "Prompt Engineering",
    category: "Generative AI",
    proficiency: 5,
    usages: [{ context: "RON AI", detail: "Structured prompting and evaluation harnesses for agent reliability." }],
  },

  // Frameworks
  {
    id: "nextjs",
    name: "Next.js",
    category: "Frameworks",
    proficiency: 5,
    usages: [{ context: "RON AI", detail: "Full-stack application framework for the platform UI." }],
  },
  {
    id: "react",
    name: "React",
    category: "Frameworks",
    proficiency: 5,
    usages: [{ context: "This Portfolio", detail: "Component architecture for all interactive UI." }],
  },
  {
    id: "fastapi",
    name: "FastAPI",
    category: "Frameworks",
    proficiency: 5,
    usages: [{ context: "RON AI", detail: "Backend services for agent orchestration and model inference." }],
  },
  {
    id: "django",
    name: "Django",
    category: "Frameworks",
    proficiency: 3,
    usages: [{ context: "Internship Project", detail: "Internal tooling for dataset annotation workflows." }],
  },

  // Databases
  {
    id: "postgresql",
    name: "PostgreSQL",
    category: "Databases",
    proficiency: 4,
    usages: [{ context: "Geospatial Crop Classification", detail: "PostGIS extensions for spatial data storage." }],
  },
  {
    id: "mongodb",
    name: "MongoDB",
    category: "Databases",
    proficiency: 3,
    usages: [{ context: "RON AI", detail: "Document storage for agent session state." }],
  },
  {
    id: "vector-db",
    name: "Vector Databases",
    category: "Databases",
    proficiency: 4,
    usages: [{ context: "RON AI", detail: "Embedding storage and similarity search for retrieval." }],
  },
  {
    id: "redis",
    name: "Redis",
    category: "Databases",
    proficiency: 3,
    usages: [{ context: "RON AI", detail: "Caching and job queues for async agent tasks." }],
  },

  // Cloud
  {
    id: "aws",
    name: "AWS",
    category: "Cloud",
    proficiency: 4,
    usages: [{ context: "Agentic Remote Sensing Platform", detail: "S3, Lambda, and EC2 for pipeline infrastructure." }],
  },
  {
    id: "gcp",
    name: "Google Cloud",
    category: "Cloud",
    proficiency: 3,
    usages: [{ context: "Geospatial Crop Classification", detail: "Earth Engine integration for satellite data access." }],
  },
  {
    id: "vercel",
    name: "Vercel",
    category: "Cloud",
    proficiency: 4,
    usages: [{ context: "This Portfolio", detail: "Deployment and edge hosting." }],
  },
  {
    id: "docker",
    name: "Docker",
    category: "Cloud",
    proficiency: 4,
    usages: [{ context: "RON AI", detail: "Containerized services for consistent deployment." }],
  },

  // Developer Tools
  {
    id: "git",
    name: "Git",
    category: "Developer Tools",
    proficiency: 5,
    usages: [{ context: "All Projects", detail: "Version control and collaborative workflows." }],
  },
  {
    id: "qgis",
    name: "QGIS",
    category: "Developer Tools",
    proficiency: 4,
    usages: [{ context: "Geospatial Crop Classification", detail: "Spatial data visualization and validation." }],
  },
  {
    id: "figma",
    name: "Figma",
    category: "Developer Tools",
    proficiency: 3,
    usages: [{ context: "RON AI", detail: "Interface prototyping before implementation." }],
  },
];
