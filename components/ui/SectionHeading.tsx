"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  description?: string;
  id?: string;
  className?: string;
}

/**
 * Plain section heading. The first time it scrolls into view, a scan line
 * sweeps across and the title is "received" like an image strip. Headings
 * already on screen at load, and reduced-motion visitors, see it static.
 */
export function SectionHeading({ title, description, id, className }: SectionHeadingProps) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) return; // already visible

    el.dataset.scan = "pending";
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.dataset.scan = "play";
          io.disconnect();
        }
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className={cn("mb-10 max-w-2xl", className)}>
      <h2 ref={ref} id={id} className="scan-heading display text-3xl font-semibold sm:text-4xl">
        <span className="scan-text">{title}</span>
      </h2>
      {description && <p className="mt-4 text-base leading-relaxed text-text-muted">{description}</p>}
    </div>
  );
}
