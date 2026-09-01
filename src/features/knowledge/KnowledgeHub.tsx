import { Container, Section, SectionHeading, Stack } from "@/components/ui";
import { Cluster } from "@/components/ui/Cluster";
import { MonoHeading } from "@/components/ui/MonoHeading";
import { groupByCategory } from "@/domain/knowledge";
import type { KnowledgeSkill, KnowledgeTechnology } from "@/sanity/types";

import { KnowledgeBadge, knowledgeHref } from "./KnowledgeBadge";

function SkillGroup({
  category,
  items,
}: {
  category: string;
  items: KnowledgeSkill[];
}) {
  return (
    <div>
      <MonoHeading>{category}</MonoHeading>
      <ul className="mt-2 space-y-2">
        {items.map((skill) => (
          <li key={skill._id}>
            {skill.slug ? (
              <a
                href={knowledgeHref("skill", skill.slug)}
                className="group inline-flex items-baseline gap-2 rounded-sm"
              >
                <span className="group-hover:text-accent font-medium">
                  {skill.name}
                </span>
                {skill.featured ? (
                  <span className="text-fg-muted text-xs">· em destaque</span>
                ) : null}
              </a>
            ) : (
              <span className="font-medium">{skill.name}</span>
            )}
            {skill.shortDescription ? (
              <p className="text-fg-muted mt-0.5 text-sm text-pretty">
                {skill.shortDescription}
              </p>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
}

function TechnologyGroup({
  category,
  items,
}: {
  category: string;
  items: KnowledgeTechnology[];
}) {
  return (
    <div>
      <MonoHeading>{category}</MonoHeading>
      <Cluster gap="xs" className="mt-2.5">
        {items.map((tech) => (
          <KnowledgeBadge
            key={tech._id}
            kind="technology"
            slug={tech.slug}
            name={tech.name}
          />
        ))}
      </Cluster>
    </div>
  );
}

/**
 * `/conhecimento` — a relational index of competences and technologies
 * (Sprint §1, §8). Two sections, each grouped by the schema's own `category`.
 * No counts, no levels, no cloud (Sprint §3). Each entry deep-links to its
 * detail page, where the real professional contexts live.
 */
export function KnowledgeHub({
  skills,
  technologies,
}: {
  skills: KnowledgeSkill[];
  technologies: KnowledgeTechnology[];
}) {
  const skillGroups = groupByCategory(skills);
  const technologyGroups = groupByCategory(technologies);

  if (!skills.length && !technologies.length) {
    return (
      <Section aria-labelledby="knowledge-title">
        <Container>
          <Stack gap="lg">
            <SectionHeading
              as="h1"
              id="knowledge-title"
              eyebrow="Conhecimento"
              title="Conhecimento"
              description="Competências e tecnologias demonstradas ao longo da trajetória profissional."
            />
            <p className="border-border bg-bg-subtle text-fg-muted rounded-md border border-dashed p-8 text-center text-sm">
              Ainda não há competências ou tecnologias publicadas.
            </p>
          </Stack>
        </Container>
      </Section>
    );
  }

  return (
    <>
      <Section spacing="md" aria-labelledby="knowledge-title">
        <Container>
          <Stack gap="lg">
            <SectionHeading
              as="h1"
              id="knowledge-title"
              eyebrow="Conhecimento"
              title="Conhecimento"
              description="Competências e tecnologias demonstradas ao longo da trajetória profissional. Cada item abre os contextos reais em que apareceu."
            />
            <nav aria-label="Seções desta página">
              <Cluster gap="sm" className="text-sm">
                {skills.length ? (
                  <a
                    href="#competencias"
                    className="text-fg-muted hover:text-fg rounded-sm underline decoration-[var(--color-border-strong)] underline-offset-4"
                  >
                    Competências
                  </a>
                ) : null}
                {technologies.length ? (
                  <a
                    href="#tecnologias"
                    className="text-fg-muted hover:text-fg rounded-sm underline decoration-[var(--color-border-strong)] underline-offset-4"
                  >
                    Tecnologias
                  </a>
                ) : null}
              </Cluster>
            </nav>
          </Stack>
        </Container>
      </Section>

      {skills.length ? (
        <Section
          spacing="md"
          id="competencias"
          aria-labelledby="competencias-title"
          className="scroll-mt-24"
        >
          <Container>
            <Stack gap="lg">
              <SectionHeading
                id="competencias-title"
                eyebrow="O que faço"
                title="Competências"
                description="O que Sidclei sabe fazer, organizado pela natureza do trabalho."
              />
              <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
                {skillGroups.map((group) => (
                  <SkillGroup
                    key={group.category}
                    category={group.category}
                    items={group.items}
                  />
                ))}
              </div>
            </Stack>
          </Container>
        </Section>
      ) : null}

      {technologies.length ? (
        <Section
          spacing="md"
          id="tecnologias"
          aria-labelledby="tecnologias-title"
          className="scroll-mt-24"
        >
          <Container>
            <Stack gap="lg">
              <SectionHeading
                id="tecnologias-title"
                eyebrow="Com o que trabalho"
                title="Tecnologias"
                description="Ferramentas, linguagens e plataformas usadas nos contextos profissionais."
              />
              <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
                {technologyGroups.map((group) => (
                  <TechnologyGroup
                    key={group.category}
                    category={group.category}
                    items={group.items}
                  />
                ))}
              </div>
            </Stack>
          </Container>
        </Section>
      ) : null}
    </>
  );
}
