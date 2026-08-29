import type { Metadata } from "next";

import { Container, Section, SectionHeading, Stack } from "@/components/ui";
import { CareerJourney } from "@/features/experience/CareerJourney";
import { getExperiences } from "@/sanity/queries";

export const metadata: Metadata = {
  title: "Experiência",
  description:
    "Trajetória profissional de Sidclei Viana — funções, períodos, competências, tecnologias e os projetos de cada fase.",
  alternates: { canonical: "/experiencia" },
};

export default async function ExperiencePage() {
  const experiences = await getExperiences();

  return (
    <Section aria-labelledby="experience-title">
      <Container>
        <Stack gap="lg">
          <SectionHeading
            as="h1"
            id="experience-title"
            eyebrow="Trajetória"
            title="Experiência"
            description="Como cada fase levou à seguinte. A cronologia é a estrutura; a narrativa vem das funções, competências, tecnologias e projetos de cada período."
          />
          <CareerJourney experiences={experiences} />
        </Stack>
      </Container>
    </Section>
  );
}
