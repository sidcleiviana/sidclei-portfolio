import { Cluster, Stack } from "@/components/ui";
import { MonoHeading } from "@/components/ui/MonoHeading";
import { KnowledgeBadge } from "@/features/knowledge/KnowledgeBadge";
import type { ExperienceEntry } from "@/sanity/types";

import { ExperienceProjects } from "./ExperienceProjects";
import { PeriodBadge } from "./PeriodBadge";

/**
 * One step of the journey. Role is the focus, company is context (Sprint §13);
 * every field is conditional (Sprint §12, §27). No logos, ever.
 */
export function ExperienceItem({
  experience,
  anchor,
}: {
  experience: ExperienceEntry;
  anchor: string;
}) {
  const responsibilities = (experience.responsibilities ?? []).filter(Boolean);
  const skills = (experience.skills ?? []).filter((s) => s?.name);
  const technologies = (experience.technologies ?? []).filter((t) => t?.name);
  const projects = experience.projects ?? [];
  const companyLine = [experience.company, experience.location]
    .filter(Boolean)
    .join(" · ");

  return (
    <article id={anchor} className="scroll-mt-24">
      <Stack gap="md">
        <div>
          <PeriodBadge period={experience.period} />
          <h2 className="mt-1.5 text-xl sm:text-2xl">
            {experience.role ?? experience.company ?? "Experiência"}
          </h2>
          {companyLine && experience.role ? (
            <p className="text-fg-muted mt-0.5">{companyLine}</p>
          ) : null}
        </div>

        {experience.summary ? (
          <p className="text-fg-muted leading-7 text-pretty">
            {experience.summary}
          </p>
        ) : null}

        {responsibilities.length ? (
          <div>
            <MonoHeading>O que eu fazia</MonoHeading>
            <ul className="mt-2 space-y-1.5 text-[0.975rem] leading-7">
              {responsibilities.map((item) => (
                <li key={item} className="flex gap-2.5">
                  <span
                    aria-hidden
                    className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-accent)]"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {skills.length ? (
          <div>
            <MonoHeading>Competências</MonoHeading>
            <Cluster gap="xs" className="mt-2">
              {skills.map((s) => (
                <KnowledgeBadge
                  key={s._id}
                  kind="skill"
                  slug={s.slug}
                  name={s.name}
                />
              ))}
            </Cluster>
          </div>
        ) : null}

        {technologies.length ? (
          <div>
            <MonoHeading>Tecnologias</MonoHeading>
            <Cluster gap="xs" className="mt-2">
              {technologies.map((t) => (
                <KnowledgeBadge
                  key={t._id}
                  kind="technology"
                  slug={t.slug}
                  name={t.name}
                />
              ))}
            </Cluster>
          </div>
        ) : null}

        {projects.length ? <ExperienceProjects projects={projects} /> : null}
      </Stack>
    </article>
  );
}
