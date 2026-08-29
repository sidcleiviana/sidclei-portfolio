import {
  Badge,
  ButtonLink,
  Cluster,
  Container,
  Eyebrow,
  Section,
  Stack,
} from "@/components/ui";
import type { HomeProfile } from "@/sanity/types";

import {
  FALLBACK_HEADLINE,
  FALLBACK_NAME,
  FALLBACK_SUMMARY,
  FOCUS_AREAS,
} from "./identity";

/**
 * Identity in one glance (Sprint §7, §8, §10): name, positioning, a short
 * intro, and the way forward. From the CMS `profile` when it exists, neutral
 * constitution copy otherwise. No 100vh, no terminal, no fake numbers.
 */
export function Hero({ profile }: { profile: HomeProfile | null }) {
  const name = profile?.name ?? FALLBACK_NAME;
  const headline = profile?.headline ?? FALLBACK_HEADLINE;
  const summary = profile?.shortSummary ?? FALLBACK_SUMMARY;

  return (
    <Section spacing="lg" aria-labelledby="hero-title">
      <Container>
        <Stack gap="lg" className="max-w-[var(--container-wide)]">
          <Stack gap="md" data-animate="rise">
            <Eyebrow>{headline}</Eyebrow>
            <h1
              id="hero-title"
              className="text-4xl leading-[1.05] text-balance sm:text-[3.4rem]"
            >
              {name}
            </h1>
            <p className="text-fg-muted max-w-[var(--container-prose)] text-lg text-pretty">
              {summary}
            </p>
            {profile?.publicLocation ? (
              <p className="text-fg-muted text-sm">{profile.publicLocation}</p>
            ) : null}
          </Stack>

          <Cluster gap="xs" aria-label="Áreas de atuação">
            {FOCUS_AREAS.map((area) => (
              <Badge key={area.name} tone="outline">
                {area.name}
              </Badge>
            ))}
          </Cluster>

          <Cluster gap="sm">
            <ButtonLink href="/projects">Ver projetos</ButtonLink>
            <ButtonLink href="/experiencia" variant="secondary">
              Ver trajetória
            </ButtonLink>
          </Cluster>
        </Stack>
      </Container>
    </Section>
  );
}
