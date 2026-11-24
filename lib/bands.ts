import type { Band } from "@/types";

/** Tailwind classes per sensor band (kept literal so Tailwind can see them) */
export const band = {
  vegetation: { text: "text-band-vegetation", bg: "bg-band-vegetation", border: "border-band-vegetation", label: "Optical / vegetation" },
  thermal: { text: "text-band-thermal", bg: "bg-band-thermal", border: "border-band-thermal", label: "Thermal" },
  radar: { text: "text-band-radar", bg: "bg-band-radar", border: "border-band-radar", label: "Multi-source / agentic" },
  language: { text: "text-band-language", bg: "bg-band-language", border: "border-band-language", label: "Language" },
} satisfies Record<Band, { text: string; bg: string; border: string; label: string }>;
