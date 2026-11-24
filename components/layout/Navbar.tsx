"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { LeoLogo } from "@/components/ui/LeoLogo";
import { navItems, profile } from "@/data/profile";
import { useActiveSection } from "@/hooks/useActiveSection";
import { cn } from "@/lib/utils";

const sectionIds = navItems.map((n) => n.id);

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeId = useActiveSection(sectionIds);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300",
        scrolled ? "glass border-line" : "border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="#home" className="flex items-center gap-2.5 text-text" aria-label={`${profile.fullName}, back to top`}>
          <LeoLogo size={30} />
          <span className="display text-base font-semibold">{profile.displayName}</span>
        </a>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {navItems
            .filter((item) => item.id !== "home")
            .map((item) => (
              <a
                key={item.id}
                href={item.href}
                aria-current={activeId === item.id ? "true" : undefined}
                className={cn(
                  "border-b-2 px-3 py-2 text-sm transition-colors",
                  activeId === item.id
                    ? "border-signal text-text"
                    : "border-transparent text-text-muted hover:text-text",
                )}
              >
                {item.label}
              </a>
            ))}
        </nav>

        <a
          href={profile.resumeUrl}
          download
          className="hidden rounded-sm border border-line-strong px-4 py-2 text-sm text-text transition-colors hover:border-signal lg:inline-flex"
        >
          Resume (PDF)
        </a>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-sm p-2 text-text lg:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {mobileOpen && (
        <nav id="mobile-nav" className="glass border-t border-line px-6 py-3 lg:hidden" aria-label="Mobile">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "block py-2.5 text-base",
                activeId === item.id ? "text-signal" : "text-text-muted hover:text-text",
              )}
            >
              {item.label}
            </a>
          ))}
          <a href={profile.resumeUrl} download className="block py-2.5 text-base text-text">
            Resume (PDF)
          </a>
        </nav>
      )}
    </header>
  );
}
