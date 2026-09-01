import { Container, Section, SectionHeading } from "@/components/ui";

import { FOCUS_AREAS } from "./identity";

/**
 * The four professional axes as an editorial index, not four SaaS cards
 * (Sprint 7 §11). Breadth is explained as layers of one capability.
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

        <ol className="mt-14 border-t border-[var(--color-rule)]">
          {FOCUS_AREAS.map((area, i) => (
            <li
              key={area.name}
              className="grid gap-x-8 gap-y-2 border-b border-[var(--color-border)] py-7 sm:grid-cols-12 sm:items-baseline"
            >
              <span className="u-label text-fg-faint sm:col-span-1">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display text-2xl sm:col-span-4 sm:text-3xl">
                {area.name}
              </h3>
              <p className="text-fg-muted text-pretty sm:col-span-7">
                {area.note}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
