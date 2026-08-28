import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { filterPubliclyVisible, isPubliclyVisible } from "@/domain/visibility";
import { ProjectCaseStudy } from "@/features/projects/ProjectCaseStudy";
import { urlForImage } from "@/sanity/image";
import {
  getProjectBySlug,
  getProjects,
  getProjectSlugs,
} from "@/sanity/queries";

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

type Neighbor = { slug: string; title: string } | null;

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [project, allProjects] = await Promise.all([
    getProjectBySlug(slug),
    getProjects(),
  ]);

  // The query already excludes private/unpublished projects; this is the
  // second, independent guard (Sprint §57).
  if (!project || !isPubliclyVisible(project)) notFound();

  // Prev/next are derived from the public list only — no private leak (§26).
  const list = filterPubliclyVisible(allProjects)
    .filter((p) => p.slug && p.title)
    .map((p) => ({ slug: p.slug as string, title: p.title as string }));
  const index = list.findIndex((p) => p.slug === project.slug);
  const prev: Neighbor = index > 0 ? list[index - 1]! : null;
  const next: Neighbor =
    index !== -1 && index < list.length - 1 ? list[index + 1]! : null;

  return <ProjectCaseStudy project={project} prev={prev} next={next} />;
}
