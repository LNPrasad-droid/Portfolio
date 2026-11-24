"use client";

import { useEffect, useState } from "react";
import { isInView, nextPassStart, satellitePosition, subsolarPoint, type LatLon } from "@/lib/orbit";

export interface Telemetry {
  now: number;
  satellite: LatLon;
  subsolar: LatLon;
  inView: boolean;
  nextPassAt: number | null;
}

/**
 * Live telemetry for the hero panel. Returns null until mounted so the
 * server-rendered HTML never disagrees with the client clock.
 */
export function useTelemetry(): Telemetry | null {
  const [state, setState] = useState<Telemetry | null>(null);

  useEffect(() => {
    let nextPass: number | null = null;
    let nextPassComputedAt = 0;

    const tick = () => {
      const now = Date.now();
      const inView = isInView(now);
      // The pass search is the only non-trivial work: redo it every 30 s or when a pass ends
      if (now - nextPassComputedAt > 30_000 || (nextPass !== null && now >= nextPass && !inView)) {
        nextPass = nextPassStart(now);
        nextPassComputedAt = now;
      }
      setState({
        now,
        satellite: satellitePosition(now),
        subsolar: subsolarPoint(now),
        inView,
        nextPassAt: inView ? null : nextPass,
      });
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return state;
}

export function formatCountdown(ms: number) {
  const totalMin = Math.max(0, Math.round(ms / 60_000));
  const h = Math.floor(totalMin / 60);
  const m = totalMin % 60;
  return h > 0 ? `${h} h ${m} min` : `${m} min`;
}

export function formatUtc(ms: number, withSeconds = true) {
  const d = new Date(ms);
  const p = (n: number) => String(n).padStart(2, "0");
  return `${p(d.getUTCHours())}:${p(d.getUTCMinutes())}${withSeconds ? `:${p(d.getUTCSeconds())}` : ""}`;
}
