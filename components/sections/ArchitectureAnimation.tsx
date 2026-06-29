"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import type { ArchitectureStage } from "@/types";

export function ArchitectureAnimation({ stages }: { stages: ArchitectureStage[] }) {
  return (
    <div className="flex flex-col items-center gap-0">
      {stages.map((stage, i) => (
        <div key={stage.id} className="flex w-full flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
            className="surface-card flex w-full max-w-md flex-col gap-1 rounded-2xl px-6 py-4 text-center"
          >
            <span className="font-mono-tag text-[11px] uppercase tracking-wider text-accent-cyan">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="font-display text-base font-semibold text-text-primary">
              {stage.label}
            </span>
            <span className="text-sm text-text-secondary">{stage.description}</span>
          </motion.div>

          {i < stages.length - 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 + 0.15 }}
              className="py-2 text-accent-blue/70"
            >
              <ArrowDown size={18} />
            </motion.div>
          )}
        </div>
      ))}
    </div>
  );
}
