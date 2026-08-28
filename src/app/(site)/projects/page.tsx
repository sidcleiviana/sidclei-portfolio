import type { Metadata } from "next";

import { Container } from "@/components/ui/Container";
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
    <Container className="py-16">
      <header className="mb-10 max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-tight">Projetos</h1>
        <p className="text-muted mt-3">
          Cada projeto indica sua natureza — produção, profissional, lab ou
          estudo — e, quando aplicável, qual foi a contribuição de Sidclei.
        </p>
      </header>
      <ProjectList projects={projects} />
    </Container>
  );
}
