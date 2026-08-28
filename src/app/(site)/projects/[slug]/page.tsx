import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SanityImage } from "@/components/content/SanityImage";
import { Container } from "@/components/ui/Container";
import { authorshipLabel, rolesSummary } from "@/domain/contribution";
import { formatDateRange } from "@/domain/dateRange";
import { projectTypeLabel } from "@/domain/projectType";
import { isAnonymized, isPubliclyVisible } from "@/domain/visibility";
import { EvidenceList } from "@/features/projects/EvidenceList";
import { MetricList } from "@/features/projects/MetricList";
import { ProjectContentBlocks } from "@/features/projects/ProjectContentBlocks";
import { urlForImage } from "@/sanity/image";
import { getProjectBySlug, getProjectSlugs } from "@/sanity/queries";

export async function generateStaticParams() {
  const slugs = await getProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project || !isPubliclyVisible(project)) return {};

  const title = project.seo?.title ?? project.title ?? "Projeto";
  const description =
    project.seo?.description ?? project.shortDescription ?? undefined;
  const ogSource = project.seo?.ogImage ?? project.coverImage;
  const ogImage = urlForImage(ogSource)?.width(1200).height(630).url();

  return {
    title,
    description,
    alternates: { canonical: `/projects/${project.slug}` },
    robots: project.seo?.noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      title,
      description,
      type: "article",
      url: `/projects/${project.slug}`,
      images: ogImage
        ? [{ url: ogImage, width: 1200, height: 630 }]
        : undefined,
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  // The query already excludes private/unpublished projects; this is the
  // second, independent guard (Sprint §57).
  if (!project || !isPubliclyVisible(project)) notFound();

  const period = formatDateRange(project.period);
  const roles = rolesSummary(project.contribution);
  const authorship = authorshipLabel(project.contribution?.authorship);
  const technologies = project.technologies ?? [];
  const skills = project.skills ?? [];
  const links = project.links ?? [];
  const metrics = project.metrics ?? [];

  return (
    <Container as="article" className="py-16">
      <header className="mx-auto w-full max-w-2xl">
        <div className="text-muted flex flex-wrap items-center gap-2 text-xs">
          <span className="bg-surface rounded px-2 py-0.5 font-medium">
            {projectTypeLabel(project.projectType)}
          </span>
          {period ? <span>{period}</span> : null}
        </div>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight">
          {project.title}
        </h1>
        <p className="text-muted mt-3">{project.shortDescription}</p>

        {isAnonymized(project) && project.confidentialityNotice ? (
          <p className="border-border bg-surface text-muted mt-4 rounded-[var(--radius)] border p-3 text-sm">
            {project.confidentialityNotice}
          </p>
        ) : null}
      </header>

      {project.coverImage?.asset ? (
        <div className="mx-auto mt-8 w-full max-w-3xl">
          <SanityImage
            image={project.coverImage}
            priority
            sizes="(min-width: 768px) 768px, 100vw"
            ratio={16 / 9}
            className="w-full rounded-[var(--radius)]"
          />
        </div>
      ) : null}

      <div className="mx-auto mt-10 w-full max-w-2xl space-y-6">
        {(authorship || roles) && (
          <section className="border-border rounded-[var(--radius)] border p-4 text-sm">
            {authorship ? <p className="font-medium">{authorship}</p> : null}
            {project.contribution?.teamContext ? (
              <p className="text-muted">{project.contribution.teamContext}</p>
            ) : null}
            {roles ? (
              <p className="mt-2">
                <span className="font-medium">Minha contribuição:</span> {roles}
              </p>
            ) : null}
            {project.contribution?.summary ? (
              <p className="text-muted mt-2">{project.contribution.summary}</p>
            ) : null}
          </section>
        )}

        {project.context ? (
          <section>
            <h2 className="mb-2 text-lg font-semibold tracking-tight">
              Contexto
            </h2>
            <p className="text-muted leading-7">{project.context}</p>
          </section>
        ) : null}

        {project.problem ? (
          <section>
            <h2 className="mb-2 text-lg font-semibold tracking-tight">
              Problema
            </h2>
            <p className="text-muted leading-7">{project.problem}</p>
          </section>
        ) : null}
      </div>

      {project.contentBlocks?.length ? (
        <div className="mt-16">
          <ProjectContentBlocks blocks={project.contentBlocks} />
        </div>
      ) : null}

      {metrics.length ? (
        <section className="mx-auto mt-16 w-full max-w-3xl">
          <h2 className="mb-4 text-lg font-semibold tracking-tight">
            Resultados
          </h2>
          <MetricList metrics={metrics} />
        </section>
      ) : null}

      {project.evidence?.length ? (
        <div className="mt-16">
          <EvidenceList evidence={project.evidence} />
        </div>
      ) : null}

      <footer className="border-border mx-auto mt-16 w-full max-w-2xl space-y-6 border-t pt-8 text-sm">
        {skills.length ? (
          <div>
            <h2 className="mb-2 font-semibold">Competências</h2>
            <ul className="flex flex-wrap gap-1.5">
              {skills.map((skill) => (
                <li
                  key={skill._id}
                  className="border-border text-muted rounded border px-1.5 py-0.5"
                >
                  {skill.name}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {technologies.length ? (
          <div>
            <h2 className="mb-2 font-semibold">Tecnologias</h2>
            <ul className="flex flex-wrap gap-1.5">
              {technologies.map((tech) => (
                <li
                  key={tech._id}
                  className="border-border text-muted rounded border px-1.5 py-0.5"
                >
                  {tech.name}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {links.length ? (
          <div>
            <h2 className="mb-2 font-semibold">Links</h2>
            <ul className="space-y-1">
              {links.map((link) => (
                <li key={link._key ?? link.url}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent underline underline-offset-2"
                  >
                    {link.label || link.url}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {project.relatedExperience ? (
          <p className="text-muted">
            Experiência relacionada:{" "}
            <span className="text-foreground">
              {project.relatedExperience.role} ·{" "}
              {project.relatedExperience.company}
            </span>
          </p>
        ) : null}
      </footer>
    </Container>
  );
}
