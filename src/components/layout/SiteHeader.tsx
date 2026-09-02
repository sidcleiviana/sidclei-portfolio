import Link from "next/link";

import { Container } from "@/components/ui/Container";

import { DesktopNav } from "./DesktopNav";
import { MobileNav } from "./MobileNav";

/**
 * Editorial masthead: wordmark left, a numbered index right. A single hairline
 * binds it to the page. Stays simple (Sprint 7 §27–29).
 */
export function SiteHeader() {
  return (
    <header className="border-border bg-bg/85 sticky top-0 z-50 border-b backdrop-blur-md">
      <Container
        size="editorial"
        className="flex h-16 items-center justify-between sm:h-20"
      >
        <Link
          href="/"
          className="font-display rounded-sm text-xl tracking-[var(--tracking-tight)] sm:text-2xl"
        >
          Sidclei&nbsp;Viana
        </Link>

        <DesktopNav />
        <MobileNav />
      </Container>
    </header>
  );
}
