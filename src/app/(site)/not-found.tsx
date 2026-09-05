import { ButtonLink, Container, Kicker, Section } from "@/components/ui";

export default function NotFound() {
  return (
    <Section spacing="lg">
      <Container size="wide">
        <Kicker>Erro 404</Kicker>
        <h1 className="font-display mt-4 text-2xl font-extrabold sm:text-3xl">
          Página não encontrada
        </h1>
        <p className="text-fg-muted mt-4 max-w-[var(--container-prose)] text-md text-pretty">
          O conteúdo que você procura não existe ou não está disponível
          publicamente.
        </p>
        <div className="mt-8">
          <ButtonLink href="/">Voltar ao início</ButtonLink>
        </div>
      </Container>
    </Section>
  );
}
