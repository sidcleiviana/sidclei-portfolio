import Link from "next/link";

import { Container } from "@/components/ui/Container";

import { DesktopNav } from "./DesktopNav";
import { MobileNav } from "./MobileNav";

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

        <DesktopNav />
        <MobileNav />
      </Container>
    </header>
  );
}
