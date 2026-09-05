"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { PRIMARY_NAV } from "./nav";

const ITEMS = PRIMARY_NAV.filter((i) => i.href !== "/");

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function DesktopNav() {
  const pathname = usePathname();
  return (
    <nav aria-label="Navegação principal" className="hidden md:block">
      <ul className="flex items-center gap-7">
        {ITEMS.map((item) => {
          const active = isActive(pathname, item.href);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`u-label relative rounded-sm pb-1 transition-colors after:absolute after:inset-x-0 after:-bottom-px after:h-px after:origin-left after:bg-[var(--color-accent)] after:transition-transform after:duration-200 ${
                  active
                    ? "text-fg after:scale-x-100"
                    : "hover:text-fg after:scale-x-0 hover:after:scale-x-100 hover:after:bg-[var(--color-border-strong)]"
                }`}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
