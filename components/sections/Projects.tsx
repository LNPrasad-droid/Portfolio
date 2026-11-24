"use client";

import { useState } from "react";
import { Lock, FolderGit2 } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectModal } from "@/components/sections/ProjectModal";
import { projects } from "@/data/projects";
import { band as bands } from "@/lib/bands";
import type { Band, Project } from "@/types";
import { cn } from "@/lib/utils";

const filters: { id: "all" | Band; label: string }[] = [
  { id: "all", label: "All" },
  { id: "vegetation", label: "Optical" },
  { id: "thermal", label: "Thermal" },
  { id: "radar", label: "Agentic" },
  { id: "language", label: "Language" },
];

export function Projects() {
  const [active, setActive] = useState<Project | null>(null);
  const [filter, setFilter] = useState<"all" | Band>("all");
  const visible = filter === "all" ? projects : projects.filter((p) => p.band === filter);

  return (
    <section id="projects" className="relative py-24 sm:py-28" aria-labelledby="projects-title">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          id="projects-title"
          title="Projects"
          description="Each project is tagged by the kind of data it works on. Open one to read the problem, run its pipeline and see the stack."
        />

        <div className="mb-6 flex flex-wrap gap-2" role="group" aria-label="Filter projects by data type">
          {filters.map((f) => {
            const on = filter === f.id;
            const count = f.id === "all" ? projects.length : projects.filter((p) => p.band === f.id).length;
            return (
              <button
                key={f.id}
                type="button"
                aria-pressed={on}
                onClick={() => setFilter(f.id)}
                className={cn(
                  "inline-flex items-center gap-2 rounded-sm border px-3 py-1.5 text-sm transition-colors",
                  on ? "border-text bg-text text-ink" : "border-line-strong text-text-muted hover:text-text",
                )}
              >
                {f.id !== "all" && <span className={cn("h-2 w-2 rounded-full", bands[f.id].bg)} aria-hidden="true" />}
                {f.label}
                <span className="data text-xs opacity-70">{count}</span>
              </button>
            );
          })}
        </div>

        <ul className="border-t border-line">
          {visible.map((project) => (
            <li key={project.id} className="border-b border-line">
              <button
                type="button"
                onClick={() => setActive(project)}
                className="group grid w-full grid-cols-[3px_minmax(0,1fr)] gap-5 py-7 text-left sm:gap-7"
                aria-haspopup="dialog"
              >
                <span className={cn("h-full rounded-full", bands[project.band].bg)} aria-hidden="true" />
                <span className="grid gap-x-10 gap-y-3 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
                  <span>
                    <span className="data block text-xs text-text-muted">{project.data}</span>
                    <span className="display mt-2 block text-2xl font-semibold text-text decoration-signal decoration-2 underline-offset-[6px] group-hover:underline sm:text-[1.7rem]">
                      {project.title}
                    </span>
                    <span className="mt-3 block max-w-[62ch] text-[15px] leading-relaxed text-text-muted">
                      {project.summary}
                    </span>
                  </span>
                  <span className="flex flex-col justify-between gap-4 lg:items-end lg:text-right">
                    <span className="data text-xs leading-6 text-text-muted lg:max-w-[30ch]">
                      {project.technologies.join(", ")}
                    </span>
                    <span className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm lg:justify-end">
                      {project.context && <span className="text-text-muted">{project.context}</span>}
                      {project.codeUrl ? (
                        <span className="inline-flex items-center gap-1.5 text-signal">
                          <FolderGit2 size={14} aria-hidden="true" /> Code on GitHub
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-text-muted">
                          <Lock size={13} aria-hidden="true" /> Private code
                        </span>
                      )}
                    </span>
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <ProjectModal project={active} onClose={() => setActive(null)} />
    </section>
  );
}
