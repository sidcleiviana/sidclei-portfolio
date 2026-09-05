import Link from "next/link";

import { Container } from "@/components/ui/Container";

type Neighbor = { slug: string; title: string } | null;

/**
 * End-of-case navigation. Neighbours come from the public project list only, so
 * a private project can never appear here.
 */
export function ProjectNav({ prev, next }: { prev: Neighbor; next: Neighbor }) {
  return (
    <Container size="wide" as="nav" aria-label="Navegação entre projetos" className="mt-20">
      <Link
        href="/projects"
        className="u-label hover:text-fg inline-flex items-center gap-2 rounded-sm"
      >
        <span aria-hidden>←</span> Todos os projetos
      </Link>

      {prev || next ? (
        <div className="border-border mt-5 grid gap-px border-t sm:grid-cols-2">
          {prev ? (
            <Link
              href={`/projects/${prev.slug}`}
              className="group border-border border-b py-5"
            >
              <span className="u-label text-fg-faint">Anterior</span>
              <span className="font-display group-hover:text-accent mt-1 block text-md font-bold">
                {prev.title}
              </span>
            </Link>
          ) : (
            <span aria-hidden />
          )}
          {next ? (
            <Link
              href={`/projects/${next.slug}`}
              className="group border-border border-b py-5 sm:col-start-2 sm:text-right"
            >
              <span className="u-label text-fg-faint">Próximo</span>
              <span className="font-display group-hover:text-accent mt-1 block text-md font-bold">
                {next.title}
              </span>
            </Link>
          ) : null}
        </div>
      ) : null}
    </Container>
  );
}
