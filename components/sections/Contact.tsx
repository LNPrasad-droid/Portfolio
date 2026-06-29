"use client";

import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { contactLinks } from "@/data/profile";

export function Contact() {
  return (
    <section id="contact" className="relative py-28 sm:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeading
          eyebrow="Contact"
          title="Let's build something"
          description="Every way to reach me, in one place. Pick whichever works best for you."
          align="center"
          className="mx-auto text-center"
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {contactLinks.map((link, i) => {
            const Icon =
              (Icons as unknown as Record<string, Icons.LucideIcon>)[link.icon] ?? Icons.Link;

            return (
              <motion.a
                key={link.id}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                whileHover={{ y: -3 }}
                className="group surface-card flex items-center gap-4 rounded-2xl p-5 transition-colors hover:border-accent-blue/40"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent-blue/10 text-accent-cyan transition-colors group-hover:bg-accent-blue/20">
                  <Icon size={20} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-mono-tag text-[11px] uppercase tracking-wider text-text-tertiary">
                    {link.label}
                  </p>
                  <p className="truncate text-sm font-medium text-text-primary">{link.value}</p>
                </div>
                <Icons.ArrowUpRight
                  size={16}
                  className="shrink-0 text-text-tertiary opacity-0 transition-opacity group-hover:opacity-100"
                />
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
