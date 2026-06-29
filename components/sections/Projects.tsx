"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TechBadge } from "@/components/ui/TechBadge";
import { ProjectModal } from "@/components/sections/ProjectModal";
import { projects } from "@/data/projects";
import type { Project } from "@/types";

export function Projects() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="relative py-28 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Projects"
          title="Selected work"
          description="A mix of agentic platforms, computer vision systems, and geospatial pipelines — each one solving a problem that doesn't have an off-the-shelf answer."
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {projects.map((project, i) => (
            <motion.button
              key={project.id}
              onClick={() => setActiveProject(project)}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 2) * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="group surface-card flex flex-col overflow-hidden rounded-3xl text-left transition-colors hover:border-border-strong"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={project.thumbnail}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  unoptimized
                />
                <div className="absolute right-4 top-4 rounded-full bg-black/40 p-2 opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
                  <ArrowUpRight size={16} className="text-white" />
                </div>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <span className="font-mono-tag text-xs uppercase tracking-wider text-accent-cyan">
                  {project.category}
                </span>
                <h3 className="mt-2 font-display text-xl font-semibold text-text-primary">
                  {project.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-text-secondary">
                  {project.summary}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <TechBadge key={tech}>{tech}</TechBadge>
                  ))}
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </section>
  );
}
