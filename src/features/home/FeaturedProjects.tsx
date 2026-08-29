import {
  Container,
  Grid,
  Section,
  SectionHeading,
  Stack,
  TextLink,
} from "@/components/ui";
import { isPubliclyVisible } from "@/domain/visibility";
import { ProjectCard } from "@/features/projects/ProjectCard";
import type { HomeProjectRef } from "@/sanity/types";

/**
 * The "why believe it?" answer — real projects (Sprint §11). Prefers projects
 * flagged `featured` in the CMS; falls back to the most recent ones with a
 * transparent rule (Sprint §12). Renders nothing when there is nothing to show
 * (Sprint §13). Reuses ProjectCard — no divergent copy (Sprint §14).
 */
export function FeaturedProjects({ projects }: { projects: HomeProjectRef[] }) {
  const visible = projects.filter(isPubliclyVisible);
  const featured = visible.filter((p) => p.featured);
  const shown = (featured.length ? featured : visible).slice(0, 6);
  if (!shown.length) return null;

  return (
    <Section aria-labelledby="proof-title">
      <Container>
        <Stack gap="lg">
          <SectionHeading
            id="proof-title"
            eyebrow="Evidências"
            title="Projetos"
            description="Cada projeto indica sua natureza e, quando aplicável, a contribuição de Sidclei."
            action={<TextLink href="/projects">Todos os projetos →</TextLink>}
          />
          <Grid minCol="18">
            {shown.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </Grid>
        </Stack>
      </Container>
    </Section>
  );
}
