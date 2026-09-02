import { Container, Section, SectionHeading } from "@/components/ui";

import { FOCUS_AREAS } from "./identity";

/**
 * The four professional axes as an editorial index, not four SaaS cards
 * (Sprint 7 §11; 7.1 §5 — rhythm and scale vary down the list, a hairline ties
 * them into one sequence). Breadth is explained as layers of one capability.
 */
export function FocusAreas() {
  return (
    <Section spacing="lg" aria-labelledby="focus-title">
      <Container size="editorial">
        <SectionHeading
          as="h2"
          id="focus-title"
          index={2}
          eyebrow="Atuação"
          title="O que faço"
          description="Quatro frentes que se sustentam — entender uma operação, achar o problema e construir a solução técnica."
        />

        <ol className="mt-16">
          {FOCUS_AREAS.map((area, i) => (
            <li
              key={area.name}
              className="group grid grid-cols-12 items-baseline gap-x-6 gap-y-2 border-t border-[var(--color-rule)] py-8 first:border-t-2"
            >
              <span
                aria-hidden
                className="font-display text-fg-faint col-span-2 text-2xl tabular-nums sm:col-span-1 sm:text-3xl"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3
                className="font-display col-span-10 text-[clamp(1.75rem,4vw,2.75rem)] leading-[1.05] sm:col-span-6 lg:col-span-5"
                style={{ paddingLeft: `${i * 0.4}rem` }}
              >
                {area.name}
              </h3>
              <p className="text-fg-muted col-span-12 text-pretty sm:col-span-5 lg:col-span-6 lg:max-w-[34ch] lg:justify-self-end lg:text-right">
                {area.note}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
