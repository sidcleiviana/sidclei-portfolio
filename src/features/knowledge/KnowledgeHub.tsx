import { Container, Section, SectionHeading } from "@/components/ui";
import { groupByCategory } from "@/domain/knowledge";
import type { KnowledgeSkill, KnowledgeTechnology } from "@/sanity/types";

import { KnowledgeBadge, knowledgeHref } from "./KnowledgeBadge";
import { RelationalScope } from "./RelationalScope";

type Entity = KnowledgeSkill | KnowledgeTechnology;

function contextsOf(entity: Entity): string[] {
  return (entity.contexts ?? []).filter((c): c is string => Boolean(c));
}

/** The chapter marker — a large index and the category label, on a strong rule. */
function ChapterMark({ index, category }: { index: number; category: string }) {
  return (
    <div className="sm:sticky sm:top-24 sm:col-span-3">
      <span
        aria-hidden
        className="font-display text-fg-faint block text-4xl leading-none tabular-nums sm:text-5xl"
      >
        {String(index).padStart(2, "0")}
      </span>
      <p className="u-label mt-3">{category}</p>
    </div>
  );
}

function SkillChapter({
  index,
  category,
  items,
}: {
  index: number;
  category: string;
  items: KnowledgeSkill[];
}) {
  return (
    <div className="grid gap-x-10 gap-y-6 border-t-2 border-[var(--color-rule)] pt-8 sm:grid-cols-12">
      <ChapterMark index={index} category={category} />

      <RelationalScope className="sm:col-span-9">
        <ul className="flex flex-col gap-8">
          {items.map((skill) => {
            const contexts = contextsOf(skill);
            return (
              <li key={skill._id}>
                {skill.slug ? (
                  <a
                    href={knowledgeHref("skill", skill.slug)}
                    data-rel=""
                    data-rel-keys={contexts.join(",")}
                    className="group inline-flex items-baseline gap-2.5 rounded-sm"
                  >
                    {skill.featured ? (
                      <span
                        aria-hidden
                        className="bg-accent inline-block h-1.5 w-1.5 shrink-0 translate-y-[-0.15em] rounded-full"
                      />
                    ) : null}
                    <span className="font-display group-hover:text-accent text-2xl sm:text-3xl">
                      {skill.name}
                    </span>
                    {skill.featured ? (
                      <span className="sr-only">(em destaque)</span>
                    ) : null}
                  </a>
                ) : (
                  <span className="font-display text-2xl">{skill.name}</span>
                )}
                {skill.shortDescription ? (
                  <p className="text-fg-muted mt-1.5 max-w-[52ch] text-pretty">
                    {skill.shortDescription}
                  </p>
                ) : null}
                {contexts.length ? (
                  <p className="u-connect u-label text-fg-faint mt-2">
                    usado em{" "}
                    <span className="text-fg-muted">
                      {contexts.join(" · ")}
                    </span>
                  </p>
                ) : null}
              </li>
            );
          })}
        </ul>
      </RelationalScope>
    </div>
  );
}

function TechChapter({
  index,
  category,
  items,
}: {
  index: number;
  category: string;
  items: KnowledgeTechnology[];
}) {
  return (
    <div className="grid gap-x-10 gap-y-6 border-t-2 border-[var(--color-rule)] pt-8 sm:grid-cols-12">
      <ChapterMark index={index} category={category} />
      <RelationalScope className="sm:col-span-9">
        <ul className="flex flex-col gap-4">
          {items.map((tech) => {
            const contexts = contextsOf(tech);
            return (
              <li
                key={tech._id}
                className="flex flex-wrap items-baseline gap-x-4"
              >
                <KnowledgeBadge
                  kind="technology"
                  slug={tech.slug}
                  name={tech.name}
                  rel
                  relKeys={contexts.join(",")}
                />
                {contexts.length ? (
                  <span className="u-label text-fg-faint">
                    {contexts.join(" · ")}
                  </span>
                ) : null}
              </li>
            );
          })}
        </ul>
      </RelationalScope>
    </div>
  );
}

/**
 * `/conhecimento` — competences and technologies as an editorial atlas
 * (Sprint 7 §21). Each schema category is a numbered chapter; each entry shows
 * the real contexts it appeared in and deep-links to its detail page.
 * Relational highlight is a discreet CSS/island layer (§12, §24, §25). No
 * counts, no levels, no cloud.
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
      <Section spacing="lg" aria-labelledby="knowledge-title">
        <Container size="editorial">
          <SectionHeading
            as="h1"
            id="knowledge-title"
            index={1}
            eyebrow="Conhecimento"
            title="Conhecimento"
            description="Competências e tecnologias demonstradas ao longo da trajetória profissional."
          />
          <p className="text-fg-muted mt-10 border-t border-[var(--color-border)] pt-6 font-mono text-sm">
            Ainda não há competências ou tecnologias publicadas.
          </p>
        </Container>
      </Section>
    );
  }

  return (
    <>
      <Section
        spacing="sm"
        aria-labelledby="knowledge-title"
        className="pt-8 pb-0 sm:pt-12"
      >
        <Container size="editorial">
          <SectionHeading
            as="h1"
            id="knowledge-title"
            index={1}
            eyebrow="Conhecimento"
            title="Conhecimento"
            description="Competências e tecnologias demonstradas ao longo da trajetória. Cada item abre os contextos reais em que apareceu."
          />
          <nav aria-label="Seções desta página" className="mt-6">
            <ul className="flex gap-6">
              {skills.length ? (
                <li>
                  <a
                    href="#competencias"
                    className="u-label text-fg-muted hover:text-fg rounded-sm"
                  >
                    Competências
                  </a>
                </li>
              ) : null}
              {technologies.length ? (
                <li>
                  <a
                    href="#tecnologias"
                    className="u-label text-fg-muted hover:text-fg rounded-sm"
                  >
                    Tecnologias
                  </a>
                </li>
              ) : null}
            </ul>
          </nav>
        </Container>
      </Section>

      {skills.length ? (
        <Section
          spacing="sm"
          id="competencias"
          aria-labelledby="competencias-title"
          className="scroll-mt-24"
        >
          <Container size="editorial">
            <SectionHeading
              id="competencias-title"
              index={2}
              eyebrow="O que faço"
              title="Competências"
            />
            <div className="mt-10 flex flex-col gap-14">
              {skillGroups.map((group, i) => (
                <SkillChapter
                  key={group.category}
                  index={i + 1}
                  category={group.category}
                  items={group.items}
                />
              ))}
            </div>
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
          <Container size="editorial">
            <SectionHeading
              id="tecnologias-title"
              index={3}
              eyebrow="Com o que trabalho"
              title="Tecnologias"
              description="Ferramentas, linguagens e plataformas — recuadas de propósito: são meios, não o assunto."
            />
            <div className="mt-10 flex flex-col gap-14">
              {technologyGroups.map((group, i) => (
                <TechChapter
                  key={group.category}
                  index={i + 1}
                  category={group.category}
                  items={group.items}
                />
              ))}
            </div>
          </Container>
        </Section>
      ) : null}
    </>
  );
}
