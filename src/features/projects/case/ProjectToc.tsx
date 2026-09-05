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
    <ol className="flex flex-col">
      {sections.map((section) => {
        const active = section.id === activeId;
        return (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              aria-current={active ? "location" : undefined}
              className={`u-label block border-l-2 py-2 pl-3 transition-colors ${
                active
                  ? "border-[var(--color-accent)] text-fg"
                  : "border-border text-fg-muted hover:text-fg hover:border-border-strong"
              }`}
            >
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
        <p className="u-label text-fg-faint mb-4">Neste projeto</p>
        {list}
      </nav>

      {/* Mobile disclosure */}
      <details className="border-border mb-10 border-y xl:hidden">
        <summary className="u-label cursor-pointer list-none py-3">
          Índice do projeto
        </summary>
        <nav aria-label="Índice do projeto" className="pb-4">
          {list}
        </nav>
      </details>
    </>
  );
}
