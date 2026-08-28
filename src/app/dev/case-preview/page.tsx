import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Badge, Container } from "@/components/ui";
import { ProjectCaseStudy } from "@/features/projects/ProjectCaseStudy";
import {
  richProjectFixture,
  sparseProjectFixture,
} from "@/features/projects/fixtures";

/**
 * Dev-only visual sandbox for the case-study layout (Sprint §23). Renders the
 * rich and sparse SYNTHETIC fixtures side by side. Returns 404 in production
 * builds and is never linked or indexed.
 */
export const metadata: Metadata = {
  title: "case-preview (dev)",
  robots: { index: false, follow: false },
};

export default function CasePreviewPage() {
  if (process.env.NODE_ENV === "production") notFound();

  return (
    <div className="py-10">
      <Container className="mb-10">
        <Badge tone="accent">
          DEV · sandbox de layout · conteúdo sintético
        </Badge>
      </Container>

      <p className="text-fg-muted mx-auto max-w-[var(--container-prose)] px-5 font-mono text-xs tracking-[0.14em] uppercase">
        Caso enxuto
      </p>
      <ProjectCaseStudy
        project={sparseProjectFixture}
        prev={null}
        next={null}
      />

      <hr className="border-border my-16" />

      <p className="text-fg-muted mx-auto max-w-[var(--container-prose)] px-5 font-mono text-xs tracking-[0.14em] uppercase">
        Caso rico
      </p>
      <ProjectCaseStudy
        project={richProjectFixture}
        prev={{ slug: "fixture-sparse", title: "Projeto enxuto" }}
        next={{ slug: "fixture-sparse", title: "Outro projeto" }}
      />
    </div>
  );
}
