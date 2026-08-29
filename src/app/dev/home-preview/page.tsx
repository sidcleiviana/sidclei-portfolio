import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Badge, Container } from "@/components/ui";
import { CareerSummary } from "@/features/home/CareerSummary";
import { FeaturedProjects } from "@/features/home/FeaturedProjects";
import { FocusAreas } from "@/features/home/FocusAreas";
import { Hero } from "@/features/home/Hero";
import { NextStep } from "@/features/home/NextStep";
import { emptyHomeFixture, richHomeFixture } from "@/features/home/fixtures";

/**
 * Dev-only visual sandbox for the Home (Sprint §44). Renders the fully
 * populated SYNTHETIC fixture, then the empty-CMS state. 404 in production,
 * noindex, disallowed in robots.txt, never linked.
 */
export const metadata: Metadata = {
  title: "home-preview (dev)",
  robots: { index: false, follow: false },
};

export default function HomePreviewPage() {
  if (process.env.NODE_ENV === "production") notFound();

  return (
    <>
      <Container className="pt-8">
        <Badge tone="accent">
          DEV · sandbox de layout · conteúdo sintético
        </Badge>
      </Container>

      <Hero profile={richHomeFixture.profile} />
      <FocusAreas />
      <FeaturedProjects projects={richHomeFixture.projects} />
      <CareerSummary experiences={richHomeFixture.experiences} />
      <NextStep profile={richHomeFixture.profile} />

      <Container className="my-16">
        <hr className="border-border" />
        <p className="text-fg-muted mt-8 font-mono text-xs tracking-[0.14em] uppercase">
          CMS vazio
        </p>
      </Container>

      <Hero profile={emptyHomeFixture.profile} />
      <FocusAreas />
      <FeaturedProjects projects={emptyHomeFixture.projects} />
      <CareerSummary experiences={emptyHomeFixture.experiences} />
      <NextStep profile={emptyHomeFixture.profile} />
    </>
  );
}
