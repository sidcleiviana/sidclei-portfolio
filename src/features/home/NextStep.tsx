import Link from "next/link";

import { Container, Section, SectionMarker } from "@/components/ui";
import type { HomeProfile } from "@/sanity/types";

const ROUTES = [
  {
    href: "/projects",
    label: "Projetos",
    note: "O que foi construído, e as evidências.",
  },
  {
    href: "/experiencia",
    label: "Experiência",
    note: "A trajetória, fase por fase.",
  },
  {
    href: "/conhecimento",
    label: "Conhecimento",
    note: "Competências e tecnologias, em contexto.",
  },
];

/**
 * The closing step (Sprint 7 §31 layout): three routes as large serif links,
 * and a contact line that appears only when the CMS `profile` actually carries
 * links, résumé or email — nothing personal is assumed.
 */
export function NextStep({ profile }: { profile: HomeProfile | null }) {
  const links = (profile?.links ?? [])
    .filter((l) => l?.url && l?.label)
    .map((l) => ({
      key: l._key ?? (l.url as string),
      url: l.url as string,
      label: l.label as string,
    }));
  const email = profile?.professionalEmail?.trim();
  const resume = profile?.resumeUrl?.trim();
  const contact = [
    ...links,
    ...(resume ? [{ key: "cv", url: resume, label: "Currículo" }] : []),
    ...(email ? [{ key: "email", url: `mailto:${email}`, label: email }] : []),
  ];

  return (
    <Section
      spacing="lg"
      aria-labelledby="next-step-title"
      data-surface="tonal"
    >
      <Container size="editorial">
        <SectionMarker id="next-step-title" className="text-fg-muted">
          Explorar
        </SectionMarker>

        <ul className="mt-8 border-t border-[var(--color-rule)]">
          {ROUTES.map((r, i) => (
            <li key={r.href} className="border-b border-[var(--color-border)]">
              <Link
                href={r.href}
                className="group grid gap-x-8 gap-y-1 py-8 sm:grid-cols-12 sm:items-baseline"
              >
                <span
                  aria-hidden
                  className="u-label text-fg-faint tabular-nums sm:col-span-1"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-display group-hover:text-accent inline-flex items-center gap-3 text-3xl sm:col-span-6 sm:text-4xl">
                  {r.label}
                  <span aria-hidden className="u-arrow text-xl">
                    →
                  </span>
                </span>
                <span className="text-fg-muted text-pretty sm:col-span-5">
                  {r.note}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        {contact.length ? (
          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-2">
            {contact.map((c) =>
              c.url.startsWith("mailto:") ? (
                <a
                  key={c.key}
                  href={c.url}
                  className="u-label text-fg-muted hover:text-fg rounded-sm"
                >
                  {c.label}
                </a>
              ) : (
                <a
                  key={c.key}
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="u-label text-fg-muted hover:text-fg rounded-sm"
                >
                  {c.label}
                  <span className="sr-only"> (abre em nova aba)</span>
                </a>
              )
            )}
          </div>
        ) : null}
      </Container>
    </Section>
  );
}
