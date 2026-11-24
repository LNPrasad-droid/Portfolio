"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, FolderGit2, Lock } from "lucide-react";
import type { Project } from "@/types";
import { band as bands } from "@/lib/bands";
import { ArchitectureAnimation } from "@/components/sections/ArchitectureAnimation";
import { ScreenshotGallery } from "@/components/sections/ScreenshotGallery";
import { cn } from "@/lib/utils";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-line py-8">
      <h3 className="text-lg font-semibold text-text">{title}</h3>
      <div className="mt-3">{children}</div>
    </section>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="list-disc space-y-2 pl-5 text-[15px] leading-relaxed text-text-muted marker:text-line-strong">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!project) return;
    const opener = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    // Move focus into the dialog
    requestAnimationFrame(() => closeRef.current?.focus());

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      // Keep Tab inside the dialog
      if (e.key === "Tab" && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        );
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      opener?.focus();
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          ref={dialogRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[80] overflow-y-auto bg-ink"
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-title"
        >
          <button
            ref={closeRef}
            onClick={onClose}
            className="fixed right-5 top-5 z-[85] rounded-sm border border-line-strong bg-ink-raised p-2.5 text-text transition-colors hover:border-signal"
            aria-label="Close project"
          >
            <X size={20} />
          </button>

          <motion.article
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto max-w-3xl px-6 py-20 sm:px-8"
          >
            <div className={cn("border-l-[3px] pl-5", bands[project.band].border)}>
              <p className="data text-sm text-text-muted">{project.data}</p>
              <h2 id="project-title" className="display mt-3 text-3xl font-semibold sm:text-[2.6rem] sm:leading-tight">
                {project.title}
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-text-muted">{project.caseStudy.overview}</p>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3 text-sm">
              {project.context && <span className="text-text-muted">{project.context}</span>}
              {project.codeUrl ? (
                <a
                  href={project.codeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-sm bg-signal px-4 py-1.5 font-semibold text-signal-ink transition-[filter] hover:brightness-110"
                >
                  <FolderGit2 size={15} aria-hidden="true" /> View code on GitHub
                </a>
              ) : project.codeNote ? (
                <span className="inline-flex items-center gap-1.5 text-text-muted">
                  <Lock size={14} aria-hidden="true" /> {project.codeNote}
                </span>
              ) : null}
            </div>

            <div className="mt-10">
              <Block title="The problem">
                <p className="text-[15px] leading-relaxed text-text-muted">{project.caseStudy.problemStatement}</p>
              </Block>
              <Block title="Approach">
                <p className="text-[15px] leading-relaxed text-text-muted">{project.caseStudy.solution}</p>
              </Block>
              <Block title="Pipeline">
                <ArchitectureAnimation stages={project.caseStudy.architecture} band={project.band} />
              </Block>
              <Block title="Stack">
                <p className="data text-sm leading-7 text-text">{project.caseStudy.techStack.join(", ")}</p>
              </Block>
              <Block title="What it does">
                <Bullets items={project.caseStudy.keyFeatures} />
              </Block>
              <Block title="Hard parts">
                <Bullets items={project.caseStudy.challenges} />
              </Block>
              <Block title="Outcome">
                <Bullets items={project.caseStudy.results} />
              </Block>
              <Block title="What I'd tell the next engineer">
                <Bullets items={project.caseStudy.lessonsLearned} />
              </Block>
              {project.caseStudy.gallery.length > 0 && (
                <Block title="Screenshots">
                  <ScreenshotGallery images={project.caseStudy.gallery} />
                </Block>
              )}
            </div>
          </motion.article>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
