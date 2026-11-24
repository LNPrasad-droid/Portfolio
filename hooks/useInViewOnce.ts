"use client";

import { useEffect, useState, type RefObject } from "react";

/** True once the element has scrolled into view (never flips back). */
export function useInViewOnce<T extends Element>(ref: RefObject<T | null>, threshold = 0.35) {
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || seen || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, seen, threshold]);

  return seen;
}
