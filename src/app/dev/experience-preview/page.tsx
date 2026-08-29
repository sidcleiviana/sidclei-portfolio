import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  Badge,
  Container,
  Section,
  SectionHeading,
  Stack,
} from "@/components/ui";
import { CareerJourney } from "@/features/experience/CareerJourney";
import {
  experienceFixtures,
  sparseExperienceFixture,
} from "@/features/experience/fixtures";

/**
 * Dev-only visual sandbox for `/experiencia` (Sprint §29). Renders the rich +
 * sparse SYNTHETIC fixtures and an empty state. 404 in production builds,
 * noindex, disallowed in robots.txt, never linked.
 */
export const metadata: Metadata = {
  title: "experience-preview (dev)",
  robots: { index: false, follow: false },
};

export default function ExperiencePreviewPage() {
  if (process.env.NODE_ENV === "production") notFound();

  return (
    <Section>
      <Container>
        <Stack gap="xl">
          <Badge tone="accent">
            DEV · sandbox de layout · conteúdo sintético
          </Badge>

          <div>
            <SectionHeading
              as="h1"
              eyebrow="Trajetória"
              title="Experiência (rica + enxuta)"
            />
            <div className="mt-8">
              <CareerJourney experiences={experienceFixtures} />
            </div>
          </div>

          <div>
            <SectionHeading as="h2" title="Só a experiência enxuta" />
            <div className="mt-8">
              <CareerJourney experiences={[sparseExperienceFixture]} />
            </div>
          </div>

          <div>
            <SectionHeading as="h2" title="Estado vazio" />
            <div className="mt-8">
              <CareerJourney experiences={[]} />
            </div>
          </div>
        </Stack>
      </Container>
    </Section>
  );
}
