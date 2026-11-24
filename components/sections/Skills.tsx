"use client";

import { useState } from "react";
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
              <h3 className="display mt-1 text-2xl font-semibold text-text">{selected.name}</h3>
              <p className="data mt-1 text-xs text-text-muted">
                used in {selected.usages.length} {selected.usages.length === 1 ? "place" : "places"}
              </p>
              <ul className="mt-5 space-y-4">
                {selected.usages.map((u) => (
                  <li key={u.context} className="border-l-2 border-line-strong pl-4 animate-[step-in_0.25s_ease-out]">
                    <p className="text-[15px] font-semibold text-text">{u.context}</p>
                    <p className="mt-1 text-sm leading-relaxed text-text-muted">{u.detail}</p>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
