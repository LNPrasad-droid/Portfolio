"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, MapPin } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TechBadge } from "@/components/ui/TechBadge";
import { experience } from "@/data/experience";
import { cn } from "@/lib/utils";

function ExperienceCard({
  entry,
  index,
}: {
  entry: (typeof experience)[number];
  index: number;
}) {
  const [open, setOpen] = useState(index === 0);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="relative pl-10"
    >
      {/* Timeline dot */}
      <span className="absolute left-0 top-1.5 flex h-5 w-5 items-center justify-center">
        <span
          className={cn(
            "h-2.5 w-2.5 rounded-full transition-colors",
            open ? "bg-accent-cyan shadow-[0_0_12px_var(--accent-cyan)]" : "bg-border-strong"
          )}
        />
      </span>

      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full surface-card rounded-2xl p-6 text-left transition-colors hover:border-border-strong"
        aria-expanded={open}
      >
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h3 className="font-display text-lg font-semibold text-text-primary">
              {entry.role}
            </h3>
            <p className="mt-1 text-sm text-accent-cyan">{entry.company}</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-mono-tag text-xs text-text-tertiary">
              {entry.startDate} — {entry.endDate}
            </span>
            <ChevronDown
              size={18}
              className={cn(
                "text-text-tertiary transition-transform duration-300",
                open && "rotate-180"
              )}
            />
          </div>
        </div>

        <p className="mt-2 flex items-center gap-1.5 text-xs text-text-tertiary">
          <MapPin size={12} /> {entry.location}
        </p>

        <p className="mt-4 text-sm leading-relaxed text-text-secondary">{entry.summary}</p>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="mt-5 border-t border-border-subtle pt-5">
                <h4 className="font-mono-tag text-xs uppercase tracking-wider text-text-tertiary">
                  Responsibilities
                </h4>
                <ul className="mt-3 space-y-2">
                  {entry.responsibilities.map((r) => (
                    <li key={r} className="flex gap-2 text-sm text-text-secondary">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent-blue" />
                      {r}
                    </li>
                  ))}
                </ul>

                <h4 className="mt-5 font-mono-tag text-xs uppercase tracking-wider text-text-tertiary">
                  Achievements
                </h4>
                <ul className="mt-3 space-y-2">
                  {entry.achievements.map((a) => (
                    <li key={a} className="flex gap-2 text-sm text-text-secondary">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent-cyan" />
                      {a}
                    </li>
                  ))}
                </ul>

                <div className="mt-5 flex flex-wrap gap-2">
                  {entry.technologies.map((tech) => (
                    <TechBadge key={tech}>{tech}</TechBadge>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </motion.div>
  );
}

export function Experience() {
  return (
    <section id="experience" className="relative py-28 sm:py-32">
      <div className="mx-auto max-w-4xl px-6">
        <SectionHeading
          eyebrow="Experience"
          title="Where the work happened"
          description="A timeline of roles where I built and shipped AI systems end to end."
        />

        <div className="relative space-y-5">
          <div className="absolute left-[9px] top-2 bottom-2 w-px bg-border-subtle" />
          {experience.map((entry, i) => (
            <ExperienceCard key={entry.id} entry={entry} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
