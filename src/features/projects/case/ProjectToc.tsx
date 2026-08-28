"use client";

import { useEffect, useState } from "react";

import type { CaseSection } from "@/domain/caseSections";

/**
 * In-page navigation for a long case (Sprint §11, §12). Desktop: a discreet
 * sticky rail. Mobile: a collapsed `<details>`. The active section is tracked
 * with a native IntersectionObserver — no library, no scroll listener. The
 * links work with JS disabled; the highlight is a progressive enhancement.
 */
export function ProjectToc({ sections }: { sections: CaseSection[] }) {
  const [activeId, setActiveId] = useState<string | null>(
    sections[0]?.id ?? null
  );

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const targets = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!targets.length) return;

    const seen = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          seen.set(
            entry.target.id,
            entry.isIntersecting ? entry.intersectionRatio : 0
          );
        }
        let best: string | null = null;
        let bestRatio = 0;
        for (const [id, ratio] of seen) {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            best = id;
          }
        }
        if (best) setActiveId(best);
      },
      { rootMargin: "-96px 0px -60% 0px", threshold: [0, 0.25, 0.5, 1] }
    );
    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, [sections]);

  if (!sections.length) return null;

  const list = (
    <ol className="space-y-1.5">
      {sections.map((section) => {
        const active = section.id === activeId;
        return (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              aria-current={active ? "location" : undefined}
              className={`flex items-center gap-2 rounded-sm py-0.5 text-sm ${
                active ? "text-fg font-medium" : "text-fg-muted hover:text-fg"
              }`}
            >
              <span
                aria-hidden
                className={`h-px w-4 shrink-0 transition-[width,background-color] ${
                  active
                    ? "w-6 bg-[var(--color-accent)]"
                    : "bg-[var(--color-border-strong)]"
                }`}
              />
              {section.label}
            </a>
          </li>
        );
      })}
    </ol>
  );

  return (
    <>
      {/* Desktop rail */}
      <nav
        aria-label="Índice do projeto"
        className="sticky top-24 hidden xl:block"
      >
        <p className="text-fg-muted mb-3 font-mono text-xs font-medium tracking-[0.14em] uppercase">
          Neste projeto
        </p>
        {list}
      </nav>

      {/* Mobile disclosure */}
      <details className="border-border bg-bg-subtle mb-8 rounded-md border xl:hidden">
        <summary className="text-fg-muted cursor-pointer list-none px-4 py-3 font-mono text-xs font-medium tracking-[0.14em] uppercase">
          Índice do projeto
        </summary>
        <nav aria-label="Índice do projeto" className="px-4 pb-4">
          {list}
        </nav>
      </details>
    </>
  );
}
