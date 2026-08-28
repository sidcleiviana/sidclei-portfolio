import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { ProjectCard } from "@/features/projects/ProjectCard";
import { getProfile, getProjects } from "@/sanity/queries";
import { filterPubliclyVisible } from "@/domain/visibility";

export default async function HomePage() {
  const [profile, allProjects] = await Promise.all([
    getProfile(),
    getProjects(),
  ]);

  const projects = filterPubliclyVisible(allProjects);
  const featured = projects.filter((p) => p.featured).slice(0, 3);
  const highlight = featured.length ? featured : projects.slice(0, 3);

  return (
    <Container className="py-16">
      <section className="max-w-2xl">
        <p className="text-accent text-sm font-medium">
          {profile?.headline ?? "Desenvolvedor de Software"}
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
          {profile?.name ?? "Sidclei Viana"}
        </h1>
        {profile?.shortSummary ? (
          <p className="text-muted mt-4">{profile.shortSummary}</p>
        ) : (
          <p className="text-muted mt-4">
            Trajetória em infraestrutura, sistemas, ERP, dados e automação —
            hoje construindo software.
          </p>
        )}
        <div className="mt-6">
          <Link
            href="/projects"
            className="bg-accent text-accent-foreground inline-flex rounded-[var(--radius)] px-4 py-2 text-sm font-medium"
          >
            Ver projetos
          </Link>
        </div>
      </section>

      {highlight.length ? (
        <section className="mt-16">
          <div className="mb-6 flex items-baseline justify-between">
            <h2 className="text-lg font-semibold tracking-tight">
              Projetos em destaque
            </h2>
            <Link href="/projects" className="text-accent text-sm">
              Todos os projetos
            </Link>
          </div>
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {highlight.map((project) => (
              <li key={project._id} className="flex">
                <ProjectCard project={project} />
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </Container>
  );
}
