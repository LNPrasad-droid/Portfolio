/**
 * Replays for the "Run an agent" console. The steps mirror the real code paths
 * (cropdetection, solar_ai, rag). Inputs are samples and outputs are
 * illustrative, which the UI states next to the console.
 */

export type StepKind = "plan" | "tool" | "compute" | "model" | "check" | "llm" | "answer";

export interface AgentStep {
  kind: StepKind;
  call: string;
  result: string;
}

export interface AgentRun {
  id: string;
  task: string;
  project: string;
  band: "vegetation" | "thermal" | "radar" | "language";
  steps: AgentStep[];
}

export const agentRuns: AgentRun[] = [
  {
    id: "crop",
    task: "Is this field growing cotton?",
    project: "Geospatial Crop Detection",
    band: "vegetation",
    steps: [
      { kind: "plan", call: "route(query)", result: "intent = classify_field → crop-detection pipeline, model = cotton" },
      { kind: "tool", call: "kml.load('sample_field.kml')", result: "1 polygon, reprojected to EPSG:4326" },
      { kind: "tool", call: "gee.sentinel2(monthly, mask=QA60)", result: "cloud-masked optical composites for the season" },
      { kind: "tool", call: "gee.sentinel1(VV, VH, to_db, speckle_filter)", result: "radar composites fill the cloudy monsoon months" },
      { kind: "compute", call: "features.phenology(ndvi, evi, sar_ratio)", result: "green-up slope, peak month, area under curve, VV/VH stats" },
      { kind: "check", call: "schema.validate(features)", result: "no missing columns; imputed gaps with training medians" },
      { kind: "model", call: "cotton.rf_calibrated.predict_proba(x)", result: "p(cotton) = 0.87 (sample)" },
      { kind: "answer", call: "respond()", result: "Likely cotton. Greenness peaks in September, which matches the kharif cotton calendar." },
    ],
  },
  {
    id: "solar",
    task: "Which solar zone should the crew inspect first?",
    project: "Solar Plant Thermal-Risk Monitoring",
    band: "thermal",
    steps: [
      { kind: "plan", call: "route(query)", result: "intent = rank_zones → thermal-risk pipeline" },
      { kind: "tool", call: "gee.landsat8_lst(window=30d, per_table)", result: "surface temperature for every panel table" },
      { kind: "tool", call: "gee.sentinel2_ndvi(window=30d, per_table)", result: "vegetation and soiling signal per table" },
      { kind: "compute", call: "anomaly(lst - table_baseline), zscore(plant)", result: "tables running hotter than their own history" },
      { kind: "check", call: "resolution_guard(lst_pixel=30m, table≈4m)", result: "report at zone level, not per panel" },
      { kind: "compute", call: "risk_index(0.4 thermal, 0.3 ndvi, 0.2 hotspot, 0.1 health)", result: "zones ranked by mean and peak risk" },
      { kind: "llm", call: "openrouter.chat(maintenance_prompt, zone_stats)", result: "draft maintenance brief" },
      { kind: "check", call: "verify(report.counts == zone_stats.counts)", result: "numbers in the draft match the source table" },
      { kind: "answer", call: "respond()", result: "Inspect zone 1 first: highest mean risk and the most high-risk tables (sample)." },
    ],
  },
  {
    id: "rag",
    task: "What does this document say about termination?",
    project: "Document RAG with LangGraph",
    band: "language",
    steps: [
      { kind: "plan", call: "graph.invoke(question)", result: "retrieve → generate" },
      { kind: "check", call: "cache.get(normalize(question))", result: "miss" },
      { kind: "tool", call: "chroma.similarity_search(k=4, embed=MiniLM-L6)", result: "4 chunks from sample_contract.pdf (pages 3, 3, 7, 9)" },
      { kind: "llm", call: "openrouter.chat(context_only_prompt)", result: "answer grounded in the retrieved chunks" },
      { kind: "check", call: "citations.dedupe(source, page)", result: "sample_contract.pdf p.3, p.7" },
      { kind: "answer", call: "respond()", result: "Either party can terminate with 30 days' written notice (p.3); early termination fees are on p.7 (sample)." },
    ],
  },
];
