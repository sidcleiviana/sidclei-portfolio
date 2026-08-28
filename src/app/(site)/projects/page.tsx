import type { Metadata } from "next";

import { Container, Section, SectionHeading, Stack } from "@/components/ui";
import { filterPubliclyVisible } from "@/domain/visibility";
import { ProjectList } from "@/features/projects/ProjectList";
import { getProjects } from "@/sanity/queries";

export const metadata: Metadata = {
  title: "Projetos",
  description:
    "Projetos de Sidclei Viana — produção, trabalho profissional, labs e estudos.",
};

export default async function ProjectsPage() {
  const projects = filterPubliclyVisible(await getProjects());

  return (
    <Section aria-labelledby="projects-title">
      <Container>
        <Stack gap="lg">
          <SectionHeading
            as="h1"
            id="projects-title"
            eyebrow="Trabalho"
            title="Projetos"
            description="Cada projeto indica sua natureza — produção, profissional, lab ou estudo — e, quando aplicável, qual foi a contribuição de Sidclei."
          />
          <ProjectList projects={projects} />
        </Stack>
      </Container>
    </Section>
  );
}
