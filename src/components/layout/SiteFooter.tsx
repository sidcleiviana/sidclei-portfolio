import Link from "next/link";

import { Container } from "@/components/ui/Container";
import type { Profile } from "@/sanity/types";

import { PRIMARY_NAV } from "./nav";

/**
 * The closing surface — navy-deep. Name, headline, the primary routes and the
 * real CMS links. Nothing invented.
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
    <footer data-surface="deep" className="mt-24 border-t border-[var(--color-border)]">
      <Container size="wide" className="py-14 sm:py-20">
        <div className="grid gap-10 sm:grid-cols-[1fr_auto] sm:gap-16">
          <div className="max-w-[var(--container-prose)]">
            <p className="font-display text-xl font-bold sm:text-2xl">
              {profile?.name ?? "Sidclei Viana"}
            </p>
            <p className="text-fg-muted mt-1.5 text-md text-pretty">
              {profile?.headline ?? "Desenvolvedor de Software"}
            </p>
          </div>

          <nav
            aria-label="Navegação do rodapé"
            className="flex flex-col gap-2.5 sm:items-end"
          >
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="u-label hover:text-fg rounded-sm"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {links.length ? (
          <nav
            aria-label="Links profissionais"
            className="mt-12 border-t border-[var(--color-border)] pt-5"
          >
            <ul className="flex flex-wrap gap-x-7 gap-y-2">
              {links.map((link) => (
                <li key={link._key ?? link.url}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="u-label hover:text-fg rounded-sm"
                  >
                    {link.label}
                    <span className="sr-only"> (abre em nova aba)</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}

        <p className="text-fg-faint mt-12 font-mono text-xs">
          {note ?? `© ${year} Sidclei Viana · Next.js + Sanity`}
        </p>
      </Container>
    </footer>
  );
}
