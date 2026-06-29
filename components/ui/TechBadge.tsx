import { cn } from "@/lib/utils";

export function TechBadge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-border-subtle bg-white/[0.03] px-3 py-1 font-mono-tag text-xs text-text-secondary",
        className
      )}
    >
      {children}
    </span>
  );
}
