import Link from "next/link";

import { Container } from "@/components/ui/Container";

import { MobileNav } from "./MobileNav";
import { PRIMARY_NAV } from "./nav";

export function SiteHeader() {
  return (
    <header className="border-border bg-bg/80 sticky top-0 z-50 border-b backdrop-blur">
      <Container className="flex h-14 items-center justify-between">
        <Link
          href="/"
          className="text-fg rounded-sm font-mono text-sm font-medium tracking-tight"
        >
          Sidclei&nbsp;Viana
        </Link>

        <nav aria-label="Navegação principal" className="hidden md:block">
          <ul className="flex items-center gap-7 text-sm">
            {PRIMARY_NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-fg-muted hover:text-fg rounded-sm"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <MobileNav />
      </Container>
    </header>
  );
}
