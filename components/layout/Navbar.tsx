"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { LeoLogo } from "@/components/ui/LeoLogo";
import { navItems, profile } from "@/data/profile";
import { useActiveSection } from "@/hooks/useActiveSection";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeId = useActiveSection(navItems.map((n) => n.id));

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "py-3" : "py-5"
      )}
    >
      <div
        className={cn(
          "mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-5 transition-all duration-300",
          scrolled ? "glass mx-4 py-2.5 sm:mx-auto" : "bg-transparent py-1"
        )}
      >
        <a
          href="#home"
          className="flex items-center gap-2.5 text-text-primary"
          aria-label={`${profile.displayName} — home`}
        >
          <LeoLogo size={34} />
          <span className="font-display text-lg font-semibold tracking-tight">
            {profile.displayName}
          </span>
        </a>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className={cn(
                "relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
                activeId === item.id
                  ? "text-text-primary"
                  : "text-text-secondary hover:text-text-primary"
              )}
            >
              {activeId === item.id && (
                <motion.span
                  layoutId="nav-active-pill"
                  className="absolute inset-0 rounded-full bg-white/[0.06]"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative z-10">{item.label}</span>
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="hidden rounded-full border border-border-strong px-4 py-2 text-sm font-medium text-text-primary transition-colors hover:bg-white/[0.06] lg:inline-flex"
        >
          Get in touch
        </a>

        <button
          className="inline-flex items-center justify-center rounded-full p-2 text-text-primary lg:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="glass mx-4 mt-2 flex flex-col gap-1 rounded-2xl p-3 lg:hidden"
            aria-label="Mobile"
          >
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "rounded-xl px-4 py-3 text-sm font-medium transition-colors",
                  activeId === item.id
                    ? "bg-white/[0.06] text-text-primary"
                    : "text-text-secondary hover:text-text-primary"
                )}
              >
                {item.label}
              </a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
