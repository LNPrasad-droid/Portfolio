"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { profile } from "@/data/profile";

const blocks = [
  { label: "Summary", text: profile.about.summary },
  { label: "What I'm Focused On", text: profile.about.goals },
  { label: "Outside of Work", text: profile.about.interests },
];

export function About() {
  return (
    <section id="about" className="relative py-28 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="About"
          title="An AI engineer who thinks in systems, not just models"
        />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {blocks.map((block, i) => (
            <motion.div
              key={block.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="surface-card rounded-3xl p-7"
            >
              <span className="font-mono-tag text-xs uppercase tracking-[0.14em] text-accent-cyan">
                {block.label}
              </span>
              <p className="mt-4 text-[15px] leading-relaxed text-text-secondary">
                {block.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
