"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { agentRuns, type AgentRun, type StepKind } from "@/data/agentRuns";
import { usePrefersReducedMotion } from "@/hooks/usePointer";
import { useInViewOnce } from "@/hooks/useInViewOnce";
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

const kindBg: Record<StepKind, string> = {
  plan: "bg-band-radar border-band-radar",
  tool: "bg-signal border-signal",
  compute: "bg-text border-text",
  model: "bg-band-vegetation border-band-vegetation",
  check: "bg-band-thermal border-band-thermal",
  llm: "bg-band-language border-band-language",
  answer: "bg-text border-text",
};

/** Execution graph: one node per step, lighting up in sync with the trace */
function AgentGraph({ run, shown, running }: { run: AgentRun; shown: number; running: boolean }) {
  return (
    <div className="border-b border-line px-4 pt-4 pb-3" aria-hidden="true">
      <ol className="flex items-start">
        {run.steps.map((s, i) => {
          const done = i < shown;
          const current = running && i === shown;
          return (
            <li key={`${run.id}-node-${i}`} className="flex min-w-0 flex-1 flex-col items-center last:flex-none">
              <div className="flex w-full items-center">
                <span
                  className={cn(
                    "relative h-3 w-3 shrink-0 rounded-full border transition-colors duration-300",
                    done ? kindBg[s.kind] : current ? "border-signal bg-ink" : "border-line-strong bg-ink",
                  )}
                >
                  {current && <span className="absolute -inset-1 animate-ping rounded-full border border-signal opacity-70" />}
                </span>
                {i < run.steps.length - 1 && (
                  <span className="relative mx-1 h-px flex-1 overflow-hidden bg-line">
                    <span
                      className={cn(
                        "absolute inset-y-0 left-0 bg-text-muted transition-[width] duration-500 ease-out",
                        i < shown - 1 ? "w-full" : "w-0",
                      )}
                    />
                  </span>
                )}
              </div>
              <span
                className={cn(
                  "mt-1.5 w-full truncate pr-2 text-[10px] transition-colors sm:text-[11px]",
                  done ? kindStyle[s.kind] : "text-text-muted/60",
                )}
              >
                {s.kind}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

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

  // Start the first replay on its own when the console scrolls into view
  const consoleRef = useRef<HTMLDivElement>(null);
  const inView = useInViewOnce(consoleRef, 0.4);
  const autoStarted = useRef(false);
  useEffect(() => {
    if (!inView || autoStarted.current) return;
    autoStarted.current = true;
    const id = setTimeout(() => start(agentRuns[0]), 300);
    return () => clearTimeout(id);
  }, [inView, start]);

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

          <div
            ref={consoleRef}
            className="data min-h-[23rem] overflow-hidden rounded-sm border border-line bg-[#060d16] text-[13px] leading-relaxed"
          >
            <div className="flex items-center justify-between border-b border-line px-4 py-2 text-xs text-text-muted">
              <span>agent.run(&quot;{run.task}&quot;)</span>
              <span className="tabular-nums">
                {Math.min(shown, run.steps.length)}/{run.steps.length} steps
              </span>
            </div>
            <AgentGraph run={run} shown={shown} running={running} />
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
