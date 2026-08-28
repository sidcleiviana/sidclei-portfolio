import {
  Badge,
  ButtonLink,
  Cluster,
  Container,
  Grid,
  Section,
  SectionHeading,
  Stack,
  TextLink,
} from "@/components/ui";
import { filterPubliclyVisible } from "@/domain/visibility";
import { ProjectCard } from "@/features/projects/ProjectCard";
import { getProfile, getProjects } from "@/sanity/queries";

/** Documented professional positioning (CLAUDE.md §3) — not invented content. */
const AREAS = ["Software", "Automação", "Dados", "Sistemas"];

export default async function HomePage() {
  const [profile, allProjects] = await Promise.all([
    getProfile(),
    getProjects(),
  ]);

  const projects = filterPubliclyVisible(allProjects);
  const featured = projects.filter((p) => p.featured);
  const highlight = (featured.length ? featured : projects).slice(0, 6);

  return (
    <>
      <Section spacing="lg" aria-labelledby="hero-title">
        <Container>
          <Stack gap="lg" className="max-w-[var(--container-wide)]">
            <Stack gap="md" data-animate="rise">
              <p className="text-fg-muted flex items-center gap-2 font-mono text-xs font-medium tracking-[0.14em] uppercase">
                <span
                  aria-hidden
                  className="inline-block h-px w-6 bg-[var(--color-accent)]"
                />
                {profile?.headline ?? "Desenvolvedor de Software"}
              </p>
              <h1
                id="hero-title"
                className="text-4xl leading-[1.05] sm:text-[3.5rem]"
              >
                {profile?.name ?? "Sidclei Viana"}
              </h1>
              <p className="text-fg-muted max-w-[var(--container-prose)] text-lg">
                {profile?.shortSummary ??
                  "Trajetória em infraestrutura, sistemas, ERP, dados e automação — hoje construindo software. O portfólio mostra onde e como cada conhecimento foi aplicado."}
              </p>
            </Stack>

            <Cluster gap="xs" aria-label="Áreas de atuação">
              {AREAS.map((area) => (
                <Badge key={area} tone="outline">
                  {area}
                </Badge>
              ))}
            </Cluster>

            <Cluster gap="sm">
              <ButtonLink href="/projects">Ver projetos</ButtonLink>
            </Cluster>
          </Stack>
        </Container>
      </Section>

      {highlight.length ? (
        <Section aria-labelledby="featured-title">
          <Container>
            <Stack gap="lg">
              <SectionHeading
                id="featured-title"
                eyebrow="Trabalho"
                title="Projetos em destaque"
                description="Cada projeto indica sua natureza e, quando aplicável, qual foi a contribuição de Sidclei."
                action={
                  <TextLink href="/projects">Todos os projetos →</TextLink>
                }
              />
              <Grid minCol="18">
                {highlight.map((project) => (
                  <ProjectCard key={project._id} project={project} />
                ))}
              </Grid>
            </Stack>
          </Container>
        </Section>
      ) : null}
    </>
  );
}
