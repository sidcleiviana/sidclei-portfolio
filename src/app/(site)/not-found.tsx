import { ArrowLink, Container, Section } from "@/components/ui";

export default function NotFound() {
  return (
    <Section spacing="xl">
      <Container size="editorial">
        <p className="u-label text-fg-faint">Erro 404</p>
        <h1 className="font-display mt-6 text-4xl sm:text-5xl">
          Página não encontrada
        </h1>
        <p className="text-fg-muted mt-6 max-w-[var(--container-prose)] text-lg text-pretty">
          O conteúdo que você procura não existe ou não está disponível
          publicamente.
        </p>
        <div className="mt-10 border-t border-[var(--color-rule)] pt-8">
          <ArrowLink href="/">Voltar ao início</ArrowLink>
        </div>
      </Container>
    </Section>
  );
}
