import { uniqueExperienceAnchors } from "@/domain/experienceAnchor";
import type { ExperienceEntry } from "@/sanity/types";

import { ExperienceItem } from "./ExperienceItem";

/**
 * The trajectory as a sequence of steps, newest first. The connecting rail is
 * decorative — order is carried by the chronology and the period labels, not
 * by the line (Sprint §11, §23).
 */
export function CareerJourney({
  experiences,
}: {
  experiences: ExperienceEntry[];
}) {
  if (!experiences.length) {
    return (
      <p className="border-border bg-bg-subtle text-fg-muted rounded-md border border-dashed p-8 text-center text-sm">
        A trajetória profissional ainda não foi publicada.
      </p>
    );
  }

  const anchors = uniqueExperienceAnchors(experiences);

  return (
    <ol className="border-border relative space-y-14 border-l pl-6 sm:space-y-20 sm:pl-9">
      {experiences.map((experience, i) => (
        <li key={experience._id} className="relative">
          <span
            aria-hidden
            className="absolute top-2 -left-6 h-2.5 w-2.5 -translate-x-1/2 rounded-full border-2 border-[var(--color-bg)] bg-[var(--color-accent)] sm:-left-9"
          />
          <ExperienceItem experience={experience} anchor={anchors[i]!} />
        </li>
      ))}
    </ol>
  );
}
