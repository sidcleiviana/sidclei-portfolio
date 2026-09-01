import {
  Container,
  Rule,
  Section,
  SectionHeading,
  TextLink,
} from "@/components/ui";
import { isPubliclyVisible } from "@/domain/visibility";
import { ProjectCard } from "@/features/projects/ProjectCard";
import type { HomeProjectRef } from "@/sanity/types";

/**
 * The evidence answer — real projects as editorial pieces, not cards (Sprint 7
 * §13). Prefers projects flagged `featured`; falls back to the most recent with
 * a transparent rule. Renders nothing when there is nothing to show.
 */
export function FeaturedProjects({ projects }: { projects: HomeProjectRef[] }) {
  const visible = projects.filter(isPubliclyVisible);
  const featured = visible.filter((p) => p.featured);
  const shown = (featured.length ? featured : visible).slice(0, 3);
  if (!shown.length) return null;

  return (
    <Section spacing="lg" aria-labelledby="work-title">
      <Container size="editorial">
        <SectionHeading
          as="h2"
          id="work-title"
          index={3}
          eyebrow="Trabalho"
          title="Projetos"
          description="Cada projeto indica sua natureza e, quando aplicável, a contribuição de Sidclei."
          action={<TextLink href="/projects">Todos os projetos</TextLink>}
        />

        <div className="mt-16 flex flex-col gap-20">
          {shown.map((project, i) => (
            <div key={project._id}>
              {i > 0 ? <Rule className="mb-20" /> : null}
              <ProjectCard project={project} variant="feature" index={i + 1} />
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
