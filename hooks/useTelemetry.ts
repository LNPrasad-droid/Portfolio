"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { isInView, nextPassStart, satellitePosition, subsolarPoint, type LatLon } from "@/lib/orbit";
import { getSpeed, simNow, subscribe } from "@/lib/simClock";

export interface Telemetry {
  now: number;
  satellite: LatLon;
  subsolar: LatLon;
  inView: boolean;
  nextPassAt: number | null;
}

/** Current simulation speed (re-renders when it changes) */
export function useSimSpeed() {
  return useSyncExternalStore(subscribe, getSpeed, () => 1);
}

/**
 * Live telemetry for the hero panel, driven by the shared simulation clock.
 * Returns null until mounted so server HTML never disagrees with the client clock.
 */
export function useTelemetry(): Telemetry | null {
  const [state, setState] = useState<Telemetry | null>(null);
  const speed = useSimSpeed();

  useEffect(() => {
    let nextPass: number | null = null;
    let lastSearchReal = 0;

    const tick = () => {
      const now = simNow();
      const inView = isInView(now);
      const real = Date.now();
      // The pass search is the only heavy step: redo it every 5 s (real time) or once a pass has started
      if (real - lastSearchReal > 5_000 || (nextPass !== null && now >= nextPass)) {
        nextPass = inView ? null : nextPassStart(now);
        lastSearchReal = real;
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
    const id = setInterval(tick, speed > 1 ? 250 : 1000);
    return () => clearInterval(id);
  }, [speed]);

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
