"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowRight, FileDown } from "lucide-react";
import { profile } from "@/data/profile";

const AICore = dynamic(() => import("@/components/three/AICore").then((m) => m.AICore), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-40 w-40 animate-pulse-glow rounded-full bg-accent-blue/10" />
    </div>
  ),
});

interface TypingState {
  text: string;
  wordIndex: number;
  deleting: boolean;
}

/**
 * Cycles through `words`, typing and deleting each one. Modeled as a single
 * state object updated from inside a setTimeout callback (never synchronously
 * in the effect body) so each render only ever schedules one pending
 * transition instead of cascading multiple setState calls per tick.
 */
function useTypingCycle(words: readonly string[], typeSpeed = 65, pause = 1600) {
  const [state, setState] = useState<TypingState>({
    text: "",
    wordIndex: 0,
    deleting: false,
  });

  useEffect(() => {
    const { text, wordIndex, deleting } = state;
    const current = words[wordIndex];

    let delay = typeSpeed;
    let next: TypingState;

    if (!deleting && text.length < current.length) {
      next = { text: current.slice(0, text.length + 1), wordIndex, deleting: false };
    } else if (!deleting && text.length === current.length) {
      delay = pause;
      next = { text, wordIndex, deleting: true };
    } else if (deleting && text.length > 0) {
      delay = typeSpeed / 1.6;
      next = { text: current.slice(0, text.length - 1), wordIndex, deleting: true };
    } else {
      next = { text: "", wordIndex: (wordIndex + 1) % words.length, deleting: false };
    }

    const timeout = setTimeout(() => setState(next), delay);
    return () => clearTimeout(timeout);
  }, [state, words, typeSpeed, pause]);

  return state.text;
}

export function Hero() {
  const typedText = useTypingCycle(profile.roles);

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pt-28 pb-16"
    >
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2 lg:gap-8">
        {/* Left: copy */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        >
          <p className="font-mono-tag text-sm text-accent-cyan">Hi, I&apos;m</p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-text-primary sm:text-5xl lg:text-6xl">
            {profile.fullName}
          </h1>

          <div className="mt-4 h-9 font-display text-xl font-medium text-text-secondary sm:text-2xl">
            <span className="text-gradient">{typedText}</span>
            <span className="animate-blink-caret text-accent-blue">|</span>
          </div>

          <p className="mt-6 max-w-lg text-base leading-relaxed text-text-secondary">
            {profile.tagline}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full bg-text-primary px-6 py-3 text-sm font-semibold text-bg-primary transition-transform duration-300 hover:scale-[1.03]"
            >
              Explore My Work
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href={profile.resumeUrl}
              download
              className="inline-flex items-center gap-2 rounded-full border border-border-strong px-6 py-3 text-sm font-semibold text-text-primary transition-colors hover:bg-white/[0.06]"
            >
              <FileDown size={16} />
              Download Resume
            </a>
          </div>
        </motion.div>

        {/* Right: AI core */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          className="relative h-[320px] sm:h-[420px] lg:h-[520px]"
        >
          <AICore />
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono-tag text-xs text-text-tertiary"
      >
        <div className="flex flex-col items-center gap-2">
          <span>Scroll</span>
          <span className="h-8 w-px animate-pulse-glow bg-border-strong" />
        </div>
      </motion.div>
    </section>
  );
}
