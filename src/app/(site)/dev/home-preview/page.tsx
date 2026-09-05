import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { isCurrent } from "@/domain/monthRange";
import { FeaturedProject } from "@/features/home/FeaturedProject";
import { Hero } from "@/features/home/Hero";
import { HomeKnowledge } from "@/features/home/HomeKnowledge";
import { HomeOutro } from "@/features/home/HomeOutro";
import { HomeTrajectory } from "@/features/home/HomeTrajectory";
import { richHomeFixture } from "@/features/home/fixtures";

export const metadata: Metadata = {
  title: "Home preview (dev)",
  robots: { index: false, follow: false },
};

/**
 * DEV-ONLY homologation surface for the Sprint 10 identity work. Renders the
 * Home composition from the synthetic fixture. `?photo=off` drops the portrait
 * so the without-photo state can be checked side by side.
 *
 * Never reachable in production (`notFound()`), never indexed, `/dev/` is
 * disallowed in `robots.txt`. The fixture is synthetic — no real professional
 * claims — and the portrait is an obvious placeholder, never a real photo.
 */
export default async function HomePreviewPage({
  searchParams,
}: {
  searchParams: Promise<{ photo?: string }>;
}) {
  if (process.env.NODE_ENV === "production") notFound();

  const withPhoto = (await searchParams).photo !== "off";
  const { profile, projects, experiences, featuredSkills } = richHomeFixture;
  const current = experiences.find((e) => isCurrent(e.period)) ?? null;
  const heroTech = (current?.technologies ?? [])
    .map((t) => t?.name)
    .filter((n): n is string => Boolean(n));

  const previewSrc = withPhoto
    ? `data:image/svg+xml,${encodeURIComponent(
        `<svg xmlns="http://www.w3.org/2000/svg" width="900" height="1125" viewBox="0 0 900 1125"><rect width="900" height="1125" fill="#191d2e"/><g fill="none" stroke="#3a3f57" stroke-width="1"><path d="M0 375H900M0 750H900M300 0V1125M600 0V1125"/></g><circle cx="450" cy="470" r="150" fill="#242a42"/><rect x="300" y="640" width="300" height="240" rx="12" fill="#242a42"/><text x="450" y="1060" fill="#8b90ff" font-family="monospace" font-size="30" text-anchor="middle">RETRATO — PREVIEW DEV</text></svg>`
      )}`
    : undefined;

  return (
    <>
      <Hero
        profile={profile}
        current={current}
        technologies={heroTech}
        portraitPreviewSrc={previewSrc}
      />
      <FeaturedProject projects={projects} />
      <HomeTrajectory experiences={experiences} />
      <HomeKnowledge skills={featuredSkills} />
      <HomeOutro profile={profile} />
    </>
  );
}
