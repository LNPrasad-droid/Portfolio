# Leo's Portfolio

A premium, AI-product-feeling recruiter portfolio for Lakshmi Narasimha Prasad ("Leo"), built with Next.js (App Router), TypeScript, Tailwind CSS v4, Framer Motion, and Three.js / React Three Fiber.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000. Production build:

```bash
npm run build
npm start
```

## What's implemented

- **Boot sequence** (`components/boot/BootSequence.tsx`) — AI-initialization loading animation with a skip option, plays once per page load.
- **Leo logo** (`components/ui/LeoLogo.tsx`) — a fully custom, geometric, neural-network-inspired lion mark built from SVG nodes and edges. Illuminates and animates a signal sweep on hover. Used in the navbar, boot sequence, and footer.
- **Ambient neural background** (`components/three/NeuralBackground.tsx`) — canvas-based, proximity-connected nodes that drift slowly and brighten near the cursor. Runs outside React's render loop for performance, and freezes to a single static frame if the OS-level "reduce motion" setting is on.
- **Hero AI Core** (`components/three/AICore.tsx`) — a React Three Fiber glowing icosahedron with a wireframe shell, ambient particle field, and subtle mouse-driven tilt. Dynamically imported (`ssr: false`) so it never blocks first paint.
- **Sticky glass navbar** with scroll-spy active-section indicator (`hooks/useActiveSection.ts`).
- **About, Experience (expandable timeline), Projects (case-study modals with architecture diagrams + galleries), Skills (hover-to-reveal usage chips), Education, Certifications, and a dedicated Contact Hub** — all sections from the PRD.
- All content lives in `data/*.ts`, typed via `types/index.ts`. Components are purely presentational — update content without touching component code.

## Project structure

```
app/                  Root layout + the single page (app/page.tsx orchestrates boot + sections)
components/
  boot/               Boot sequence overlay
  layout/             Navbar, Footer
  sections/           One file per portfolio section + project modal/gallery/architecture
  three/               AICore (hero) and NeuralBackground (ambient bg)
  ui/                 LeoLogo, SectionHeading, TechBadge — small reusable primitives
data/                 Single source of truth for all content (profile, skills, experience, projects, education)
hooks/                useActiveSection (nav scroll-spy), usePointer / usePrefersReducedMotion
lib/                  cn() class-merging helper
types/                Shared TypeScript interfaces
public/images/projects/<slug>/   Placeholder thumbnails + screenshots, one folder per project
```

## Replacing placeholder content

**Project screenshots.** Each project has a folder under `public/images/projects/<slug>/` with `thumbnail.svg` and `screen-1.svg` / `screen-2.svg` / `screen-3.svg`. Drop in real PNG/JPG files with the **same filenames** (e.g. `thumbnail.png`) and update the single path reference in `data/projects.ts` — no component or layout changes needed.

**Resume PDF.** Add your file at `public/resume/leo-resume.pdf` (already referenced from the Hero and Contact sections via `data/profile.ts → resumeUrl`).

**Copy and bio.** Everything in `data/profile.ts`, `data/experience.ts`, `data/projects.ts`, `data/skills.ts`, and `data/education.ts` is plain TypeScript objects — edit directly. Real names/links currently in `profile.ts` and `contactLinks` are placeholders (`github.com/leo-prasad`, `leo.prasad@example.com`, etc.) and should be swapped for the real ones before publishing.

**Fonts.** This build intentionally uses system font stacks (`app/globals.css` → `--font-sans` / `--font-display` / `--font-mono`) instead of `next/font/google`, so it has **zero network dependency at build time** — useful for sandboxed/offline builds and CI. To use the originally-specified webfonts (Inter for body, a display face for headings, JetBrains Mono for tags), Vercel/your machine will have internet access, so you can re-introduce `next/font/google` in `app/layout.tsx`:

```tsx
import { Inter, Manrope, JetBrains_Mono } from "next/font/google";
const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const manrope = Manrope({ variable: "--font-display-family", subsets: ["latin"], weight: ["600","700","800"] });
const mono = JetBrains_Mono({ variable: "--font-mono-family", subsets: ["latin"] });
// add ${inter.variable} ${manrope.variable} ${mono.variable} to the <html> className
```
Then point `--font-sans`, `--font-display`, and `--font-mono` in `globals.css` at `var(--font-inter)`, etc.

## Design tokens

All colors, radii, and easing curves are defined once in `app/globals.css` under `:root` and exposed to Tailwind via `@theme inline` (Tailwind v4's CSS-based config — there is no `tailwind.config.ts`). Key tokens: `--bg-primary` (#050505), `--surface-card` (#151515), `--accent-blue`, `--accent-cyan`, `--accent-violet`, matching the PRD's palette exactly.

## Notes on a few implementation choices

- **No `tailwind.config.ts`** — Tailwind v4 configures via CSS (`@theme` in `globals.css`), which is why colors like `bg-bg-primary` or `text-accent-cyan` work as Tailwind utilities without a JS config file.
- **AICore and Particles avoid calling `Math.random()` during React's render phase** — random particle positions are generated once via a lazy `useState` initializer, not inside `useMemo`'s body, which keeps the component's render path pure (this also satisfies React's stricter `eslint-plugin-react-hooks` purity rules used here).
- **`prefers-reduced-motion` is respected globally** — the global CSS collapses all animation/transition durations, and both `NeuralBackground` and `AICore`'s particle field check `usePrefersReducedMotion()` to skip their animation loops entirely rather than just running them invisibly.

## Linting & type-checking

```bash
npx eslint . --ext .ts,.tsx
npx tsc --noEmit
```

Both are clean as of this build.
