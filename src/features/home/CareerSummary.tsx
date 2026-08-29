import Link from "next/link";

import {
  Container,
  Section,
  SectionHeading,
  Stack,
  TextLink,
} from "@/components/ui";
import { experienceAnchor } from "@/domain/experienceAnchor";
import { PeriodBadge } from "@/features/experience/PeriodBadge";
import type { HomeExperienceRef } from "@/sanity/types";

/**
 * A compact entry point to `/experiencia` (Sprint §18, §19) — the two most
 * recent roles, not the whole timeline. Renders nothing when there is no
 * experience content yet (Sprint §20).
 */
export function CareerSummary({
  experiences,
}: {
  experiences: HomeExperienceRef[];
}) {
  const entries = experiences.filter((e) => e.role || e.company);
  if (!entries.length) return null;

  return (
    <Section aria-labelledby="career-title">
      <Container>
        <Stack gap="lg">
          <SectionHeading
            id="career-title"
            eyebrow="Trajetória"
            title="Como cheguei aqui"
            action={
              <TextLink href="/experiencia">Ver trajetória completa →</TextLink>
            }
          />
          <ol className="divide-border border-border divide-y border-y">
            {entries.map((exp) => (
              <li key={exp._id} className="py-4">
                <Link
                  href={`/experiencia#${experienceAnchor(exp)}`}
                  className="group block rounded-sm"
                >
                  <PeriodBadge period={exp.period} />
                  <p className="group-hover:text-accent mt-1 font-medium">
                    {exp.role ?? exp.company}
                  </p>
                  {exp.role && exp.company ? (
                    <p className="text-fg-muted text-sm">
                      {[exp.company, exp.location].filter(Boolean).join(" · ")}
                    </p>
                  ) : null}
                </Link>
              </li>
            ))}
          </ol>
        </Stack>
      </Container>
    </Section>
  );
}
