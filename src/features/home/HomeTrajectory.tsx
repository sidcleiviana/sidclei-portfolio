import Link from "next/link";

import { Container, Kicker, Surface } from "@/components/ui";
import {
  TrajectorySelector,
  type TrajectoryEntry,
} from "@/features/experience/TrajectorySelector";
import type { HomeExperienceRef } from "@/sanity/types";

/**
 * The trajectory preview on the Home — the same interactive selector as
 * `/experiencia`, on a tonal surface, limited to the recent roles. Renders
 * nothing without experience content.
 */
export function HomeTrajectory({
  experiences,
}: {
  experiences: HomeExperienceRef[];
}) {
  const entries = experiences.filter(
    (e) => e.role || e.company
  ) as TrajectoryEntry[];
  if (!entries.length) return null;

  return (
    <Surface kind="tonal" pad="lg">
      <Container size="wide">
        <div className="mb-8 flex flex-wrap items-baseline justify-between gap-3">
          <Kicker>Trajetória</Kicker>
          <Link
            href="/experiencia"
            className="u-label hover:text-fg rounded-sm"
          >
            Ver trajetória completa →
          </Link>
        </div>
        <TrajectorySelector experiences={entries} />
      </Container>
    </Surface>
  );
}
