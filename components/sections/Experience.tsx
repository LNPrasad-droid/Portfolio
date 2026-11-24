"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { experience } from "@/data/experience";
import { useInViewOnce } from "@/hooks/useInViewOnce";
import { usePrefersReducedMotion } from "@/hooks/usePointer";
import { cn } from "@/lib/utils";

function Role({ entry, defaultOpen }: { entry: (typeof experience)[number]; defaultOpen: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = `${entry.id}-details`;
  const ref = useRef<HTMLLIElement>(null);
  // The node "acquires signal" when the role scrolls into view
  const acquired = useInViewOnce(ref, 0.5);

  return (
    <li ref={ref} className="relative grid gap-x-10 gap-y-2 border-b border-line py-8 md:grid-cols-[11rem_minmax(0,1fr)]">
      <span
        className={cn(
          "absolute top-[2.35rem] -left-[calc(1.75rem+5px)] h-[11px] w-[11px] rounded-full border-2 transition-colors duration-500 md:-left-[calc(2.5rem+5px)]",
          acquired ? "border-signal bg-signal" : "border-line-strong bg-ink",
        )}
        aria-hidden="true"
      >
        {acquired && <span className="absolute -inset-1.5 rounded-full border border-signal opacity-0 animate-[acquire_1.1s_ease-out]" />}
      </span>

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
              <p className="data mt-4 text-xs leading-6 text-text-muted">{entry.technologies.join(", ")}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </li>
  );
}

export function Experience() {
  const listRef = useRef<HTMLOListElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  // The timeline draws itself as you scroll through the section
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 75%", "end 55%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.4 });

  return (
    <section id="experience" className="relative py-24 sm:py-28" aria-labelledby="experience-title">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading id="experience-title" title="Experience" />
        <div className="relative pl-7 md:pl-10">
          <span className="absolute top-0 bottom-0 left-0 w-px bg-line" aria-hidden="true" />
          <motion.span
            className="absolute top-0 bottom-0 left-0 w-px origin-top bg-signal"
            style={{ scaleY: reducedMotion ? scrollYProgress : fill }}
            aria-hidden="true"
          />
          <ol ref={listRef} className="border-t border-line">
            {experience.map((entry, i) => (
              <Role key={entry.id} entry={entry} defaultOpen={i === 0} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
