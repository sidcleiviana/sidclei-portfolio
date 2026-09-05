"use client";

import Link from "next/link";
import { useState } from "react";

import { Chip, Tag } from "@/components/ui";

export type FeaturedProjectView = {
  title: string;
  slug: string;
  shortDescription: string | null;
  typeLabel: string;
  roles: string[];
  technologies: string[];
};

/** Names that read as an external integration rather than a library. */
function isIntegration(name: string) {
  return /\bapi\b/i.test(name) || /whatsapp|cloud|webhook/i.test(name);
}

const CONTEXT: Record<string, string> = {
  "WhatsApp Cloud API": "Integração com o WhatsApp.",
  "OpenAI API": "Integração com a API da OpenAI.",
};

/**
 * The featured project as an interactive composition — not an architecture
 * diagram. It shows the project's declared integrations and the layer Sidclei
 * worked on; pointing at an integration reveals a one-line note. The resting
 * state is complete: title, description, roles and full stack are all visible
 * without interacting.
 */
export function FeaturedProjectCard({ project }: { project: FeaturedProjectView }) {
  const integrations = project.technologies.filter(isIntegration);
  const [active, setActive] = useState<string | null>(null);

  const note = active
    ? (CONTEXT[active] ?? "Integração declarada do projeto.")
    : "As integrações declaradas do projeto e a camada em que atuei.";

  return (
    <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-14">
      <div>
        <p className="u-label">
          {project.typeLabel}
          <span aria-hidden className="text-fg-faint"> · Em destaque</span>
        </p>
        <h2 className="font-display mt-3 text-[clamp(1.6rem,3.2vw,2.3rem)] font-extrabold leading-[1.05]">
          <Link href={`/projects/${project.slug}`} className="hover:text-accent rounded-sm">
            {project.title}
          </Link>
        </h2>
        {project.shortDescription ? (
          <p className="text-fg-muted mt-4 max-w-[52ch] text-md text-pretty">
            {project.shortDescription}
          </p>
        ) : null}
        <Link
          href={`/projects/${project.slug}`}
          className="u-label text-accent mt-6 inline-block rounded-sm hover:text-[var(--color-accent-strong)]"
        >
          Abrir case →
        </Link>
      </div>

      <div className="flex flex-col gap-5">
        {integrations.length ? (
          <div>
            <p className="u-label">Integrações</p>
            <div className="mt-2.5 flex flex-wrap gap-2">
              {integrations.map((name) => (
                <Chip
                  key={name}
                  selected={active === name}
                  onPointerEnter={() => setActive(name)}
                  onFocus={() => setActive(name)}
                  onPointerLeave={() => setActive(null)}
                  onBlur={() => setActive(null)}
                  onClick={() =>
                    setActive((cur) => (cur === name ? null : name))
                  }
                >
                  {name}
                </Chip>
              ))}
            </div>
            <p className="text-fg-faint mt-2.5 min-h-[2.4em] text-xs leading-snug">
              {note}
            </p>
          </div>
        ) : null}

        {project.roles.length ? (
          <div>
            <p className="u-label">Minha atuação</p>
            <p className="text-fg mt-2 text-sm">{project.roles.join(" · ")}</p>
          </div>
        ) : null}

        {project.technologies.length ? (
          <div>
            <p className="u-label">Stack relacionada</p>
            <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
              {project.technologies.map((name) => (
                <Tag key={name}>{name}</Tag>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
