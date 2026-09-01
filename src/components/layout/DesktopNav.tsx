"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { PRIMARY_NAV } from "./nav";

/** The numbered index — everything except "Início", which the wordmark covers. */
const ITEMS = PRIMARY_NAV.filter((i) => i.href !== "/");

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function DesktopNav() {
  const pathname = usePathname();
  return (
    <nav aria-label="Navegação principal" className="hidden md:block">
      <ul className="flex items-center gap-8">
        {ITEMS.map((item, i) => {
          const active = isActive(pathname, item.href);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`u-label group inline-flex items-center gap-2 rounded-sm ${
                  active ? "text-fg" : "hover:text-fg"
                }`}
              >
                <span aria-hidden className="text-fg-faint tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className={`border-b pb-0.5 ${
                    active
                      ? "border-[var(--color-accent)]"
                      : "border-transparent group-hover:border-[var(--color-border-strong)]"
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
