"use client";

import { useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import type { Project } from "@/types";
import { TechBadge } from "@/components/ui/TechBadge";
import { ArchitectureAnimation } from "@/components/sections/ArchitectureAnimation";
import { ScreenshotGallery } from "@/components/sections/ScreenshotGallery";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

function ModalSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-border-subtle py-10 first:border-t-0 first:pt-0">
      <h3 className="font-mono-tag text-xs uppercase tracking-[0.16em] text-accent-cyan">
        {title}
      </h3>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li key={item} className="flex gap-2.5 text-[15px] leading-relaxed text-text-secondary">
          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent-blue" />
          {item}
        </li>
      ))}
    </ul>
  );
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    if (!project) return;
    document.body.style.overflow = "hidden";

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[80] overflow-y-auto bg-bg-primary"
          role="dialog"
          aria-modal="true"
          aria-label={`${project.title} case study`}
        >
          <button
            onClick={onClose}
            className="fixed right-5 top-5 z-[85] rounded-full border border-border-subtle bg-bg-secondary/80 p-2.5 text-text-primary backdrop-blur transition-colors hover:bg-white/10"
            aria-label="Close case study"
          >
            <X size={20} />
          </button>

          <motion.div
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto max-w-3xl px-6 py-20 sm:px-8"
          >
            <span className="font-mono-tag text-xs uppercase tracking-wider text-text-tertiary">
              {project.category}
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
              {project.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-text-secondary">
              {project.summary}
            </p>

            <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-2xl border border-border-subtle">
              <Image
                src={project.thumbnail}
                alt={`${project.title} overview`}
                fill
                className="object-cover"
                unoptimized
                priority
              />
            </div>

            <div className="mt-10">
              <ModalSection title="Overview">
                <p className="text-[15px] leading-relaxed text-text-secondary">
                  {project.caseStudy.overview}
                </p>
              </ModalSection>

              <ModalSection title="Problem Statement">
                <p className="text-[15px] leading-relaxed text-text-secondary">
                  {project.caseStudy.problemStatement}
                </p>
              </ModalSection>

              <ModalSection title="Solution">
                <p className="text-[15px] leading-relaxed text-text-secondary">
                  {project.caseStudy.solution}
                </p>
              </ModalSection>

              <ModalSection title="Architecture">
                <ArchitectureAnimation stages={project.caseStudy.architecture} />
              </ModalSection>

              <ModalSection title="Technology Stack">
                <div className="flex flex-wrap gap-2">
                  {project.caseStudy.techStack.map((tech) => (
                    <TechBadge key={tech}>{tech}</TechBadge>
                  ))}
                </div>
              </ModalSection>

              <ModalSection title="Key Features">
                <BulletList items={project.caseStudy.keyFeatures} />
              </ModalSection>

              <ModalSection title="Challenges">
                <BulletList items={project.caseStudy.challenges} />
              </ModalSection>

              <ModalSection title="Results">
                <BulletList items={project.caseStudy.results} />
              </ModalSection>

              <ModalSection title="Lessons Learned">
                <BulletList items={project.caseStudy.lessonsLearned} />
              </ModalSection>

              <ModalSection title="Image Gallery">
                <ScreenshotGallery images={project.caseStudy.gallery} />
              </ModalSection>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
