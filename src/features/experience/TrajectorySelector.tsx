"use client";

import Link from "next/link";
import { useId, useRef, useState } from "react";

import { TagLink } from "@/components/ui";
import { formatMonthRange, isCurrent } from "@/domain/monthRange";

type Ref = { _id: string; name: string | null; slug: string | null } | null;
type ProjectRef = {
  _id: string;
  title: string | null;
  slug: string | null;
  visibility?: string | null;
} | null;

export type TrajectoryEntry = {
  _id: string;
  company: string | null;
  role: string | null;
  period: { startDate?: string | null; endDate?: string | null; ongoing?: boolean | null } | null;
  summary?: string | null;
  responsibilities?: (string | null)[] | null;
  skills?: Ref[] | null;
  technologies?: Ref[] | null;
  projects?: ProjectRef[] | null;
};

function year(p: TrajectoryEntry["period"]): string {
  const start = p?.startDate?.slice(0, 4) ?? "";
  if (p?.ongoing || (start && !p?.endDate)) return `${start} — Atual`;
  return start;
}

function Detail({ entry, id }: { entry: TrajectoryEntry; id?: string }) {
  const responsibilities = (entry.responsibilities ?? []).filter(
    (r): r is string => Boolean(r?.trim())
  );
  const skills = (entry.skills ?? []).filter((s): s is NonNullable<Ref> => Boolean(s?.name));
  const technologies = (entry.technologies ?? []).filter(
    (t): t is NonNullable<Ref> => Boolean(t?.name)
  );
  const projects = (entry.projects ?? []).filter(
    (p): p is NonNullable<ProjectRef> =>
      Boolean(p?.slug && p?.title) &&
      (p?.visibility === "public" || p?.visibility === "anonymized" || p?.visibility == null)
  );

  return (
    <div id={id} className="u-fade">
      <p className="u-label">
        {formatMonthRange(entry.period) ?? year(entry.period)}
        {isCurrent(entry.period) ? (
          <span className="text-[var(--color-node)]"> · Atual</span>
        ) : null}
      </p>
      <h3 className="font-display mt-2 text-xl font-bold sm:text-2xl">
        {entry.role ?? entry.company}
      </h3>
      {entry.role && entry.company ? (
        <p className="text-fg-muted mt-1 font-mono text-xs">{entry.company}</p>
      ) : null}

      {entry.summary ? (
        <p className="text-fg-muted mt-5 max-w-[54ch] text-md text-pretty">
          {entry.summary}
        </p>
      ) : null}

      {responsibilities.length ? (
        <ul className="mt-5 flex flex-col gap-2">
          {responsibilities.map((item) => (
            <li key={item} className="text-fg-muted flex gap-3 text-sm">
              <span aria-hidden className="text-fg-faint">—</span>
              {item}
            </li>
          ))}
        </ul>
      ) : null}

      {skills.length ? (
        <div className="mt-6">
          <p className="u-label mb-2">Competências</p>
          <div className="flex flex-wrap gap-x-3 gap-y-1.5">
            {skills.map((s) => (
              <TagLink
                key={s._id}
                href={`/conhecimento/competencias/${s.slug}`}
                tone="accent"
              >
                {s.name}
              </TagLink>
            ))}
          </div>
        </div>
      ) : null}

      {technologies.length ? (
        <div className="mt-4">
          <p className="u-label mb-2">Tecnologias</p>
          <div className="flex flex-wrap gap-x-3 gap-y-1.5">
            {technologies.map((t) => (
              <TagLink key={t._id} href={`/conhecimento/tecnologias/${t.slug}`}>
                {t.name}
              </TagLink>
            ))}
          </div>
        </div>
      ) : null}

      {projects.length ? (
        <div className="mt-6">
          <p className="u-label mb-2">Projetos deste período</p>
          <ul className="flex flex-col gap-1.5">
            {projects.map((p) => (
              <li key={p._id}>
                <Link
                  href={`/projects/${p.slug}`}
                  className="font-display hover:text-accent text-sm font-bold"
                >
                  {p.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

/**
 * The trajectory as an interactive selector — the pivot of the new direction.
 * Desktop: a role list drives a detail panel that updates in place. Mobile: a
 * native-feeling accordion, each role expanding its own detail. The current
 * role is selected by default, so the resting state already tells the story.
 */
export function TrajectorySelector({
  experiences,
}: {
  experiences: TrajectoryEntry[];
}) {
  const [selected, setSelected] = useState(0);
  const base = useId();
  const tabsRef = useRef<HTMLDivElement>(null);

  if (!experiences.length) return null;

  const onKey = (e: React.KeyboardEvent) => {
    const last = experiences.length - 1;
    let next = selected;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") next = Math.min(last, selected + 1);
    else if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = Math.max(0, selected - 1);
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = last;
    else return;
    e.preventDefault();
    setSelected(next);
    tabsRef.current
      ?.querySelectorAll<HTMLButtonElement>("[role='tab']")
      [next]?.focus();
  };

  return (
    <div className="lg:grid lg:grid-cols-[minmax(0,19rem)_1fr] lg:gap-12">
      {/* selector */}
      <div
        ref={tabsRef}
        role="tablist"
        aria-orientation="vertical"
        aria-label="Selecionar experiência"
        onKeyDown={onKey}
        className="border-border flex flex-col border-t lg:border-t-0"
      >
        {experiences.map((entry, i) => {
          const on = i === selected;
          const panelId = `${base}-p-${i}`;
          const tabId = `${base}-t-${i}`;
          return (
            <div key={entry._id} className="border-border border-b lg:border-b-0">
              <button
                id={tabId}
                role="tab"
                type="button"
                aria-selected={on}
                aria-controls={panelId}
                tabIndex={on ? 0 : -1}
                onClick={() => setSelected(i)}
                className={`group flex w-full flex-col items-start gap-0.5 py-4 text-left transition-colors lg:border-l-2 lg:pl-4 ${
                  on
                    ? "lg:border-[var(--color-accent)]"
                    : "lg:border-transparent lg:hover:border-[var(--color-border-strong)]"
                }`}
              >
                <span
                  className={`font-mono text-xs ${on ? "text-[var(--color-accent)]" : "text-fg-faint"}`}
                >
                  {year(entry.period)}
                </span>
                <span
                  className={`font-display text-md font-bold ${on ? "text-fg" : "text-fg-muted group-hover:text-fg"}`}
                >
                  {entry.role ?? entry.company}
                </span>
                {entry.role && entry.company ? (
                  <span className="text-fg-faint font-mono text-xs">
                    {entry.company}
                  </span>
                ) : null}
              </button>

              {/* mobile: inline detail for the selected row */}
              <div
                id={`${panelId}-m`}
                role="tabpanel"
                aria-labelledby={tabId}
                hidden={!on}
                className="pb-6 lg:hidden"
              >
                <Detail entry={entry} />
              </div>
            </div>
          );
        })}
      </div>

      {/* desktop: shared detail panel */}
      <div
        role="tabpanel"
        aria-labelledby={`${base}-t-${selected}`}
        className="hidden lg:block"
      >
        {experiences[selected] ? (
          <Detail key={selected} entry={experiences[selected]!} />
        ) : null}
      </div>
    </div>
  );
}
