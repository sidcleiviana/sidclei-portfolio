import { Container } from "@/components/ui/Container";
import type { Profile } from "@/sanity/types";

/**
 * Structural footer. Professional links come from the CMS `profile.links` —
 * nothing is invented here (Design System §15).
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

  return (
    <footer className="border-border mt-24 border-t">
      <Container className="flex flex-col gap-6 py-10 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-fg font-mono text-sm font-medium">
            {profile?.name ?? "Sidclei Viana"}
          </p>
          <p className="text-fg-muted mt-1 text-sm">
            {profile?.headline ?? "Desenvolvedor de Software"}
          </p>
        </div>

        {links.length ? (
          <nav aria-label="Links profissionais">
            <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
              {links.map((link) => (
                <li key={link._key ?? link.url}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-fg-muted hover:text-fg rounded-sm"
                  >
                    {link.label}
                    <span className="sr-only"> (abre em nova aba)</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}
      </Container>

      <Container className="border-border text-fg-muted border-t py-5 text-xs">
        <p>{note ?? `© ${year} Sidclei Viana · Next.js + Sanity`}</p>
      </Container>
    </footer>
  );
}
