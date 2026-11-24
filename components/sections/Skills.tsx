"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePointer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { skills } from "@/data/skills";
import type { SkillCategory } from "@/types";
import { cn } from "@/lib/utils";

const categories: SkillCategory[] = [
  "Geospatial & Remote Sensing",
  "AI & Machine Learning",
  "Generative AI",
  "Programming Languages",
  "Frameworks",
  "Databases",
  "Cloud",
  "Developer Tools",
];

/**
 * Stack map: choose a tool to see exactly where it was used.
 * Click/tap/keyboard driven, so it works without a mouse.
 */
export function Skills() {
  const [selectedId, setSelectedId] = useState(skills.find((s) => s.id === "gee")?.id ?? skills[0].id);
  const selected = skills.find((s) => s.id === selectedId) ?? skills[0];
  const reducedMotion = usePrefersReducedMotion();

  return (
    <section id="skills" className="relative py-24 sm:py-28" aria-labelledby="skills-title">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          id="skills-title"
          title="Stack"
          description="Only tools I have shipped code with. Choose one to see where it was used."
        />

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
          <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {categories.map((category) => {
              const items = skills.filter((s) => s.category === category);
              if (!items.length) return null;
              return (
                <div key={category}>
                  <h3 className="text-sm font-semibold text-text">{category}</h3>
                  <ul className="mt-3 space-y-1">
                    {items.map((skill) => {
                      const on = skill.id === selectedId;
                      return (
                        <li key={skill.id}>
                          <button
                            type="button"
                            aria-pressed={on}
                            onClick={() => setSelectedId(skill.id)}
                            className={cn(
                              "w-full border-l-2 py-1 pl-3 text-left text-[15px] transition-colors",
                              on ? "border-signal text-text" : "border-transparent text-text-muted hover:text-text",
                            )}
                          >
                            {skill.name}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start" aria-live="polite">
            <div className="rounded-sm border border-line bg-ink-raised p-6">
              <p className="text-sm text-text-muted">{selected.category}</p>
              <h3 className="display mt-1 flex items-center gap-3 text-2xl font-semibold text-text">
                <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-signal" aria-hidden="true" />
                {selected.name}
              </h3>
              <p className="data mt-1 pl-[1.4rem] text-xs text-text-muted">
                used in {selected.usages.length} {selected.usages.length === 1 ? "place" : "places"}
              </p>

              {/* Connection diagram: a trunk from the tool, one branch per place it was used */}
              <div key={selected.id} className="relative mt-4 pl-[1.4rem]">
                <motion.span
                  className="absolute top-0 left-[4px] w-px origin-top bg-signal"
                  style={{ bottom: "1.6rem" }}
                  initial={reducedMotion ? false : { scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  aria-hidden="true"
                />
                <ul className="space-y-4 pt-2">
                  {selected.usages.map((u, i) => (
                    <li key={u.context} className="relative">
                      <motion.span
                        className="absolute top-[0.8rem] -left-[calc(1.4rem-4px)] h-px w-[calc(1.4rem-8px)] origin-left bg-signal"
                        initial={reducedMotion ? false : { scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.25, delay: 0.25 + i * 0.12, ease: "easeOut" }}
                        aria-hidden="true"
                      />
                      <motion.div
                        initial={reducedMotion ? false : { opacity: 0, x: -6 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.25, delay: 0.38 + i * 0.12 }}
                        className="rounded-sm border border-line bg-ink px-4 py-3"
                      >
                        <p className="text-[15px] font-semibold text-text">{u.context}</p>
                        <p className="mt-1 text-sm leading-relaxed text-text-muted">{u.detail}</p>
                      </motion.div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
