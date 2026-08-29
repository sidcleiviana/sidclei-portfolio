import Link from "next/link";

import { Container, Section, Stack, TextLink } from "@/components/ui";
import type { HomeProfile } from "@/sanity/types";

/**
 * The closing step: a clear way forward (Sprint §23). Professional links,
 * résumé and email appear only when they exist in the CMS `profile` — nothing
 * personal is assumed (Sprint §35).
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
  const hasContact = links.length > 0 || Boolean(email) || Boolean(resume);

  return (
    <Section spacing="lg">
      <Container>
        <div className="border-border bg-surface rounded-lg border p-6 sm:p-8">
          <Stack gap="md">
            <p className="text-fg-muted font-mono text-xs font-medium tracking-[0.14em] uppercase">
              Explorar
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
              <Link
                href="/projects"
                className="border-border-strong hover:border-fg/30 hover:bg-bg-subtle flex-1 rounded-md border px-4 py-3 font-medium"
              >
                Projetos
                <span className="text-fg-muted mt-0.5 block text-sm font-normal">
                  O que foi construído, e as evidências.
                </span>
              </Link>
              <Link
                href="/experiencia"
                className="border-border-strong hover:border-fg/30 hover:bg-bg-subtle flex-1 rounded-md border px-4 py-3 font-medium"
              >
                Experiência
                <span className="text-fg-muted mt-0.5 block text-sm font-normal">
                  A trajetória, fase por fase.
                </span>
              </Link>
            </div>

            {hasContact ? (
              <div className="border-border flex flex-wrap gap-x-5 gap-y-2 border-t pt-4 text-sm">
                {links.map((link) => (
                  <TextLink key={link.key} href={link.url}>
                    {link.label}
                  </TextLink>
                ))}
                {resume ? <TextLink href={resume}>Currículo</TextLink> : null}
                {email ? (
                  <a
                    href={`mailto:${email}`}
                    className="text-accent rounded-sm underline decoration-[var(--color-accent)]/35 underline-offset-[3px] hover:decoration-[var(--color-accent)]"
                  >
                    {email}
                  </a>
                ) : null}
              </div>
            ) : null}
          </Stack>
        </div>
      </Container>
    </Section>
  );
}
