"use client";

import { useState } from "react";
import { SatelliteDish } from "lucide-react";
import { contactLinks } from "@/data/profile";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

export function Contact() {
  const email = contactLinks.find((l) => l.id === "email");
  const others = contactLinks.filter((l) => l.id !== "email");
  const [copied, setCopied] = useState(false);
  // Bumped on every copy so the uplink animation replays
  const [sends, setSends] = useState(0);

  const copy = async () => {
    if (!email) return;
    setSends((n) => n + 1); // the uplink plays on every press
    try {
      await navigator.clipboard.writeText(email.value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Clipboard blocked (permissions, insecure context): open a draft instead
      window.location.href = email.href;
    }
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32" aria-labelledby="contact-title">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          id="contact-title"
          title="Contact"
          description="Hiring for AI/ML, data science or data engineering? Email is the fastest way to reach me."
          className="mb-0"
        />

        {email && (
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href={email.href}
              className="display break-all text-2xl font-semibold text-text decoration-signal decoration-2 underline-offset-8 hover:underline sm:text-4xl"
            >
              {email.value}
            </a>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={copy}
                className="rounded-sm border border-line-strong px-3 py-1.5 text-sm text-text transition-colors hover:border-signal"
              >
                {copied ? "Copied" : "Copy email"}
              </button>
              {/* Uplink: packets travel from the button to the dish */}
              <span className="relative h-px w-16 bg-line" aria-hidden="true">
                {sends > 0 &&
                  [0, 1, 2].map((i) => (
                    <span
                      key={`${sends}-${i}`}
                      className="absolute -top-[2px] left-0 h-[5px] w-[5px] rounded-full bg-signal opacity-0"
                      style={{ animation: `uplink 0.7s ease-in ${i * 0.16}s both`, ["--uplink-distance" as string]: "60px" }}
                    />
                  ))}
              </span>
              <SatelliteDish
                size={18}
                aria-hidden="true"
                className={cn("transition-colors duration-500", copied ? "text-signal" : "text-text-muted")}
              />
              <span className="sr-only" aria-live="polite">
                {copied ? "Email address copied" : ""}
              </span>
            </div>
          </div>
        )}

        <ul className="mt-12 grid border-t border-line sm:grid-cols-2 lg:grid-cols-4">
          {others.map((link) => (
            <li key={link.id} className="border-b border-line sm:odd:border-r lg:border-r lg:last:border-r-0">
              <a
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                download={link.id === "resume" ? true : undefined}
                className="block px-1 py-5 transition-colors hover:text-signal sm:px-5"
              >
                <span className="block text-sm text-text-muted">{link.label}</span>
                <span className="data mt-1 block truncate text-sm text-text">{link.value}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
