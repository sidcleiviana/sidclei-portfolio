import { MonoHeading } from "@/components/ui/MonoHeading";
import { KnowledgeBadge } from "@/features/knowledge/KnowledgeBadge";
import type { ExperienceEntry } from "@/sanity/types";

import { ExperienceProjects } from "./ExperienceProjects";
import { PeriodBadge } from "./PeriodBadge";

/**
 * One phase of the trajectory as an editorial block (Sprint 7 §19): year and
 * role set large, then the work, the knowledge it exercised, and the projects
 * of the period. Every field is conditional; no logos, no timeline dots.
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

  return (
    <article
      id={anchor}
      className="scroll-mt-24 border-t border-[var(--color-rule)] pt-6"
    >
      <div className="grid gap-x-10 gap-y-8 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="u-label flex items-center gap-2.5">
            {typeof index === "number" ? (
              <span className="text-fg-faint tabular-nums">
                {String(index).padStart(2, "0")}
              </span>
            ) : null}
            <PeriodBadge period={experience.period} />
          </p>
          <h2 className="font-display mt-3 text-3xl leading-[1.05] sm:text-4xl">
            {experience.role ?? experience.company ?? "Experiência"}
          </h2>
          {companyLine && experience.role ? (
            <p className="u-label text-fg-muted mt-3">{companyLine}</p>
          ) : null}
        </div>

        <div className="flex flex-col gap-8 lg:col-span-8">
          {experience.summary ? (
            <p className="text-fg-muted text-lg leading-8 text-pretty">
              {experience.summary}
            </p>
          ) : null}

          {responsibilities.length ? (
            <div>
              <MonoHeading>O que eu fazia</MonoHeading>
              <ul className="text-fg-muted mt-3 space-y-2">
                {responsibilities.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span aria-hidden className="text-fg-faint">
                      —
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {skills.length || technologies.length ? (
            <div className="flex flex-col gap-6" data-rel-scope>
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
