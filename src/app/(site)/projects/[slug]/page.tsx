import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SanityImage } from "@/components/content/SanityImage";
import {
  Badge,
  Cluster,
  Container,
  Divider,
  Section,
  Stack,
  TextLink,
} from "@/components/ui";
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

function Prose({ children }: { children: React.ReactNode }) {
  return <Container size="prose">{children}</Container>;
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-fg-muted font-mono text-xs font-medium tracking-[0.14em] uppercase">
      {children}
    </h2>
  );
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
  const links = (project.links ?? [])
    .filter((l) => Boolean(l?.url))
    .map((l) => ({
      key: l._key ?? (l.url as string),
      url: l.url as string,
      label: l.label || (l.url as string),
    }));
  const metrics = project.metrics ?? [];

  return (
    <article className="pb-24">
      <Section spacing="md" aria-labelledby="project-title">
        <Prose>
          <Stack gap="md" data-animate="rise">
            <Cluster gap="xs" className="text-fg-muted text-xs">
              <Badge tone="accent">
                {projectTypeLabel(project.projectType)}
              </Badge>
              {period ? <span>{period}</span> : null}
            </Cluster>
            <h1 id="project-title" className="text-3xl sm:text-4xl">
              {project.title}
            </h1>
            <p className="text-fg-muted text-lg">{project.shortDescription}</p>

            {isAnonymized(project) && project.confidentialityNotice ? (
              <p className="border-border bg-bg-subtle text-fg-muted rounded-md border p-4 text-sm">
                {project.confidentialityNotice}
              </p>
            ) : null}
          </Stack>
        </Prose>
      </Section>

      {project.coverImage?.asset ? (
        <Container size="wide" className="mb-4">
          <SanityImage
            image={project.coverImage}
            priority
            sizes="(min-width: 900px) 52rem, 100vw"
            ratio={16 / 9}
            className="border-border w-full rounded-lg border"
          />
        </Container>
      ) : null}

      {authorship || roles || project.context || project.problem ? (
        <Prose>
          <Stack gap="lg" className="py-6">
            {authorship || roles ? (
              <div className="border-border bg-surface rounded-md border p-5 text-sm">
                {authorship ? (
                  <p className="font-medium">{authorship}</p>
                ) : null}
                {project.contribution?.teamContext ? (
                  <p className="text-fg-muted">
                    {project.contribution.teamContext}
                  </p>
                ) : null}
                {roles ? (
                  <p className="mt-2">
                    <span className="font-medium">Minha contribuição:</span>{" "}
                    {roles}
                  </p>
                ) : null}
                {project.contribution?.summary ? (
                  <p className="text-fg-muted mt-2">
                    {project.contribution.summary}
                  </p>
                ) : null}
              </div>
            ) : null}

            {project.context ? (
              <Stack gap="xs">
                <SubHeading>Contexto</SubHeading>
                <p className="text-fg-muted leading-7">{project.context}</p>
              </Stack>
            ) : null}

            {project.problem ? (
              <Stack gap="xs">
                <SubHeading>Problema</SubHeading>
                <p className="text-fg-muted leading-7">{project.problem}</p>
              </Stack>
            ) : null}
          </Stack>
        </Prose>
      ) : null}

      {project.contentBlocks?.length ? (
        <div className="mt-12">
          <ProjectContentBlocks blocks={project.contentBlocks} />
        </div>
      ) : null}

      {metrics.length ? (
        <Container size="wide" className="mt-16">
          <Stack gap="md">
            <SubHeading>Resultados</SubHeading>
            <MetricList metrics={metrics} />
          </Stack>
        </Container>
      ) : null}

      {project.evidence?.length ? (
        <div className="mt-16">
          <EvidenceList evidence={project.evidence} />
        </div>
      ) : null}

      <Prose>
        <Divider className="mt-16" />
        <Stack gap="lg" className="pt-8 text-sm">
          {skills.length ? (
            <Stack gap="sm">
              <SubHeading>Competências</SubHeading>
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
              <SubHeading>Tecnologias</SubHeading>
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
              <SubHeading>Links</SubHeading>
              <ul className="space-y-1.5">
                {links.map((link) => (
                  <li key={link.key}>
                    <TextLink href={link.url}>{link.label}</TextLink>
                  </li>
                ))}
              </ul>
            </Stack>
          ) : null}

          {project.relatedExperience ? (
            <p className="text-fg-muted">
              Experiência relacionada:{" "}
              <span className="text-fg">
                {project.relatedExperience.role} ·{" "}
                {project.relatedExperience.company}
              </span>
            </p>
          ) : null}
        </Stack>
      </Prose>
    </article>
  );
}
