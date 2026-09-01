import Link from "next/link";

import { Container, Section, SectionHeading, TextLink } from "@/components/ui";
import { experienceAnchor } from "@/domain/experienceAnchor";
import { formatMonthRange } from "@/domain/monthRange";
import type { HomeExperienceRef } from "@/sanity/types";

/**
 * A compact door into `/experiencia` (Sprint 7 §19, §20): the two most recent
 * roles as an editorial progression, plus the one-line arc of the whole
 * trajectory (structural copy from the constitution, not a fictional
 * narrative). Renders nothing when there is no experience content.
 */
export function CareerSummary({
  experiences,
}: {
  experiences: HomeExperienceRef[];
}) {
  const entries = experiences.filter((e) => e.role || e.company);
  if (!entries.length) return null;

  return (
    <Section spacing="lg" aria-labelledby="career-title">
      <Container size="editorial">
        <SectionHeading
          as="h2"
          id="career-title"
          index={4}
          eyebrow="Trajetória"
          title="Como cheguei aqui"
          action={
            <TextLink href="/experiencia">Ver trajetória completa</TextLink>
          }
        />

        <p className="u-label text-fg-muted mt-10">
          Infraestrutura <span className="text-fg-faint">→</span> Sistemas{" "}
          <span className="text-fg-faint">→</span> Dados / Automação{" "}
          <span className="text-fg-faint">→</span> Software
        </p>

        <ol className="mt-6 border-t border-[var(--color-rule)]">
          {entries.map((exp) => {
            const period = formatMonthRange(exp.period);
            return (
              <li
                key={exp._id}
                className="border-b border-[var(--color-border)]"
              >
                <Link
                  href={`/experiencia#${experienceAnchor(exp)}`}
                  className="group grid gap-x-8 gap-y-1 py-7 sm:grid-cols-12 sm:items-baseline"
                >
                  <span className="u-label text-fg-faint sm:col-span-2">
                    {period}
                  </span>
                  <span className="font-display group-hover:text-accent text-2xl sm:col-span-6 sm:text-3xl">
                    {exp.role ?? exp.company}
                  </span>
                  {exp.role && exp.company ? (
                    <span className="u-label text-fg-muted sm:col-span-4 sm:text-right">
                      {exp.company}
                    </span>
                  ) : null}
                </Link>
              </li>
            );
          })}
        </ol>
      </Container>
    </Section>
  );
}
