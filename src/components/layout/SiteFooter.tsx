import Link from "next/link";

import { Container } from "@/components/ui/Container";
import type { Profile } from "@/sanity/types";

import { PRIMARY_NAV } from "./nav";

/**
 * Editorial close, not a corporate footer: name, headline, the same numbered
 * index, real CMS links, and air (Sprint 7 §30). Nothing is invented — links
 * come from `profile.links`.
 */
export function SiteFooter({
  profile,
  note,
}: {
  profile?: Profile | null;
  note?: string | null;
}) {
  const links = (profile?.links ?? []).filter((l) => l?.url && l?.label);
  const year = new Date().getFullYear();
  const nav = PRIMARY_NAV.filter((i) => i.href !== "/");

  return (
    <footer className="mt-32 border-t border-[var(--color-rule)]">
      <Container size="editorial" className="py-16 sm:py-24">
        <div className="grid gap-12 sm:grid-cols-[1fr_auto] sm:gap-16">
          <div className="max-w-[var(--container-prose)]">
            <p className="font-display text-2xl sm:text-3xl">
              {profile?.name ?? "Sidclei Viana"}
            </p>
            <p className="text-fg-muted mt-2 text-lg text-pretty">
              {profile?.headline ?? "Desenvolvedor de Software"}
            </p>
          </div>

          <nav
            aria-label="Navegação do rodapé"
            className="flex flex-col gap-3 sm:items-end"
          >
            {nav.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                className="u-label text-fg-muted hover:text-fg inline-flex items-center gap-2 rounded-sm"
              >
                <span aria-hidden className="text-fg-faint tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {links.length ? (
          <nav
            aria-label="Links profissionais"
            className="mt-16 border-t border-[var(--color-border)] pt-6"
          >
            <ul className="flex flex-wrap gap-x-8 gap-y-2">
              {links.map((link) => (
                <li key={link._key ?? link.url}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="u-label text-fg-muted hover:text-fg rounded-sm"
                  >
                    {link.label}
                    <span className="sr-only"> (abre em nova aba)</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}

        <p className="text-fg-faint mt-16 font-mono text-xs">
          {note ?? `© ${year} Sidclei Viana · Next.js + Sanity`}
        </p>
      </Container>
    </footer>
  );
}
