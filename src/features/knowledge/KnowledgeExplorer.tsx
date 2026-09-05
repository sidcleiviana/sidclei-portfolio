"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { AgentAnchor, repositionAgent } from "@/components/agent/AgentAnchor";
import { Chip, Tag } from "@/components/ui";
import { experienceAnchor } from "@/domain/experienceAnchor";

import { RelationalScope } from "./RelationalScope";

type CtxExperience = { _id: string; company: string | null; role: string | null };
type CtxProject = {
  _id: string;
  title: string | null;
  slug: string | null;
  visibility?: string | null;
};

export type ExplorerEntity = {
  _id: string;
  kind: "skill" | "technology";
  name: string;
  slug: string | null;
  category: string | null;
  shortDescription?: string | null;
  contextExperiences: CtxExperience[];
  contextProjects: CtxProject[];
  contextTechnologies?: (string | null)[];
};

export type ExplorerGroup = { label: string | null; items: ExplorerEntity[] };

const SEGMENT = { skill: "competencias", technology: "tecnologias" } as const;

function visibleProjects(list: CtxProject[]) {
  return list.filter(
    (p) =>
      p.slug &&
      p.title &&
      (p.visibility === "public" ||
        p.visibility === "anonymized" ||
        p.visibility == null)
  );
}

function DetailPanel({ entity }: { entity: ExplorerEntity }) {
  const experiences = entity.contextExperiences.filter((e) => e.company || e.role);
  const projects = visibleProjects(entity.contextProjects);
  const contextTech = (entity.contextTechnologies ?? []).filter(
    (t): t is string => Boolean(t)
  );

  return (
    <div className="u-stagger relative pl-8 lg:pl-0">
      {/* mobile: the agent rides the panel header (its own space); desktop
          uses the per-chip anchors on the rail */}
      <AgentAnchor
        name="knowledge"
        active
        className="absolute top-1.5 left-1 lg:hidden"
      />
      <p className="u-label">
        {entity.kind === "skill" ? "Competência" : "Tecnologia"}
        {entity.category ? (
          <span className="text-fg-faint"> · {entity.category}</span>
        ) : null}
      </p>
      <div className="mt-2 flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <h3 className="font-display text-xl font-bold sm:text-2xl">{entity.name}</h3>
        {entity.slug ? (
          <Link
            href={`/conhecimento/${SEGMENT[entity.kind]}/${entity.slug}`}
            className="u-label text-accent rounded-sm hover:text-[var(--color-accent-strong)] [&:hover_>span]:translate-x-0.5"
          >
            Página{" "}
            <span aria-hidden className="inline-block transition-transform">
              →
            </span>
          </Link>
        ) : null}
      </div>
      {entity.shortDescription ? (
        <p className="text-fg-muted mt-3 max-w-[54ch] text-md text-pretty">
          {entity.shortDescription}
        </p>
      ) : null}

      {experiences.length ? (
        <div className="mt-6">
          <p className="u-label mb-2">Apareceu em</p>
          <ul className="flex flex-col gap-1.5">
            {experiences.map((e) => (
              <li key={e._id}>
                <Link
                  href={`/experiencia#${experienceAnchor(e)}`}
                  className="font-display hover:text-accent text-sm font-bold"
                >
                  {[e.role, e.company].filter(Boolean).join(" · ")}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {projects.length ? (
        <div className="mt-5">
          <p className="u-label mb-2">Demonstrado em</p>
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

      {entity.kind === "skill" && contextTech.length ? (
        <div className="mt-5">
          <p className="u-label mb-2">Tecnologias presentes nesses contextos</p>
          <p className="text-fg-faint mb-2 text-xs leading-snug">
            Ferramentas usadas nas experiências e projetos acima — não atribuídas
            diretamente à competência.
          </p>
          <div className="flex flex-wrap gap-x-3 gap-y-1">
            {contextTech.map((name) => (
              <Tag key={name}>{name}</Tag>
            ))}
          </div>
        </div>
      ) : null}

      {!experiences.length && !projects.length ? (
        <p className="text-fg-faint mt-5 text-sm">
          Ainda sem contexto público registrado.
        </p>
      ) : null}
    </div>
  );
}

/**
 * The relational explorer. A chip rail (optionally grouped by category) drives
 * a detail panel that updates in place: the real contexts a skill / technology
 * appeared in, and — for a skill — the technologies present in those contexts,
 * labelled as such. First item selected by default; the resting state is
 * complete without interacting. Pointing at a chip also dims the chips that
 * share no context (CSS relational highlight).
 */
export function KnowledgeExplorer({
  groups,
  footer,
}: {
  groups: ExplorerGroup[];
  footer?: React.ReactNode;
}) {
  const flat = useMemo(() => groups.flatMap((g) => g.items), [groups]);
  const [selectedId, setSelectedId] = useState(flat[0]?._id ?? null);
  const selected = flat.find((e) => e._id === selectedId) ?? flat[0];

  if (!flat.length) return null;

  return (
    <div className="lg:grid lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-12">
      <RelationalScope className="flex flex-col gap-6">
        {groups.map((group, gi) => (
          <div key={group.label ?? gi}>
            {group.label ? (
              <p className="u-label mb-2.5">{group.label}</p>
            ) : null}
            <div className="flex flex-wrap gap-2">
              {group.items.map((entity) => {
                const on = entity._id === selected?._id;
                const keys = entity.contextExperiences
                  .map((e) => e.company)
                  .filter(Boolean)
                  .join(",");
                return (
                  <span key={entity._id} className="relative">
                    <Chip
                      data-rel=""
                      data-rel-keys={keys}
                      selected={on}
                      onClick={() => {
                        setSelectedId(entity._id);
                        repositionAgent();
                      }}
                    >
                      {entity.name}
                    </Chip>
                    <AgentAnchor
                      name="knowledge"
                      active={on}
                      className="absolute top-1/2 -right-1.5 hidden lg:inline-block"
                    />
                  </span>
                );
              })}
            </div>
          </div>
        ))}
        {footer ? <div className="mt-2">{footer}</div> : null}
      </RelationalScope>

      <div className="border-border mt-8 border-t pt-8 lg:mt-0 lg:border-t-0 lg:pt-0">
        {selected ? <DetailPanel key={selected._id} entity={selected} /> : null}
      </div>
    </div>
  );
}
