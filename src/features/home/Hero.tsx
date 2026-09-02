import { ArrowLink, Container, Section } from "@/components/ui";
import type { HomeProfile } from "@/sanity/types";

import {
  FALLBACK_HEADLINE,
  FALLBACK_NAME,
  FALLBACK_SUMMARY,
  FOCUS_AREAS,
} from "./identity";

/**
 * The masthead of the whole site (Sprint 7 §9, §10; refined 7.1 §3, §4, §23):
 * name as a quiet label, the profession set as a dominant graphic element, the
 * four axes as a small connected structure in the right column, a short intro,
 * one strong way forward. Header and hero read as one composition — the top
 * space is trimmed.
 */
export function Hero({ profile }: { profile: HomeProfile | null }) {
  const name = profile?.name ?? FALLBACK_NAME;
  const headline = profile?.headline ?? FALLBACK_HEADLINE;
  const summary = profile?.shortSummary ?? FALLBACK_SUMMARY;

  return (
    <Section
      spacing="lg"
      aria-labelledby="hero-title"
      className="pt-8 sm:pt-12"
    >
      <Container size="editorial">
        <div
          className="flex items-baseline justify-between"
          data-animate="rise"
        >
          <p className="u-label">{name}</p>
          <p className="u-label text-fg-faint">
            <span aria-hidden className="tabular-nums">
              01
            </span>{" "}
            / Portfólio
          </p>
        </div>

        <div className="mt-10 grid gap-x-8 gap-y-10 lg:grid-cols-12">
          <h1
            id="hero-title"
            data-animate="rise"
            data-delay="1"
            className="font-display text-[clamp(3rem,11vw,8.5rem)] leading-[0.94] tracking-[var(--tracking-display)] text-balance lg:col-span-9"
          >
            {headline}
          </h1>

          <div
            data-animate="rise"
            data-delay="2"
            aria-label="Áreas de atuação"
            className="lg:col-span-3 lg:justify-self-end lg:pt-3"
          >
            <p className="u-label text-fg-faint">Atuação</p>
            <ul className="mt-3 border-l border-[var(--color-border-strong)] pl-3.5">
              {FOCUS_AREAS.map((area) => (
                <li
                  key={area.name}
                  className="u-label text-fg relative py-1.5 before:absolute before:top-1/2 before:-left-3.5 before:h-px before:w-2.5 before:bg-[var(--color-border-strong)] before:content-['']"
                >
                  {area.name}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          data-animate="rise"
          data-delay="3"
          className="mt-14 grid gap-x-8 gap-y-8 border-t border-[var(--color-rule)] pt-8 lg:grid-cols-12"
        >
          <p className="text-fg-muted max-w-[46ch] text-xl leading-8 text-pretty lg:col-span-7">
            {summary}
          </p>
          <div className="lg:col-span-5 lg:justify-self-end">
            <ArrowLink href="/projects" size="lg">
              Explorar trabalho
            </ArrowLink>
          </div>
        </div>
      </Container>
    </Section>
  );
}
