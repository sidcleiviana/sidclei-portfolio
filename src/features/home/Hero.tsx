import Link from "next/link";

import { AgentAnchor } from "@/components/agent/AgentAnchor";
import { HeroSpotlight } from "@/components/motion/HeroSpotlight";
import { ButtonLink, Container, Kicker, Section } from "@/components/ui";
import { experienceAnchor } from "@/domain/experienceAnchor";
import { formatMonthRange, isCurrent } from "@/domain/monthRange";
import type { HomeExperienceRef, HomeProfile } from "@/sanity/types";

import {
  FALLBACK_HEADLINE,
  FALLBACK_NAME,
  FALLBACK_SUMMARY,
  FOCUS_AREAS,
  FOCUS_LINE,
} from "./identity";
import { PortraitSurface } from "./PortraitSurface";

/**
 * The masthead band — a compact composition, not a monumental headline.
 * Identity + positioning + a way in on the left; on the right either a live
 * status panel with the four axes (no photo) or the portrait surface (photo).
 * The headline is *positioning* (`profile.headline`); the current job title
 * stays factual and separate ("Atualmente · <role> · <company>").
 *
 * `portraitPreviewSrc` is only ever passed by the dev preview route.
 */
export function Hero({
  profile,
  current,
  technologies = [],
  portraitPreviewSrc,
}: {
  profile: HomeProfile | null;
  current: HomeExperienceRef | null;
  technologies?: string[];
  portraitPreviewSrc?: string;
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

  const hasPhoto =
    Boolean(profile?.photo?.asset?._ref) || Boolean(portraitPreviewSrc);

  return (
    <Section className="relative overflow-hidden pt-10 pb-14 sm:pt-14 sm:pb-20">
      <HeroSpotlight />
      <Container size="wide" className="relative">
        <div
          className={`grid gap-10 lg:gap-14 ${
            hasPhoto
              ? "lg:grid-cols-[1.1fr_0.9fr]"
              : "lg:grid-cols-[1.35fr_1fr]"
          }`}
        >
          <div className="flex flex-col">
            <Kicker>{name}</Kicker>
            <h1
              data-animate="rise"
              className="font-display mt-4 text-[clamp(2rem,4.5vw,2.9rem)] font-extrabold leading-[1.02] tracking-[var(--tracking-tight)]"
            >
              {headline}
            </h1>
            <p className="u-label text-fg-muted mt-4">{FOCUS_LINE}</p>
            <p className="text-fg-muted mt-5 max-w-[46ch] text-md text-pretty">
              {summary}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/projects">Ver projetos</ButtonLink>
              <ButtonLink href="/experiencia" variant="secondary">
                Trajetória
              </ButtonLink>
            </div>

            {hasPhoto && live ? (
              <p className="u-label mt-8 flex flex-wrap items-center gap-x-2 gap-y-0.5">
                <span className="inline-flex items-center gap-1.5">
                  <span
                    aria-hidden
                    className="u-pulse inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-node)]"
                  />
                  Atualmente
                </span>
                <Link href={live.href} className="hover:text-accent text-fg rounded-sm">
                  {live.label}
                </Link>
                {live.since ? (
                  <span className="text-fg-faint">{live.since}</span>
                ) : null}
              </p>
            ) : null}
          </div>

          {hasPhoto ? (
            <PortraitSurface
              photo={profile?.photo}
              previewSrc={portraitPreviewSrc}
            />
          ) : (
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
                    Atualmente
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
          )}
        </div>

        {hasPhoto ? (
          <div className="border-border mt-10 flex flex-wrap items-center justify-between gap-x-8 gap-y-3 border-t pt-6">
            <ul className="flex flex-wrap gap-x-5 gap-y-1">
              {FOCUS_AREAS.map((area) => (
                <li
                  key={area.name}
                  className="font-display text-sm font-bold"
                >
                  {area.name}
                </li>
              ))}
            </ul>
            {technologies.length ? (
              <p className="text-fg-faint font-mono text-xs leading-relaxed">
                {technologies.slice(0, 6).join(" · ")}
              </p>
            ) : null}
          </div>
        ) : null}
      </Container>
    </Section>
  );
}
