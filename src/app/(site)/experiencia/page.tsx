import type { Metadata } from "next";

import { Container, Kicker, Section } from "@/components/ui";
import {
  TrajectorySelector,
  type TrajectoryEntry,
} from "@/features/experience/TrajectorySelector";
import { getExperiences } from "@/sanity/queries";

export const metadata: Metadata = {
  title: "Experiência",
  description:
    "Trajetória profissional de Sidclei Viana — funções, períodos, competências, tecnologias e os projetos de cada fase, em uma interface de seleção.",
  alternates: { canonical: "/experiencia" },
};

export default async function ExperiencePage() {
  const experiences = (await getExperiences()).filter(
    (e) => e.role || e.company
  ) as TrajectoryEntry[];

  return (
    <Section spacing="lg" aria-labelledby="experience-title">
      <Container size="wide">
        <Kicker>Trajetória</Kicker>
        <h1 className="font-display mt-3 text-2xl font-extrabold sm:text-3xl" id="experience-title">
          Experiência
        </h1>
        <p className="text-fg-muted mt-3 max-w-[54ch] text-md text-pretty">
          Selecione uma fase para ver a função, o resumo, as responsabilidades,
          as competências, as tecnologias e os projetos daquele período.
        </p>

        <div className="mt-12">
          {experiences.length ? (
            <TrajectorySelector experiences={experiences} />
          ) : (
            <p className="text-fg-muted border-border border-t pt-6 font-mono text-sm">
              A trajetória profissional ainda não foi publicada.
            </p>
          )}
        </div>
      </Container>
    </Section>
  );
}
