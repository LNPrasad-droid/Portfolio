"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { skills } from "@/data/skills";
import type { Skill, SkillCategory } from "@/types";
import { cn } from "@/lib/utils";

const categories: SkillCategory[] = [
  "Programming Languages",
  "AI & Machine Learning",
  "Generative AI",
  "Frameworks",
  "Databases",
  "Cloud",
  "Developer Tools",
];

function SkillChip({ skill }: { skill: Skill }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.button
        whileHover={{ y: -2 }}
        transition={{ duration: 0.2 }}
        className={cn(
          "inline-flex items-center rounded-full border px-4 py-2 text-sm font-medium transition-colors",
          hovered
            ? "border-accent-blue/50 bg-accent-blue/10 text-text-primary"
            : "border-border-subtle bg-white/[0.02] text-text-secondary hover:text-text-primary"
        )}
      >
        {skill.name}
      </motion.button>

      <AnimatePresence>
        {hovered && skill.usages.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.96 }}
            transition={{ duration: 0.18 }}
            className="glass absolute left-1/2 top-full z-20 mt-2 w-64 -translate-x-1/2 rounded-xl p-4 text-left shadow-2xl"
          >
            <p className="font-mono-tag text-[10px] uppercase tracking-wider text-accent-cyan">
              Used in
            </p>
            <ul className="mt-2 space-y-2.5">
              {skill.usages.map((usage) => (
                <li key={usage.context}>
                  <p className="text-sm font-medium text-text-primary">{usage.context}</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-text-secondary">
                    {usage.detail}
                  </p>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Skills() {
  return (
    <section id="skills" className="relative py-28 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Skills"
          title="Tools I reach for"
          description="Hover any skill to see where it's actually been used — not just listed."
        />

        <div className="space-y-10">
          {categories.map((category, i) => {
            const categorySkills = skills.filter((s) => s.category === category);
            if (categorySkills.length === 0) return null;

            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
              >
                <h3 className="mb-4 font-mono-tag text-xs uppercase tracking-[0.14em] text-text-tertiary">
                  {category}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {categorySkills.map((skill) => (
                    <SkillChip key={skill.id} skill={skill} />
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
