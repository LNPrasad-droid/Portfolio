"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { experience } from "@/data/experience";
import { cn } from "@/lib/utils";

function Role({ entry, defaultOpen }: { entry: (typeof experience)[number]; defaultOpen: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = `${entry.id}-details`;

  return (
    <li className="grid gap-x-10 gap-y-2 border-b border-line py-8 md:grid-cols-[11rem_minmax(0,1fr)]">
      <p className="data text-sm text-text-muted">
        {entry.startDate} – {entry.endDate}
      </p>
      <div>
        <h3 className="text-xl font-semibold text-text">{entry.role}</h3>
        <p className="mt-1 text-text-muted">
          {entry.company}, {entry.location}
        </p>
        <p className="mt-4 max-w-[68ch] text-[15px] leading-relaxed text-text">{entry.summary}</p>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={panelId}
          className="mt-4 text-sm text-signal underline-offset-4 hover:underline"
        >
          {open ? "Hide details" : "Show details"}
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              id={panelId}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <ul className="mt-4 max-w-[68ch] list-disc space-y-2 pl-5 text-[15px] leading-relaxed text-text-muted marker:text-line-strong">
                {[...entry.responsibilities, ...entry.achievements].map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
              <p className={cn("data mt-4 text-xs leading-6 text-text-muted")}>{entry.technologies.join(", ")}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </li>
  );
}

export function Experience() {
  return (
    <section id="experience" className="relative py-24 sm:py-28" aria-labelledby="experience-title">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading id="experience-title" title="Experience" />
        <ol className="border-t border-line">
          {experience.map((entry, i) => (
            <Role key={entry.id} entry={entry} defaultOpen={i === 0} />
          ))}
        </ol>
      </div>
    </section>
  );
}
