import { MonoHeading } from "@/components/ui/MonoHeading";
import { isCurrent } from "@/domain/monthRange";
import { KnowledgeBadge } from "@/features/knowledge/KnowledgeBadge";
import type { ExperienceEntry } from "@/sanity/types";

import { ExperienceProjects } from "./ExperienceProjects";
import { PeriodBadge } from "./PeriodBadge";

/**
 * One phase of the trajectory as an editorial block (Sprint 7 §19; refined
 * 7.1 §9–14): a large year and role on the left, the work and the knowledge it
 * exercised on the right — recomposed so it reads as a chapter of a career,
 * not a résumé. Responsibilities keep list semantics but lose the checklist
 * look. Every field is conditional; no logos, no timeline dots.
 */
export function ExperienceItem({
  experience,
  anchor,
  index,
}: {
  experience: ExperienceEntry;
  anchor: string;
  index?: number;
}) {
  const responsibilities = (experience.responsibilities ?? []).filter(Boolean);
  const skills = (experience.skills ?? []).filter((s) => s?.name);
  const technologies = (experience.technologies ?? []).filter((t) => t?.name);
  const projects = experience.projects ?? [];
  const companyLine = [experience.company, experience.location]
    .filter(Boolean)
    .join(" · ");
  const startYear = experience.period?.startDate?.slice(0, 4) ?? null;
  const current = isCurrent(experience.period);

  return (
    <article
      id={anchor}
      className={`scroll-mt-24 border-t-2 pt-6 ${
        current ? "border-[var(--color-accent)]" : "border-[var(--color-rule)]"
      }`}
    >
      <div className="grid gap-x-12 gap-y-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="u-label flex items-baseline gap-2.5">
            {typeof index === "number" ? (
              <span aria-hidden className="text-fg-faint tabular-nums">
                {String(index).padStart(2, "0")}
              </span>
            ) : null}
            <PeriodBadge period={experience.period} />
          </p>

          {startYear ? (
            <p
              aria-hidden
              className={`font-display mt-4 text-[clamp(3rem,7vw,5rem)] leading-none tabular-nums ${
                current ? "text-accent" : "text-fg-faint"
              }`}
            >
              {startYear}
            </p>
          ) : null}

          <h2 className="font-display mt-4 text-[clamp(2rem,4vw,3.25rem)] leading-[1.03] tracking-[var(--tracking-tight)]">
            {experience.role ?? experience.company ?? "Experiência"}
          </h2>
          {companyLine && experience.role ? (
            <p className="u-label text-fg-muted mt-3">{companyLine}</p>
          ) : null}
        </div>

        <div className="flex flex-col gap-10 lg:col-span-8 lg:pt-1">
          {experience.summary ? (
            <p className="text-fg text-xl leading-8 text-pretty">
              {experience.summary}
            </p>
          ) : null}

          {responsibilities.length ? (
            <div>
              <MonoHeading>O que eu fazia</MonoHeading>
              <ul className="mt-3 border-t border-[var(--color-border)]">
                {responsibilities.map((item) => (
                  <li
                    key={item}
                    className="text-fg-muted border-b border-[var(--color-border)] py-2.5 leading-7 text-pretty"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {skills.length || technologies.length ? (
            <div className="grid gap-8 sm:grid-cols-2" data-rel-scope>
              {skills.length ? (
                <div>
                  <MonoHeading>Competências</MonoHeading>
                  <div className="mt-2.5 flex flex-wrap gap-x-4 gap-y-2">
                    {skills.map((s) => (
                      <KnowledgeBadge
                        key={s._id}
                        kind="skill"
                        slug={s.slug}
                        name={s.name}
                        rel
                      />
                    ))}
                  </div>
                </div>
              ) : null}

              {technologies.length ? (
                <div>
                  <MonoHeading>Tecnologias</MonoHeading>
                  <div className="mt-2.5 flex flex-wrap gap-x-4 gap-y-2">
                    {technologies.map((t) => (
                      <KnowledgeBadge
                        key={t._id}
                        kind="technology"
                        slug={t.slug}
                        name={t.name}
                        rel
                      />
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          ) : null}

          {projects.length ? <ExperienceProjects projects={projects} /> : null}
        </div>
      </div>
    </article>
  );
}
