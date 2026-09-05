import Link from "next/link";

import { Container } from "@/components/ui/Container";

import { DesktopNav } from "./DesktopNav";
import { MobileNav } from "./MobileNav";

/**
 * Compact interface bar: wordmark left, primary routes right, one hairline
 * binding it to the page. Sticky, graphite, backdrop-blurred.
 */
export function SiteHeader() {
  return (
    <header className="border-border bg-[var(--color-bg)]/80 sticky top-0 z-50 border-b backdrop-blur-md">
      <Container
        size="wide"
        className="flex h-14 items-center justify-between sm:h-16"
      >
        <Link
          href="/"
          className="font-display rounded-sm text-[0.95rem] font-bold tracking-[var(--tracking-tight)] sm:text-base"
        >
          Sidclei&nbsp;Viana
        </Link>

        <DesktopNav />
        <MobileNav />
      </Container>
    </header>
  );
}
