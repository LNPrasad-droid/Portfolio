import { LeoLogo } from "@/components/ui/LeoLogo";
import { profile } from "@/data/profile";

export function Footer() {
  return (
    <footer className="relative border-t border-border-subtle py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
        <div className="flex items-center gap-2.5 text-text-secondary">
          <LeoLogo size={22} />
          <span className="text-sm">
            © {new Date().getFullYear()} {profile.fullName}
          </span>
        </div>
        <p className="text-xs text-text-muted">
          Built with Next.js and three.js. Sun position is live; the satellite orbit is simulated.
        </p>
      </div>
    </footer>
  );
}
