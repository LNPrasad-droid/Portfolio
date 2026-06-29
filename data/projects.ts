import type { Project } from "@/types";

/**
 * Placeholder thumbnails/gallery images.
 * These use a consistent dimension and naming scheme so real screenshots
 * can be dropped into /public/images/projects/<slug>/ later without
 * touching any component or layout code — only these paths need updating.
 */

export const projects: Project[] = [
  {
    id: "ron-ai",
    slug: "ron-ai",
    title: "RON AI",
    category: "Agentic AI Platform",
    summary:
      "A multi-agent automation platform that lets users describe a goal in natural language and have a team of AI agents plan, execute, and report back — with full visibility into every step.",
    thumbnail: "/images/projects/ron-ai/thumbnail.svg",
    technologies: ["Next.js", "TypeScript", "FastAPI", "LangGraph", "Vector DB", "Docker"],
    featured: true,
    caseStudy: {
      overview:
        "RON AI is an agentic automation platform built for teams that need AI to do multi-step work — not just answer questions. Users describe a goal, and a coordinated set of agents breaks it into tasks, calls the right tools, and surfaces a transparent execution trace.",
      problemStatement:
        "Most AI tools are single-turn: ask a question, get an answer. Real operational work requires planning, tool use, error recovery, and accountability — none of which a simple chat interface provides. Teams needed a way to delegate multi-step tasks to AI without losing visibility or control over what the agents were actually doing.",
      solution:
        "I designed an orchestration layer where a planner agent decomposes a goal into a task graph, specialist agents execute each node using scoped tools, and a supervisor monitors progress and handles retries. Every step is streamed to the UI in real time, so users see exactly what the system is doing and can intervene if needed.",
      architecture: [
        { id: "a1", label: "User", description: "Describes a goal in natural language through the platform UI." },
        { id: "a2", label: "Frontend", description: "Next.js app streams the live agent execution graph and task state." },
        { id: "a3", label: "Backend", description: "FastAPI service manages sessions, auth, and task queueing." },
        { id: "a4", label: "AI Layer", description: "LangGraph-based planner and specialist agents execute the task graph." },
        { id: "a5", label: "Database", description: "Vector store and document DB persist context, memory, and results." },
        { id: "a6", label: "Response", description: "Structured output and execution trace returned to the user in real time." },
      ],
      techStack: ["Next.js", "TypeScript", "Tailwind CSS", "FastAPI", "LangGraph", "PostgreSQL", "Vector DB", "Redis", "Docker"],
      keyFeatures: [
        "Real-time visualization of agent task graphs as they execute",
        "Tool-calling framework with scoped permissions per agent role",
        "Automatic retry and error-recovery logic for failed tool calls",
        "Retrieval-augmented grounding for domain-specific knowledge",
        "Full audit trail of every agent decision and tool invocation",
      ],
      challenges: [
        "Keeping agent execution transparent without overwhelming users with raw logs",
        "Designing tool-call validation that catches failures before they cascade across a multi-step plan",
        "Balancing agent autonomy with predictable, debuggable behavior in production",
      ],
      results: [
        "Shipped a working end-to-end platform from architecture through deployment",
        "Reduced agent task failure rate through improved validation and retry logic",
        "Established an evaluation harness used to benchmark agent reliability across task types",
      ],
      lessonsLearned: [
        "Observability is as important as capability for agentic systems — users trust what they can see",
        "Constraining agent autonomy with explicit tool scopes prevents most cascading failures",
        "Streaming intermediate state to the UI changes how users perceive AI reliability, even when underlying accuracy is unchanged",
      ],
      gallery: [
        { id: "g1", src: "/images/projects/ron-ai/screen-1.svg", alt: "RON AI dashboard overview" },
        { id: "g2", src: "/images/projects/ron-ai/screen-2.svg", alt: "RON AI agent execution graph" },
        { id: "g3", src: "/images/projects/ron-ai/screen-3.svg", alt: "RON AI task detail view" },
      ],
    },
  },
  {
    id: "agentic-remote-sensing",
    slug: "agentic-remote-sensing-automation",
    title: "Agentic AI Remote Sensing Automation Platform",
    category: "Geospatial AI · Agentic AI",
    summary:
      "An autonomous pipeline where AI agents monitor satellite feeds, detect meaningful change, and trigger downstream analysis — without a human manually reviewing every pass.",
    thumbnail: "/images/projects/agentic-remote-sensing/thumbnail.svg",
    technologies: ["Python", "LangGraph", "PyTorch", "AWS", "Google Earth Engine"],
    featured: true,
    caseStudy: {
      overview:
        "This platform automates the otherwise manual process of reviewing satellite imagery for meaningful change — using agents that decide when new imagery warrants deeper analysis and route it to the right model automatically.",
      problemStatement:
        "Remote sensing teams generate far more satellite imagery than they can manually review. Most passes show no meaningful change, but the ones that do need fast, specific analysis — and manual triage doesn't scale across large monitoring areas.",
      solution:
        "I built an agentic pipeline where a monitoring agent ingests new imagery on a schedule, a change-detection model flags anomalies, and a routing agent decides which specialist model (crop health, land-cover change, anomaly detection) should analyze the flagged region. Only meaningful events reach a human reviewer.",
      architecture: [
        { id: "a1", label: "User", description: "Defines monitoring regions and thresholds for the pipeline." },
        { id: "a2", label: "Frontend", description: "Lightweight dashboard for reviewing flagged events." },
        { id: "a3", label: "Backend", description: "Scheduler and task queue manage ingestion and agent runs." },
        { id: "a4", label: "AI Layer", description: "Change-detection and routing agents triage imagery automatically." },
        { id: "a5", label: "Database", description: "Spatial database stores imagery metadata and detection history." },
        { id: "a6", label: "Response", description: "Flagged events with analysis summaries delivered to reviewers." },
      ],
      techStack: ["Python", "LangGraph", "PyTorch", "AWS Lambda", "AWS S3", "Google Earth Engine", "PostGIS"],
      keyFeatures: [
        "Scheduled ingestion of multispectral and SAR satellite imagery",
        "Automated change-detection to filter out routine, unchanged passes",
        "Agent-based routing to specialist models based on detected change type",
        "Spatial database tracking detection history per monitoring region",
      ],
      challenges: [
        "Handling inconsistent satellite revisit times and cloud cover gaps in the data feed",
        "Reducing false-positive change detections without missing genuine events",
        "Designing routing logic that generalizes across very different monitoring use cases",
      ],
      results: [
        "Cut manual review volume substantially by automatically filtering routine, unchanged imagery",
        "Demonstrated reliable routing across multiple distinct analysis types from a single pipeline",
      ],
      lessonsLearned: [
        "Geospatial agentic systems need domain-specific guardrails — generic agent frameworks don't account for coordinate systems or sensor quirks out of the box",
        "Change-detection thresholds matter more than model sophistication for overall pipeline usefulness",
      ],
      gallery: [
        { id: "g1", src: "/images/projects/agentic-remote-sensing/screen-1.svg", alt: "Monitoring dashboard" },
        { id: "g2", src: "/images/projects/agentic-remote-sensing/screen-2.svg", alt: "Change detection map view" },
        { id: "g3", src: "/images/projects/agentic-remote-sensing/screen-3.svg", alt: "Event review panel" },
      ],
    },
  },
  {
    id: "solar-hotspot-detection",
    slug: "solar-hotspot-anomaly-detection",
    title: "Solar Hotspot & Anomaly Detection",
    category: "Computer Vision",
    summary:
      "A computer vision system that identifies thermal hotspots and physical defects in solar panel arrays from drone-captured imagery, accelerating field inspections.",
    thumbnail: "/images/projects/solar-hotspot/thumbnail.svg",
    technologies: ["Python", "PyTorch", "OpenCV", "scikit-learn"],
    caseStudy: {
      overview:
        "A CNN-based detection system that processes thermal imagery captured by inspection drones to flag overheating cells and physical anomalies across large solar installations.",
      problemStatement:
        "Manual thermal inspection of solar farms is slow and inconsistent — inspectors review thousands of thermal frames per site, and subtle hotspots are easy to miss, leading to undetected efficiency losses or fire risk.",
      solution:
        "I trained a CNN-based detector on labeled thermal imagery to localize hotspots and classify defect types, paired with a preprocessing pipeline that normalizes for ambient temperature and panel angle variation across flights.",
      architecture: [
        { id: "a1", label: "User", description: "Inspector uploads drone-captured thermal imagery from a flight." },
        { id: "a2", label: "Frontend", description: "Upload interface and results viewer for flagged panels." },
        { id: "a3", label: "Backend", description: "Processing service handles image normalization and batching." },
        { id: "a4", label: "AI Layer", description: "CNN model detects and classifies thermal anomalies per panel." },
        { id: "a5", label: "Database", description: "Stores per-site detection history for trend tracking over time." },
        { id: "a6", label: "Response", description: "Annotated imagery and a defect report returned to the inspector." },
      ],
      techStack: ["Python", "PyTorch", "OpenCV", "scikit-learn", "NumPy"],
      keyFeatures: [
        "Automatic normalization for ambient temperature and flight angle variance",
        "Per-panel hotspot localization with defect-type classification",
        "Batch processing of full-site thermal imagery sets",
        "Exportable inspection reports with annotated imagery",
      ],
      challenges: [
        "Variable ambient conditions across flights made raw thermal values inconsistent and required careful normalization",
        "Limited labeled defect data required heavy use of augmentation and transfer learning",
      ],
      results: [
        "Delivered a working hotspot detection prototype that significantly reduced manual review time per site",
        "Achieved strong precision on held-out flights from sites not seen during training",
      ],
      lessonsLearned: [
        "Preprocessing and normalization mattered more to final accuracy than model architecture choice",
        "Field conditions introduce noise that's easy to underestimate when working from clean benchmark datasets",
      ],
      gallery: [
        { id: "g1", src: "/images/projects/solar-hotspot/screen-1.svg", alt: "Thermal imagery upload interface" },
        { id: "g2", src: "/images/projects/solar-hotspot/screen-2.svg", alt: "Detected hotspot annotations" },
        { id: "g3", src: "/images/projects/solar-hotspot/screen-3.svg", alt: "Site-level inspection report" },
      ],
    },
  },
  {
    id: "crop-classification",
    slug: "geospatial-crop-classification",
    title: "Geospatial Crop Classification",
    category: "Geospatial AI",
    summary:
      "A segmentation pipeline that classifies crop types across large agricultural regions using multispectral satellite imagery, supporting yield estimation and land-use monitoring.",
    thumbnail: "/images/projects/crop-classification/thumbnail.svg",
    technologies: ["Python", "PyTorch", "QGIS", "PostGIS", "Google Earth Engine"],
    caseStudy: {
      overview:
        "A segmentation model trained on multispectral satellite imagery to classify crop types at the field level across an agricultural region, supporting downstream yield estimation.",
      problemStatement:
        "Accurate, up-to-date crop-type maps are essential for yield forecasting and land-use monitoring, but manual ground surveys are slow and don't scale to large regions or frequent updates.",
      solution:
        "I built a pipeline that pulls multispectral imagery via Google Earth Engine, generates time-series spectral features per field, and trains a segmentation model to classify crop type at the pixel level, validated against ground-truth survey data.",
      architecture: [
        { id: "a1", label: "User", description: "Analyst defines a region of interest and growing season." },
        { id: "a2", label: "Frontend", description: "QGIS-based visualization layer for reviewing classification maps." },
        { id: "a3", label: "Backend", description: "Pipeline service manages imagery requests and feature extraction." },
        { id: "a4", label: "AI Layer", description: "Segmentation model classifies crop type from spectral time series." },
        { id: "a5", label: "Database", description: "PostGIS stores classified field boundaries and historical results." },
        { id: "a6", label: "Response", description: "Crop-type map and confidence scores delivered per field." },
      ],
      techStack: ["Python", "PyTorch", "TensorFlow", "Google Earth Engine", "PostGIS", "QGIS"],
      keyFeatures: [
        "Automated multispectral time-series feature extraction per field",
        "Pixel-level segmentation with per-field confidence aggregation",
        "PostGIS-backed storage for historical comparison across seasons",
        "QGIS-compatible outputs for analyst review and validation",
      ],
      challenges: [
        "Cloud cover gaps in optical imagery required incorporating SAR data for consistent coverage",
        "Crop phenology varies by region, requiring season-aware feature engineering rather than fixed calendar windows",
      ],
      results: [
        "Achieved strong validation accuracy across multiple growing seasons and regions",
        "Produced field-level maps usable directly by analysts without additional GIS processing",
      ],
      lessonsLearned: [
        "Combining optical and SAR data meaningfully improved robustness to cloud cover",
        "Season-aware feature windows outperformed fixed calendar-based features across regions",
      ],
      gallery: [
        { id: "g1", src: "/images/projects/crop-classification/screen-1.svg", alt: "Crop classification map view" },
        { id: "g2", src: "/images/projects/crop-classification/screen-2.svg", alt: "Field-level confidence overlay" },
        { id: "g3", src: "/images/projects/crop-classification/screen-3.svg", alt: "Seasonal comparison view" },
      ],
    },
  },
];
