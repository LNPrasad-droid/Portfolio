"use client";

import { useState } from "react";
import { contactLinks } from "@/data/profile";

export function Contact() {
  const email = contactLinks.find((l) => l.id === "email");
  const others = contactLinks.filter((l) => l.id !== "email");
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    if (!email) return;
    try {
      await navigator.clipboard.writeText(email.value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = email.href;
    }
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32" aria-labelledby="contact-title">
      <div className="mx-auto max-w-6xl px-6">
        <h2 id="contact-title" className="display text-3xl font-semibold sm:text-4xl">
          Contact
        </h2>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-text-muted">
          Hiring for AI/ML, data science or data engineering? Email is the fastest way to reach me.
        </p>

        {email && (
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href={email.href}
              className="display break-all text-2xl font-semibold text-text decoration-signal decoration-2 underline-offset-8 hover:underline sm:text-4xl"
            >
              {email.value}
            </a>
            <button
              type="button"
              onClick={copy}
              className="rounded-sm border border-line-strong px-3 py-1.5 text-sm text-text transition-colors hover:border-signal"
              aria-live="polite"
            >
              {copied ? "Copied" : "Copy email"}
            </button>
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
