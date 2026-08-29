import { Container, Section, SectionHeading, Stack } from "@/components/ui";

import { FOCUS_AREAS } from "./identity";

/**
 * "O que faço" — the professional axes, not a skills cloud (Sprint §16). Each
 * area is a capability; technologies and competences are the evidence behind
 * them and live on the project / experience pages (Sprint §17).
 */
export function FocusAreas() {
  return (
    <Section aria-labelledby="focus-title">
      <Container>
        <Stack gap="lg">
          <SectionHeading
            id="focus-title"
            eyebrow="Atuação"
            title="O que faço"
            description="Áreas que se sustentam — entender uma operação, achar o problema e construir a solução técnica."
          />
          <dl className="grid grid-cols-1 gap-x-10 gap-y-6 sm:grid-cols-2">
            {FOCUS_AREAS.map((area) => (
              <div key={area.name} className="border-border border-t pt-4">
                <dt className="font-medium">{area.name}</dt>
                <dd className="text-fg-muted mt-1 text-sm text-pretty">
                  {area.note}
                </dd>
              </div>
            ))}
          </dl>
        </Stack>
      </Container>
    </Section>
  );
}
