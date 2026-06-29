"use client";

import { useEffect, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LeoLogo } from "@/components/ui/LeoLogo";

const BOOT_LINES = [
  "Initializing Portfolio",
  "Loading Experience",
  "Loading Projects",
  "Loading Skills",
  "Loading AI Modules",
  "Generating Interface",
  "Ready",
];

const LINE_DURATION = 480; // ms per line
const TOTAL_DURATION = BOOT_LINES.length * LINE_DURATION + 600;

interface BootSequenceProps {
  onComplete: () => void;
}

export function BootSequence({ onComplete }: BootSequenceProps) {
  const [visible, setVisible] = useState(true);
  const [lineIndex, setLineIndex] = useState(0);

  const finish = useCallback(() => {
    setVisible(false);
    setTimeout(onComplete, 500);
  }, [onComplete]);

  useEffect(() => {
    const lineTimer = setInterval(() => {
      setLineIndex((i) => Math.min(i + 1, BOOT_LINES.length - 1));
    }, LINE_DURATION);

    const finishTimer = setTimeout(finish, TOTAL_DURATION);

    return () => {
      clearInterval(lineTimer);
      clearTimeout(finishTimer);
    };
  }, [finish]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bg-primary px-6"
          exit={{ opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8"
          >
            <LeoLogo size={72} forceActive />
          </motion.div>

          <div className="h-6 font-mono-tag text-sm text-text-secondary">
            <AnimatePresence mode="wait">
              <motion.span
                key={lineIndex}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25 }}
              >
                {BOOT_LINES[lineIndex]}
                {lineIndex < BOOT_LINES.length - 1 && (
                  <span className="animate-blink-caret">_</span>
                )}
              </motion.span>
            </AnimatePresence>
          </div>

          <div className="mt-6 h-px w-48 overflow-hidden bg-border-subtle">
            <motion.div
              className="h-full accent-line"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: TOTAL_DURATION / 1000, ease: "linear" }}
            />
          </div>

          <button
            onClick={finish}
            className="absolute bottom-10 font-mono-tag text-xs text-text-tertiary transition-colors hover:text-text-primary"
          >
            Skip intro →
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
