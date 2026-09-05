import type { Metadata } from "next";

import { FALLBACK_SUMMARY } from "@/features/home/identity";
import { FeaturedProject } from "@/features/home/FeaturedProject";
import { Hero } from "@/features/home/Hero";
import { HomeKnowledge } from "@/features/home/HomeKnowledge";
import { HomeOutro } from "@/features/home/HomeOutro";
import { HomeTrajectory } from "@/features/home/HomeTrajectory";
import { isCurrent } from "@/domain/monthRange";
import { getHome } from "@/sanity/queries";

export async function generateMetadata(): Promise<Metadata> {
  const { profile } = await getHome();
  return {
    description: profile?.shortSummary ?? FALLBACK_SUMMARY,
    alternates: { canonical: "/" },
  };
}

/**
 * The Home as a set of composed surfaces, not an article. Graphite hero →
 * paper project → tonal trajectory → paper knowledge → graphite outro → navy
 * footer. Three modules carry interaction (featured project, trajectory,
 * knowledge); the rest is composition. Sections with no real content do not
 * render.
 */
export default async function HomePage() {
  const { profile, projects, experiences, featuredSkills } = await getHome();

  const current = experiences.find((e) => isCurrent(e.period)) ?? null;
  const heroTech = (current?.technologies ?? [])
    .map((t) => t?.name)
    .filter((n): n is string => Boolean(n));

  return (
    <>
      <Hero profile={profile} current={current} technologies={heroTech} />
      <FeaturedProject projects={projects} />
      <HomeTrajectory experiences={experiences} />
      <HomeKnowledge skills={featuredSkills} />
      <HomeOutro profile={profile} />
    </>
  );
}
