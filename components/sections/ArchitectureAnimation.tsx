"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { ArchitectureStage, Band } from "@/types";
import { band as bands } from "@/lib/bands";
import { usePrefersReducedMotion } from "@/hooks/usePointer";
import { cn } from "@/lib/utils";

const STAGE_MS = 900;

/**
 * Runnable pipeline: press "Run pipeline" and a packet moves stage by stage
 * down the rail, lighting each stage as it is processed. Every stage stays
 * readable without running it.
 */
export function ArchitectureAnimation({ stages, band = "radar" }: { stages: ArchitectureStage[]; band?: Band }) {
  const reducedMotion = usePrefersReducedMotion();
  // -1 = idle, 0..n-1 = processing that stage, n = finished
  const [active, setActive] = useState(-1);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const b = bands[band];

  const stop = useCallback(() => {
    if (timer.current) clearInterval(timer.current);
    timer.current = null;
  }, []);

  useEffect(() => stop, [stop]);

  const run = () => {
    stop();
    if (reducedMotion) {
      setActive(stages.length);
      return;
    }
    let i = 0;
    setActive(0);
    timer.current = setInterval(() => {
      i += 1;
      setActive(i);
      if (i >= stages.length) stop();
    }, STAGE_MS);
  };

  const running = active >= 0 && active < stages.length;
  const progress = active < 0 ? 0 : Math.min(1, (active + (running ? 0.5 : 0)) / stages.length);

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={run}
          disabled={running}
          className="rounded-sm bg-signal px-4 py-2 text-sm font-semibold text-signal-ink transition-[filter] hover:brightness-110 disabled:opacity-60"
        >
          {running ? "Running…" : active >= stages.length ? "Run again" : "Run pipeline"}
        </button>
        <span className="data text-xs text-text-muted" aria-live="polite">
          {active < 0
            ? `${stages.length} stages`
            : running
              ? `stage ${active + 1}/${stages.length}: ${stages[active].label}`
              : `done: ${stages.length}/${stages.length} stages`}
        </span>
      </div>

      <ol className="relative">
        {/* rail + fill */}
        <span className="absolute left-[11px] top-2 bottom-2 w-px bg-line" aria-hidden="true" />
        <span
          className={cn("absolute left-[11px] top-2 w-px transition-[height] duration-700 ease-out", b.bg)}
          style={{ height: `calc(${progress * 100}% - ${progress * 16}px)` }}
          aria-hidden="true"
        />

        {stages.map((stage, i) => {
          const done = active > i;
          const current = active === i;
          return (
            <li key={stage.id} className="relative grid grid-cols-[24px_minmax(0,1fr)] gap-4 pb-6 last:pb-0">
              <span
                className={cn(
                  "data relative z-10 mt-0.5 flex h-6 w-6 items-center justify-center rounded-full border text-[11px] transition-colors duration-300",
                  done && cn(b.bg, b.border, "text-ink"),
                  current && cn(b.border, b.text, "bg-ink"),
                  !done && !current && "border-line-strong bg-ink text-text-muted",
                )}
              >
                {i + 1}
                {current && !reducedMotion && (
                  <span className={cn("absolute inset-0 animate-ping rounded-full border opacity-60", b.border)} aria-hidden="true" />
                )}
              </span>
              <div className={cn("transition-opacity duration-300", active >= 0 && !done && !current && "opacity-55")}>
                <p className="text-[15px] font-semibold text-text">{stage.label}</p>
                <p className="mt-1 text-sm leading-relaxed text-text-muted">{stage.description}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
