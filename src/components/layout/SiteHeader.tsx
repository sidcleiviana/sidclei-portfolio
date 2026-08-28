import Link from "next/link";

import { Container } from "@/components/ui/Container";

const NAV = [
  { href: "/", label: "Início" },
  { href: "/projects", label: "Projetos" },
] as const;

export function SiteHeader() {
  return (
    <header className="border-border border-b">
      <Container className="flex h-14 items-center justify-between">
        <Link href="/" className="text-sm font-semibold tracking-tight">
          Sidclei Viana
        </Link>
        <nav aria-label="Navegação principal">
          <ul className="flex items-center gap-6 text-sm">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-muted hover:text-foreground transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </header>
  );
}
