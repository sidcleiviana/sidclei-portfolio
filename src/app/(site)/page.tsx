import type { Metadata } from "next";

import { FALLBACK_SUMMARY } from "@/features/home/identity";
import { CareerSummary } from "@/features/home/CareerSummary";
import { FeaturedProjects } from "@/features/home/FeaturedProjects";
import { FocusAreas } from "@/features/home/FocusAreas";
import { Hero } from "@/features/home/Hero";
import { NextStep } from "@/features/home/NextStep";
import { getHome } from "@/sanity/queries";

export async function generateMetadata(): Promise<Metadata> {
  const { profile } = await getHome();
  return {
    description: profile?.shortSummary ?? FALLBACK_SUMMARY,
    alternates: { canonical: "/" },
  };
}

/**
 * The narrative index of the portfolio (Sprint §2). Order answers, in turn:
 * who → what → why believe it → how he got here → where to go next. Sections
 * that have no real content simply do not render.
 */
export default async function HomePage() {
  const { profile, projects, experiences } = await getHome();

  return (
    <>
      <Hero profile={profile} />
      <FocusAreas />
      <FeaturedProjects projects={projects} />
      <CareerSummary experiences={experiences} />
      <NextStep profile={profile} />
    </>
  );
}
