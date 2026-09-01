import Link from "next/link";

import { Rule, TextLink } from "@/components/ui";
import { experienceAnchor } from "@/domain/experienceAnchor";
import { KnowledgeBadge } from "@/features/knowledge/KnowledgeBadge";
import type { ProjectDetail } from "@/sanity/types";

function MetaLabel({ children }: { children: React.ReactNode }) {
  return <p className="u-label text-fg-faint mb-3">{children}</p>;
}

/**
 * The closing metadata of a case. Skills and Technologies stay separate
 * concepts (Sprint 7 §16): a Skill is what was done, a Technology is what it
 * was done with. Related projects are never inferred — only explicit CMS
 * relations. Badges deep-link into the Knowledge Hub.
 */
export function ProjectMeta({ project }: { project: ProjectDetail }) {
  const skills = (project.skills ?? []).filter((s) => s?.name);
  const technologies = (project.technologies ?? []).filter((t) => t?.name);
  const links = (project.links ?? [])
    .filter((l) => l?.url)
    .map((l) => ({
      key: l._key ?? (l.url as string),
      url: l.url as string,
      label: l.label || (l.url as string),
    }));
  const experience = project.relatedExperience;

  if (!skills.length && !technologies.length && !links.length && !experience) {
    return null;
  }

  return (
    <>
      <Rule weight="strong" className="mt-20" />
      <div className="mt-8 grid gap-x-10 gap-y-10 sm:grid-cols-2">
        {skills.length ? (
          <div>
            <MetaLabel>Competências</MetaLabel>
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              {skills.map((s) => (
                <KnowledgeBadge
                  key={s._id}
                  kind="skill"
                  slug={s.slug}
                  name={s.name}
                />
              ))}
            </div>
          </div>
        ) : null}

        {technologies.length ? (
          <div>
            <MetaLabel>Tecnologias</MetaLabel>
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              {technologies.map((t) => (
                <KnowledgeBadge
                  key={t._id}
                  kind="technology"
                  slug={t.slug}
                  name={t.name}
                />
              ))}
            </div>
          </div>
        ) : null}

        {experience ? (
          <div>
            <MetaLabel>Experiência relacionada</MetaLabel>
            <Link
              href={`/experiencia#${experienceAnchor(experience)}`}
              className="font-display hover:text-accent rounded-sm text-lg"
            >
              {[experience.role, experience.company]
                .filter(Boolean)
                .join(" · ")}
            </Link>
          </div>
        ) : null}

        {links.length ? (
          <div>
            <MetaLabel>Links</MetaLabel>
            <ul className="space-y-1.5">
              {links.map((link) => (
                <li key={link.key}>
                  <TextLink href={link.url}>{link.label}</TextLink>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </>
  );
}
