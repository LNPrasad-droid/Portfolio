"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { FileDown } from "lucide-react";
import { profile } from "@/data/profile";
import { GROUND_STATION, formatLatLon } from "@/lib/orbit";
import { useTelemetry, formatCountdown, formatUtc } from "@/hooks/useTelemetry";
import type { CameraMode } from "@/components/three/GroundStationGlobe";
import { cn } from "@/lib/utils";

const GroundStationGlobe = dynamic(
  () => import("@/components/three/GroundStationGlobe").then((m) => m.GroundStationGlobe),
  { ssr: false, loading: () => <GlobePlaceholder /> },
);

function GlobePlaceholder() {
  return (
    <svg viewBox="0 0 200 200" className="h-full w-full p-10 opacity-60" aria-hidden="true">
      <circle cx="100" cy="100" r="70" fill="#13283d" stroke="#2c4561" />
      {[-45, -15, 15, 45].map((y) => (
        <ellipse key={y} cx="100" cy={100 + y} rx={Math.sqrt(70 * 70 - y * y)} ry="6" fill="none" stroke="#2c4561" />
      ))}
    </svg>
  );
}

function Telemetry({ mode, setMode }: { mode: CameraMode; setMode: (m: CameraMode) => void }) {
  const t = useTelemetry();

  const passText = !t
    ? "Calculating orbit"
    : t.inView
      ? "In view now, downlink open"
      : t.nextPassAt
        ? `Next pass in ${formatCountdown(t.nextPassAt - t.now)} (${formatUtc(t.nextPassAt, false)} UTC)`
        : "No pass in the next 48 h";

  return (
    <div className="border-t border-line pt-4">
      <dl className="data grid grid-cols-[auto_1fr] gap-x-6 gap-y-1.5 text-[13px]">
        <dt className="text-text-muted">UTC</dt>
        <dd className="tabular-nums">{t ? formatUtc(t.now) : "--:--:--"}</dd>
        <dt className="text-text-muted">Satellite</dt>
        <dd className="tabular-nums">{t ? formatLatLon(t.satellite) : "-"}</dd>
        <dt className="text-text-muted">Sun overhead</dt>
        <dd className="tabular-nums">{t ? formatLatLon(t.subsolar) : "-"}</dd>
        <dt className="text-text-muted">{GROUND_STATION.name}</dt>
        <dd className={cn(t?.inView && "text-signal")} aria-live="polite">
          {passText}
        </dd>
      </dl>

      <div className="mt-4 flex flex-wrap items-center gap-2" role="group" aria-label="Globe camera">
        {(
          [
            ["station", "Ground station view"],
            ["satellite", "Follow satellite"],
          ] as const
        ).map(([value, label]) => (
          <button
            key={value}
            type="button"
            onClick={() => setMode(value)}
            aria-pressed={mode === value}
            className={cn(
              "rounded-sm border px-3 py-1.5 text-sm transition-colors",
              mode === value
                ? "border-signal bg-signal text-signal-ink"
                : "border-line-strong text-text hover:border-signal",
            )}
          >
            {label}
          </button>
        ))}
      </div>
      <p className="mt-3 max-w-md text-xs leading-relaxed text-text-muted">
        Live sun position and Earth rotation. The satellite follows a simulated orbit with Sentinel-2 parameters
        (786 km, sun-synchronous, 10:30 descending node).
      </p>
    </div>
  );
}

export function Hero() {
  const [mode, setMode] = useState<CameraMode>("station");

  return (
    <section id="home" className="relative overflow-hidden pt-28 pb-20 lg:pt-32">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-10 px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-12">
        <div>
          <p className="data text-sm text-text-muted">
            {formatLatLon({ lat: GROUND_STATION.lat, lon: GROUND_STATION.lon })} {profile.location}
          </p>
          <h1 className="display mt-4 text-[2.6rem] font-semibold leading-[1.02] sm:text-6xl lg:text-[4.1rem]">
            {profile.fullName}
          </h1>
          <p className="mt-5 text-xl text-text sm:text-2xl">{profile.headline}</p>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-text-muted sm:text-lg">{profile.tagline}</p>
          <p className="mt-5 text-sm text-text-muted">{profile.availability}</p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="rounded-sm bg-signal px-5 py-3 text-sm font-semibold text-signal-ink transition-[filter] hover:brightness-110"
            >
              See projects
            </a>
            <a
              href={profile.resumeUrl}
              download
              className="inline-flex items-center gap-2 rounded-sm border border-line-strong px-5 py-3 text-sm font-semibold text-text transition-colors hover:border-signal"
            >
              <FileDown size={16} aria-hidden="true" />
              Download resume
            </a>
          </div>
        </div>

        <div>
          <div className="relative mx-auto aspect-square w-full max-w-[460px]">
            <GroundStationGlobe mode={mode} />
          </div>
          <Telemetry mode={mode} setMode={setMode} />
        </div>
      </div>
    </section>
  );
}
