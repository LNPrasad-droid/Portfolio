"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePointer";

/**
 * Page scroll progress drawn as an orbit track: the filled part is the
 * ground already covered, and a small satellite rides the leading edge.
 */
export function OrbitProgress() {
  const reducedMotion = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 160, damping: 30, mass: 0.3 });
  const progress = reducedMotion ? scrollYProgress : smooth;
  const left = useTransform(progress, (v) => `${v * 100}%`);

  return (
    <div className="pointer-events-none absolute inset-x-0 -bottom-px h-px" aria-hidden="true">
      <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,var(--line)_0_6px,transparent_6px_12px)]" />
      <motion.div className="absolute inset-y-0 left-0 w-full origin-left bg-signal" style={{ scaleX: progress }} />
      <motion.div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2" style={{ left }}>
        <svg width="22" height="10" viewBox="0 0 22 10">
          <rect x="8" y="2" width="6" height="6" rx="1" fill="var(--text)" />
          <rect x="0" y="4" width="7" height="2" fill="var(--signal)" />
          <rect x="15" y="4" width="7" height="2" fill="var(--signal)" />
        </svg>
      </motion.div>
    </div>
  );
}
