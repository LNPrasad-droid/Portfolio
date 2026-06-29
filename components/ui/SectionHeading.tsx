"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "mb-12 max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      <span className="font-mono-tag text-xs uppercase tracking-[0.18em] text-accent-cyan">
        {eyebrow}
      </span>
      <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-text-secondary">
          {description}
        </p>
      )}
    </motion.div>
  );
}
