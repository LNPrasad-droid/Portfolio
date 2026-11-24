import { SectionHeading } from "@/components/ui/SectionHeading";
import { profile } from "@/data/profile";

const blocks = [
  { label: "Now", text: profile.about.summary },
  { label: "How I work", text: profile.about.goals },
  { label: "Beyond the models", text: profile.about.interests },
];

export function About() {
  return (
    <section id="about" className="relative py-24 sm:py-28" aria-labelledby="about-title">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading id="about-title" title="About" />
        <div className="grid grid-cols-1 gap-x-12 gap-y-8 border-t border-line pt-8 lg:grid-cols-3">
          {blocks.map((block) => (
            <div key={block.label}>
              <h3 className="text-sm font-semibold text-signal">{block.label}</h3>
              <p className="mt-3 max-w-[60ch] text-[15px] leading-relaxed text-text-muted">{block.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
