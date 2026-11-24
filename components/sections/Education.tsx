import { SectionHeading } from "@/components/ui/SectionHeading";
import { education, certifications } from "@/data/education";

export function Education() {
  return (
    <section id="education" className="relative py-24 sm:py-28" aria-labelledby="education-title">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading id="education-title" title="Education" />

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          <ol className="border-t border-line">
            {education.map((entry) => (
              <li key={entry.id} className="grid gap-x-8 gap-y-1 border-b border-line py-6 sm:grid-cols-[7rem_minmax(0,1fr)]">
                <p className="data text-sm text-text-muted">
                  {entry.startDate} – {entry.endDate}
                </p>
                <div>
                  <h3 className="text-lg font-semibold text-text">
                    {entry.degree}, {entry.field}
                  </h3>
                  <p className="mt-1 text-text-muted">
                    {entry.institution}, {entry.location}
                  </p>
                  <ul className="mt-2 space-y-1 text-sm text-text-muted">
                    {entry.highlights.map((h) => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>

          <div>
            <h3 className="text-sm font-semibold text-text">Certifications</h3>
            <ul className="mt-3 border-t border-line">
              {certifications.map((cert) => (
                <li key={cert.id} className="border-b border-line py-3.5">
                  <p className="text-[15px] text-text">{cert.name}</p>
                  {cert.issuer && <p className="mt-0.5 text-sm text-text-muted">{cert.issuer}</p>}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
