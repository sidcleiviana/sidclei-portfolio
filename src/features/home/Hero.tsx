import { ArrowLink, Container, Section } from "@/components/ui";
import type { HomeProfile } from "@/sanity/types";

import {
  FALLBACK_HEADLINE,
  FALLBACK_NAME,
  FALLBACK_SUMMARY,
  FOCUS_AREAS,
} from "./identity";

/**
 * The masthead of the whole site (Sprint 7 §9, §10): name as a quiet label,
 * the profession set as a graphic element, the four axes, a short intro, one
 * way forward. Asymmetric on desktop, a clean vertical flow on mobile. No
 * hero card, no 100vh, no photo.
 */
export function Hero({ profile }: { profile: HomeProfile | null }) {
  const name = profile?.name ?? FALLBACK_NAME;
  const headline = profile?.headline ?? FALLBACK_HEADLINE;
  const summary = profile?.shortSummary ?? FALLBACK_SUMMARY;
  const axes = FOCUS_AREAS.map((a) => a.name).join(" · ");

  return (
    <Section spacing="xl" aria-labelledby="hero-title">
      <Container size="editorial">
        <div
          className="flex items-baseline justify-between"
          data-animate="rise"
        >
          <p className="u-label">{name}</p>
          <p className="u-label text-fg-faint">
            <span className="tabular-nums">01</span> / Portfólio
          </p>
        </div>

        <h1
          id="hero-title"
          data-animate="rise"
          data-delay="1"
          className="font-display mt-8 max-w-[16ch] text-[clamp(2.75rem,9vw,6.75rem)] leading-[0.98] tracking-[var(--tracking-display)] text-balance"
        >
          {headline}
        </h1>

        <p
          data-animate="rise"
          data-delay="2"
          className="u-label text-fg-muted mt-8"
        >
          {axes}
        </p>

        <div
          data-animate="rise"
          data-delay="3"
          className="mt-12 grid gap-8 border-t border-[var(--color-border)] pt-8 lg:grid-cols-12"
        >
          <p className="text-fg-muted max-w-[var(--container-prose)] text-lg text-pretty lg:col-span-7 lg:text-xl">
            {summary}
          </p>
          <div className="lg:col-span-5 lg:self-end lg:justify-self-end">
            <ArrowLink href="/projects">Explorar trabalho</ArrowLink>
          </div>
        </div>
      </Container>
    </Section>
  );
}
