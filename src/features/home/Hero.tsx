import Link from "next/link";

import { AgentAnchor } from "@/components/agent/AgentAnchor";
import { HeroSpotlight } from "@/components/motion/HeroSpotlight";
import { ButtonLink, Container, Kicker, Section } from "@/components/ui";
import { experienceAnchor } from "@/domain/experienceAnchor";
import { formatMonthRange, isCurrent } from "@/domain/monthRange";
import type { HomeExperienceRef, HomeProfile } from "@/sanity/types";

import { FALLBACK_HEADLINE, FALLBACK_NAME, FALLBACK_SUMMARY, FOCUS_AREAS } from "./identity";

/**
 * The masthead band — a compact composition, not a monumental headline.
 * Identity + one line + a way in on the left; a live status panel, the four
 * axes, a technology strip and the NODE on the right. A pointer-tracked
 * radial light plays over the band on desktop (ambient, opt-out on touch).
 */
export function Hero({
  profile,
  current,
  technologies = [],
}: {
  profile: HomeProfile | null;
  current: HomeExperienceRef | null;
  technologies?: string[];
}) {
  const name = profile?.name ?? FALLBACK_NAME;
  const headline = profile?.headline ?? FALLBACK_HEADLINE;
  const summary = profile?.shortSummary ?? FALLBACK_SUMMARY;

  const live =
    current && isCurrent(current.period)
      ? {
          label: [current.role, current.company].filter(Boolean).join(" · "),
          since: formatMonthRange(current.period),
          href: `/experiencia#${experienceAnchor(current)}`,
        }
      : null;

  return (
    <Section className="relative overflow-hidden pt-10 pb-14 sm:pt-14 sm:pb-20">
      <HeroSpotlight />
      <Container size="wide" className="relative">
        <div className="grid gap-10 lg:grid-cols-[1.35fr_1fr] lg:gap-14">
          <div className="flex flex-col">
            <Kicker>{name}</Kicker>
            <h1
              data-animate="rise"
              className="font-display mt-4 text-[clamp(2rem,4.5vw,2.9rem)] font-extrabold leading-[1.02] tracking-[var(--tracking-tight)]"
            >
              {headline}
            </h1>
            <p className="text-fg-muted mt-5 max-w-[46ch] text-md text-pretty">
              {summary}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/projects">Ver projetos</ButtonLink>
              <ButtonLink href="/experiencia" variant="secondary">
                Trajetória
              </ButtonLink>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {live ? (
              <Link
                href={live.href}
                data-surface="paper"
                className="group u-surface-interactive border-border block rounded-[var(--radius)] border bg-[var(--color-bg)] p-4 sm:p-5"
              >
                <span className="u-label flex items-center gap-2">
                  <span
                    aria-hidden
                    className="u-pulse inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-node)]"
                  />
                  Agora
                </span>
                <span className="font-display group-hover:text-accent mt-2 block text-md font-bold">
                  {live.label}
                </span>
                {live.since ? (
                  <span className="text-fg-faint mt-0.5 block font-mono text-xs">
                    {live.since}
                  </span>
                ) : null}
              </Link>
            ) : null}

            <div className="border-border grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius)] border bg-[var(--color-border)]">
              {FOCUS_AREAS.map((area) => (
                <div key={area.name} className="bg-surface p-4">
                  <p className="font-display text-sm font-bold">{area.name}</p>
                  <p className="text-fg-faint mt-1 text-xs leading-snug">
                    {area.note}
                  </p>
                </div>
              ))}
            </div>

            <div className="relative flex flex-wrap items-center justify-between gap-x-4 gap-y-2 pr-14 sm:pr-12">
              {technologies.length ? (
                <p className="text-fg-faint font-mono text-xs leading-relaxed">
                  {technologies.slice(0, 6).join(" · ")}
                </p>
              ) : (
                <span />
              )}
              <AgentAnchor
                name="hero"
                active
                className="absolute top-1/2 right-6 sm:right-3"
              />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
