import Link from "next/link";

import { Badge, Cluster, Divider, Stack, TextLink } from "@/components/ui";
import { experienceAnchor } from "@/domain/experienceAnchor";
import type { ProjectDetail } from "@/sanity/types";

function MetaHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-fg-muted font-mono text-xs font-medium tracking-[0.14em] uppercase">
      {children}
    </h2>
  );
}

/**
 * The closing metadata of a case. Skills and Technologies stay separate
 * concepts (Sprint §14): a Skill is what was done, a Technology is what it was
 * done with. Related projects are *not* inferred — only explicit CMS relations
 * appear (Sprint §27).
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
      <Divider className="mt-16" />
      <Stack gap="lg" className="pt-8 text-sm">
        {skills.length ? (
          <Stack gap="sm">
            <MetaHeading>Competências</MetaHeading>
            <Cluster gap="xs">
              {skills.map((s) => (
                <Badge key={s._id} tone="outline">
                  {s.name}
                </Badge>
              ))}
            </Cluster>
          </Stack>
        ) : null}

        {technologies.length ? (
          <Stack gap="sm">
            <MetaHeading>Tecnologias</MetaHeading>
            <Cluster gap="xs">
              {technologies.map((t) => (
                <Badge key={t._id} tone="outline" mono>
                  {t.name}
                </Badge>
              ))}
            </Cluster>
          </Stack>
        ) : null}

        {links.length ? (
          <Stack gap="sm">
            <MetaHeading>Links</MetaHeading>
            <ul className="space-y-1.5">
              {links.map((link) => (
                <li key={link.key}>
                  <TextLink href={link.url}>{link.label}</TextLink>
                </li>
              ))}
            </ul>
          </Stack>
        ) : null}

        {experience ? (
          <p className="text-fg-muted">
            Experiência relacionada:{" "}
            <Link
              href={`/experiencia#${experienceAnchor(experience)}`}
              className="text-fg rounded-sm font-medium underline decoration-[var(--color-border-strong)] underline-offset-[3px] hover:decoration-[var(--color-accent)]"
            >
              {[experience.role, experience.company]
                .filter(Boolean)
                .join(" · ")}
            </Link>
          </p>
        ) : null}
      </Stack>
    </>
  );
}
