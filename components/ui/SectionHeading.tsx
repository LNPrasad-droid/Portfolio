import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  description?: string;
  id?: string;
  className?: string;
}

/** Plain section heading: the title carries the section, no eyebrow labels. */
export function SectionHeading({ title, description, id, className }: SectionHeadingProps) {
  return (
    <div className={cn("mb-10 max-w-2xl", className)}>
      <h2 id={id} className="display text-3xl font-semibold sm:text-4xl">
        {title}
      </h2>
      {description && <p className="mt-4 text-base leading-relaxed text-text-muted">{description}</p>}
    </div>
  );
}
