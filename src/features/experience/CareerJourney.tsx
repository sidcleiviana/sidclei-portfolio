import { uniqueExperienceAnchors } from "@/domain/experienceAnchor";
import type { ExperienceEntry } from "@/sanity/types";

import { ExperienceItem } from "./ExperienceItem";

/**
 * The trajectory as an editorial progression, newest first — chronological
 * blocks bound by rules, the sequence itself showing the evolution (Sprint 7
 * §19, §20). No connecting rail, no dots.
 */
export function CareerJourney({
  experiences,
}: {
  experiences: ExperienceEntry[];
}) {
  if (!experiences.length) {
    return (
      <p className="text-fg-muted border-t border-[var(--color-border)] pt-6 font-mono text-sm">
        A trajetória profissional ainda não foi publicada.
      </p>
    );
  }

  const anchors = uniqueExperienceAnchors(experiences);

  return (
    <ol className="flex flex-col gap-20 sm:gap-28">
      {experiences.map((experience, i) => (
        <li key={experience._id}>
          <ExperienceItem
            experience={experience}
            anchor={anchors[i]!}
            index={i + 1}
          />
        </li>
      ))}
    </ol>
  );
}
