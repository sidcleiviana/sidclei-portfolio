import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { KnowledgeDetail } from "@/features/knowledge/KnowledgeDetail";
import { getKnowledgeSlugs, getSkillBySlug } from "@/sanity/queries";

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const { skills } = await getKnowledgeSlugs();
  return skills.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const skill = await getSkillBySlug(slug);
  if (!skill?.name) return {};
  const category = skill.category
    ? ` Competência na área de ${skill.category}.`
    : "";
  return {
    title: skill.name,
    description: skill.shortDescription ?? `${skill.name}.${category}`.trim(),
    alternates: { canonical: `/conhecimento/competencias/${slug}` },
  };
}

export default async function SkillDetailPage({ params }: Params) {
  const { slug } = await params;
  const skill = await getSkillBySlug(slug);
  if (!skill?.name) notFound();

  return (
    <KnowledgeDetail
      kind="skill"
      name={skill.name}
      category={skill.category}
      description={skill.shortDescription}
      aside={
        skill.featured ? (
          <span className="u-label text-[var(--color-node)]">Em destaque</span>
        ) : null
      }
      experiences={skill.experiences}
      projects={skill.projects}
      contextTechnologies={skill.contextTechnologies}
    />
  );
}
