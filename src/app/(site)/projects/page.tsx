import type { Metadata } from "next";

import { AgentAnchor } from "@/components/agent/AgentAnchor";
import { Container, Kicker, Section } from "@/components/ui";
import { filterPubliclyVisible } from "@/domain/visibility";
import { ProjectList } from "@/features/projects/ProjectList";
import { getProjects } from "@/sanity/queries";

export const metadata: Metadata = {
  title: "Projetos",
  description:
    "Projetos de Sidclei Viana — produção, trabalho profissional, labs e estudos.",
  alternates: { canonical: "/projects" },
};

export default async function ProjectsPage() {
  const projects = filterPubliclyVisible(await getProjects());

  return (
    <Section spacing="lg" aria-labelledby="projects-title">
      <Container size="wide" className="relative">
        <AgentAnchor name="collection" active className="absolute top-0 right-2 sm:right-4" />
        <Kicker>Trabalho</Kicker>
        <h1 className="font-display mt-3 text-2xl font-extrabold sm:text-3xl" id="projects-title">
          Projetos
        </h1>
        <p className="text-fg-muted mt-3 max-w-[54ch] text-md text-pretty">
          Cada projeto indica sua natureza — produção, profissional, lab ou
          estudo — e, quando aplicável, qual foi a contribuição de Sidclei.
        </p>
      </Container>
      <div className="mt-2">
        <ProjectList projects={projects} />
      </div>
    </Section>
  );
}
