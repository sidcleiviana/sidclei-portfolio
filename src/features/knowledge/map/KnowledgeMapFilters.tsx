"use client";

import type { GraphNodeType } from "@/domain/knowledgeGraph";

const TYPES: { type: GraphNodeType; label: string }[] = [
  { type: "experience", label: "Experiências" },
  { type: "project", label: "Projetos" },
  { type: "skill", label: "Competências" },
  { type: "technology", label: "Tecnologias" },
];

/** Simple type toggles (§22). Hiding a type also drops its dangling edges. */
export function KnowledgeMapFilters({
  hidden,
  onToggle,
  onReset,
  showReset,
}: {
  hidden: ReadonlySet<GraphNodeType>;
  onToggle: (t: GraphNodeType) => void;
  onReset: () => void;
  showReset: boolean;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {TYPES.map(({ type, label }) => {
        const on = !hidden.has(type);
        return (
          <button
            key={type}
            type="button"
            aria-pressed={on}
            onClick={() => onToggle(type)}
            className={`rounded-[var(--radius-sm)] border px-3 py-1.5 font-mono text-xs tracking-tight transition-colors ${
              on
                ? "border-accent bg-[var(--color-accent)]/12 text-fg"
                : "border-border text-fg-faint hover:text-fg-muted"
            }`}
          >
            {label}
          </button>
        );
      })}
      {showReset ? (
        <button
          type="button"
          onClick={onReset}
          className="u-label hover:text-fg ml-1 rounded-sm"
        >
          Visão geral
        </button>
      ) : null}
    </div>
  );
}
