"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";

import { PRIMARY_NAV } from "./nav";

/**
 * Accessible disclosure menu for narrow viewports. Keyboard: Enter/Space
 * toggles, Escape closes and returns focus to the trigger. Restyled for the
 * editorial identity, behaviour unchanged (Sprint 7 §29).
 */
export function MobileNav() {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    const onPointer = (e: PointerEvent) => {
      const t = e.target as Node;
      if (!panelRef.current?.contains(t) && !triggerRef.current?.contains(t)) {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    panelRef.current?.querySelector("a")?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Fechar menu" : "Abrir menu"}
        onClick={() => setOpen((v) => !v)}
        className="u-label text-fg -mr-2 inline-flex h-11 items-center gap-2 rounded-sm px-2"
      >
        {open ? "Fechar" : "Menu"}
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          aria-hidden
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        >
          {open ? (
            <path d="M4 4l10 10M14 4L4 14" />
          ) : (
            <path d="M2 5h14M2 9h14M2 13h14" />
          )}
        </svg>
      </button>

      {open ? (
        <div
          ref={panelRef}
          id={panelId}
          className="border-border bg-bg absolute inset-x-0 top-full border-b"
        >
          <nav
            aria-label="Navegação principal"
            className="px-[var(--gutter)] py-4"
          >
            <ul className="flex flex-col">
              {PRIMARY_NAV.map((item, i) => {
                const active =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);
                return (
                  <li key={item.href} className="border-border border-t">
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`flex items-baseline gap-3 py-3.5 ${
                        active ? "text-fg" : "text-fg-muted"
                      }`}
                    >
                      <span aria-hidden className="u-label text-fg-faint">
                        {String(i).padStart(2, "0")}
                      </span>
                      <span className="font-display text-xl">{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      ) : null}
    </div>
  );
}
