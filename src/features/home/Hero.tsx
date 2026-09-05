import Link from "next/link";

import { ArrowLink, Container, Rule, Section } from "@/components/ui";
import { experienceAnchor } from "@/domain/experienceAnchor";
import { isCurrent } from "@/domain/monthRange";
import type { HomeExperienceRef, HomeProfile } from "@/sanity/types";

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
 * space is trimmed. A live status line (7.3) surfaces the current role when
 * one exists in the CMS — real data, not a fabricated "available now" badge.
 */
export function Hero({
  profile,
  experiences = [],
}: {
  profile: HomeProfile | null;
  experiences?: HomeExperienceRef[];
}) {
  const name = profile?.name ?? FALLBACK_NAME;
  const headline = profile?.headline ?? FALLBACK_HEADLINE;
  const summary = profile?.shortSummary ?? FALLBACK_SUMMARY;
  const current = experiences.find((e) => isCurrent(e.period));

  return (
    <Section
      spacing="lg"
      aria-labelledby="hero-title"
      className="bg-grid-texture pt-8 sm:pt-12"
    >
      <Container size="editorial">
        <div
          className="flex items-baseline justify-between"
          data-animate="rise"
        >
          <p className="u-label flex items-center gap-2.5">
            <span aria-hidden className="h-px w-4 bg-[var(--color-accent)]" />
            {name}
          </p>
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
            className="font-display text-[clamp(2.75rem,7.5vw,6rem)] leading-[0.98] tracking-[var(--tracking-display)] text-balance lg:col-span-9"
          >
            {headline}
          </h1>

          <div
            data-animate="rise"
            data-delay="2"
            aria-label="Áreas de atuação"
            data-surface="tonal"
            className="p-5 lg:col-span-3 lg:justify-self-end lg:pt-4"
          >
            <p className="u-label text-fg-muted">Atuação</p>
            <ul className="mt-3 border-l border-[var(--color-accent)]/35 pl-3.5">
              {FOCUS_AREAS.map((area) => (
                <li
                  key={area.name}
                  className="u-label text-fg hover:text-accent relative py-1.5 transition-colors before:absolute before:top-1/2 before:-left-3.5 before:h-px before:w-2.5 before:bg-[var(--color-accent)] before:content-['']"
                >
                  {area.name}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {current ? (
          <Link
            href={`/experiencia#${experienceAnchor(current)}`}
            data-animate="rise"
            data-delay="2"
            className="group u-label mt-8 inline-flex items-center gap-2.5"
          >
            <span
              aria-hidden
              className="u-live-dot h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-petrol)]"
            />
            <span className="text-fg-muted group-hover:text-fg transition-colors">
              Atualmente {current.role ? `${current.role} · ` : ""}
              {current.company}
            </span>
          </Link>
        ) : null}

        <Rule
          weight="strong"
          animate
          className="mt-14"
        />
        <div
          data-animate="rise"
          data-delay="3"
          className="grid gap-x-8 gap-y-8 pt-8 lg:grid-cols-12"
        >
          <p className="text-fg-muted max-w-[46ch] text-xl leading-8 text-pretty lg:col-span-7">
            {summary}
          </p>
          <div className="lg:col-span-5 lg:justify-self-end">
            <div className="hover:bg-bg-tonal -m-3 inline-block rounded-sm p-3 transition-colors">
              <ArrowLink href="/projects" size="lg">
                Explorar trabalho
              </ArrowLink>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
