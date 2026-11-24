"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { agentRuns, type AgentRun, type StepKind } from "@/data/agentRuns";
import { usePrefersReducedMotion } from "@/hooks/usePointer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

const STEP_MS = 650;

const kindStyle: Record<StepKind, string> = {
  plan: "text-band-radar",
  tool: "text-signal",
  compute: "text-text",
  model: "text-band-vegetation",
  check: "text-band-thermal",
  llm: "text-band-language",
  answer: "text-text",
};

const bandBorder: Record<AgentRun["band"], string> = {
  vegetation: "border-band-vegetation",
  thermal: "border-band-thermal",
  radar: "border-band-radar",
  language: "border-band-language",
};

export function AgentConsole() {
  const reducedMotion = usePrefersReducedMotion();
  const [runId, setRunId] = useState(agentRuns[0].id);
  const [shown, setShown] = useState(0);
  const [running, setRunning] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const run = agentRuns.find((r) => r.id === runId) ?? agentRuns[0];

  const stop = useCallback(() => {
    if (timer.current) clearInterval(timer.current);
    timer.current = null;
    setRunning(false);
  }, []);

  const start = useCallback(
    (r: AgentRun) => {
      stop();
      if (reducedMotion) {
        setShown(r.steps.length);
        return;
      }
      setShown(0);
      setRunning(true);
      let n = 0;
      timer.current = setInterval(() => {
        n += 1;
        setShown(n);
        if (n >= r.steps.length) stop();
      }, STEP_MS);
    },
    [reducedMotion, stop],
  );

  useEffect(() => stop, [stop]);

  const choose = (r: AgentRun) => {
    setRunId(r.id);
    start(r);
  };

  const elapsed = (i: number) => `+${((i + 1) * 0.42 + i * 0.07).toFixed(2)}s`;

  return (
    <section id="agents" className="relative py-24 sm:py-28" aria-labelledby="agents-title">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          id="agents-title"
          title="Run an agent"
          description="Pick a task. The console replays how my pipelines plan, call tools, run a model, check the result and answer. Inputs are samples and outputs are illustrative; the steps match the real code."
        />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.6fr)]">
          <div role="radiogroup" aria-label="Agent task" className="flex flex-col gap-2">
            {agentRuns.map((r) => {
              const active = r.id === runId;
              return (
                <button
                  key={r.id}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => choose(r)}
                  className={cn(
                    "border-l-[3px] bg-ink-raised px-4 py-3.5 text-left transition-colors",
                    active ? bandBorder[r.band] : "border-line hover:border-line-strong",
                  )}
                >
                  <span className="block text-[15px] text-text">{r.task}</span>
                  <span className="mt-1 block text-xs text-text-muted">{r.project}</span>
                </button>
              );
            })}
            <button
              type="button"
              onClick={() => (running ? stop() : start(run))}
              className="mt-2 self-start rounded-sm bg-signal px-4 py-2 text-sm font-semibold text-signal-ink transition-[filter] hover:brightness-110"
            >
              {running ? "Pause" : shown > 0 ? "Run again" : "Run"}
            </button>
          </div>

          <div className="data min-h-[23rem] overflow-hidden rounded-sm border border-line bg-[#060d16] text-[13px] leading-relaxed">
            <div className="flex items-center justify-between border-b border-line px-4 py-2 text-xs text-text-muted">
              <span>agent.run(&quot;{run.task}&quot;)</span>
              <span className="tabular-nums">
                {Math.min(shown, run.steps.length)}/{run.steps.length} steps
              </span>
            </div>
            <ol className="space-y-2.5 px-4 py-4" aria-live="polite">
              {shown === 0 && <li className="text-text-muted">Press Run, or pick a task to start.</li>}
              {run.steps.slice(0, shown).map((s, i) => (
                <li
                  key={`${run.id}-${i}`}
                  className="grid gap-x-2 gap-y-0.5 animate-[step-in_0.25s_ease-out] sm:grid-cols-[4.2rem_4.4rem_minmax(0,1fr)]"
                >
                  <span className="flex gap-3 sm:contents">
                    <span className="tabular-nums text-text-muted">{elapsed(i)}</span>
                    <span className={kindStyle[s.kind]}>{s.kind}</span>
                  </span>
                  <span className="min-w-0">
                    <span className={cn("break-words", s.kind === "answer" ? "text-text" : "text-text-muted")}>
                      {s.kind === "answer" ? s.result : s.call}
                    </span>
                    {s.kind !== "answer" && <span className="block break-words text-text">{s.result}</span>}
                  </span>
                </li>
              ))}
              {running && shown < run.steps.length && (
                <li className="text-signal" aria-hidden="true">
                  <span className="inline-block animate-pulse">▍</span>
                </li>
              )}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
