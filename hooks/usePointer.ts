"use client";

import { useEffect, useState } from "react";

export interface NormalizedPointer {
  x: number; // -1 to 1
  y: number; // -1 to 1
}

/**
 * Tracks pointer position normalized to [-1, 1] relative to viewport center.
 * Shared by the ambient background network and the Three.js hero scene
 * so both react to the same mouse signal without duplicating listeners.
 */
export function usePointer(): NormalizedPointer {
  const [pointer, setPointer] = useState<NormalizedPointer>({ x: 0, y: 0 });

  useEffect(() => {
    function handleMove(e: PointerEvent) {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setPointer({ x, y });
    }

    window.addEventListener("pointermove", handleMove, { passive: true });
    return () => window.removeEventListener("pointermove", handleMove);
  }, []);

  return pointer;
}

/**
 * Returns true if the user has requested reduced motion at the OS level.
 * All ambient/decorative animation hooks should respect this.
 */
export function usePrefersReducedMotion(): boolean {
  const [prefers, setPrefers] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const listener = (e: MediaQueryListEvent) => setPrefers(e.matches);
    mq.addEventListener("change", listener);
    return () => mq.removeEventListener("change", listener);
  }, []);

  return prefers;
}
