import Link from "next/link";

import { Container } from "@/components/ui/Container";

type Neighbor = { slug: string; title: string } | null;

/**
 * End-of-case navigation. Neighbours are derived from the public project list
 * only, so a private project can never appear here (Sprint §26).
 */
export function ProjectNav({ prev, next }: { prev: Neighbor; next: Neighbor }) {
  return (
    <Container as="nav" aria-label="Navegação entre projetos" className="mt-20">
      <div className="border-border border-t pt-6">
        <Link
          href="/projects"
          className="text-fg-muted hover:text-fg rounded-sm font-mono text-xs tracking-[0.12em] uppercase"
        >
          ← Todos os projetos
        </Link>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {prev ? (
            <Link
              href={`/projects/${prev.slug}`}
              className="group border-border bg-surface hover:border-border-strong rounded-md border p-4"
            >
              <span className="text-fg-muted text-xs">Anterior</span>
              <span className="group-hover:text-accent mt-1 block font-medium">
                {prev.title}
              </span>
            </Link>
          ) : (
            <span aria-hidden />
          )}
          {next ? (
            <Link
              href={`/projects/${next.slug}`}
              className="group border-border bg-surface hover:border-border-strong rounded-md border p-4 text-right sm:col-start-2"
            >
              <span className="text-fg-muted text-xs">Próximo</span>
              <span className="group-hover:text-accent mt-1 block font-medium">
                {next.title}
              </span>
            </Link>
          ) : null}
        </div>
      </div>
    </Container>
  );
}
