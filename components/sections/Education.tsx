"use client";

import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { education } from "@/data/education";

export function Education() {
  return (
    <section id="education" className="relative py-28 sm:py-32">
      <div className="mx-auto max-w-4xl px-6">
        <SectionHeading eyebrow="Education" title="Academic background" />

        <div className="space-y-5">
          {education.map((entry, i) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="surface-card flex flex-col gap-5 rounded-3xl p-7 sm:flex-row sm:items-start"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-accent-blue/10 text-accent-cyan">
                <GraduationCap size={22} />
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-display text-lg font-semibold text-text-primary">
                    {entry.degree} · {entry.field}
                  </h3>
                  <span className="font-mono-tag text-xs text-text-tertiary">
                    {entry.startDate} — {entry.endDate}
                  </span>
                </div>
                <p className="mt-1 text-sm text-accent-cyan">
                  {entry.institution} · {entry.location}
                </p>
                <ul className="mt-4 space-y-2">
                  {entry.highlights.map((h) => (
                    <li key={h} className="flex gap-2 text-sm text-text-secondary">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent-blue" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
