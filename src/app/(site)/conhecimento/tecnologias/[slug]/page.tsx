import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { TextLink } from "@/components/ui";
import { KnowledgeDetail } from "@/features/knowledge/KnowledgeDetail";
import { getKnowledgeSlugs, getTechnologyBySlug } from "@/sanity/queries";

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const { technologies } = await getKnowledgeSlugs();
  return technologies.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const tech = await getTechnologyBySlug(slug);
  if (!tech?.name) return {};
  const category = tech.category ? ` ${tech.category}.` : "";
  return {
    title: tech.name,
    description: `${tech.name}.${category}`.trim(),
    alternates: { canonical: `/conhecimento/tecnologias/${slug}` },
  };
}

export default async function TechnologyDetailPage({ params }: Params) {
  const { slug } = await params;
  const tech = await getTechnologyBySlug(slug);
  if (!tech?.name) notFound();

  return (
    <KnowledgeDetail
      kind="technology"
      name={tech.name}
      category={tech.category}
      aside={
        tech.officialUrl ? (
          <TextLink href={tech.officialUrl} className="u-label">
            Site oficial
          </TextLink>
        ) : null
      }
      experiences={tech.experiences}
      projects={tech.projects}
    />
  );
}
