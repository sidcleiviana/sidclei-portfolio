import Link from "next/link";

import { Container, Kicker, Section } from "@/components/ui";
import type { HomeProfile } from "@/sanity/types";

const ROUTES = [
  { href: "/projects", label: "Projetos", note: "O que foi construído, e as evidências." },
  { href: "/experiencia", label: "Experiência", note: "A trajetória, fase por fase." },
  { href: "/conhecimento", label: "Conhecimento", note: "Competências e tecnologias, em contexto." },
];

/**
 * The closing step — three routes and, only when the CMS profile carries them,
 * the real contact links. Nothing personal is assumed.
 */
export function HomeOutro({ profile }: { profile: HomeProfile | null }) {
  const links = (profile?.links ?? [])
    .filter((l) => l?.url && l?.label)
    .map((l) => ({ key: l._key ?? (l.url as string), url: l.url as string, label: l.label as string }));
  const email = profile?.professionalEmail?.trim();
  const resume = profile?.resumeUrl?.trim();
  const contact = [
    ...links,
    ...(resume ? [{ key: "cv", url: resume, label: "Currículo" }] : []),
    ...(email ? [{ key: "email", url: `mailto:${email}`, label: email }] : []),
  ];

  return (
    <Section spacing="lg">
      <Container size="wide">
        <Kicker>Explorar</Kicker>
        <ul className="border-border mt-6 grid gap-px overflow-hidden rounded-[var(--radius)] border bg-[var(--color-border)] sm:grid-cols-3">
          {ROUTES.map((r) => (
            <li key={r.href} className="bg-surface">
              <Link
                href={r.href}
                className="group u-surface-interactive block h-full p-5"
              >
                <span className="font-display group-hover:text-accent inline-flex items-center gap-2 text-lg font-bold">
                  {r.label} <span aria-hidden>→</span>
                </span>
                <span className="text-fg-muted mt-1.5 block text-sm text-pretty">
                  {r.note}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        {contact.length ? (
          <div className="mt-8 flex flex-wrap gap-x-7 gap-y-2">
            {contact.map((c) =>
              c.url.startsWith("mailto:") ? (
                <a key={c.key} href={c.url} className="u-label hover:text-fg rounded-sm">
                  {c.label}
                </a>
              ) : (
                <a
                  key={c.key}
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="u-label hover:text-fg rounded-sm"
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
