import { ButtonLink, Container, Section, Stack } from "@/components/ui";

export default function NotFound() {
  return (
    <Section spacing="lg">
      <Container className="text-center">
        <Stack gap="md" className="mx-auto max-w-md items-center">
          <p className="text-fg-muted font-mono text-sm">404</p>
          <h1 className="text-2xl sm:text-3xl">Página não encontrada</h1>
          <p className="text-fg-muted">
            O conteúdo que você procura não existe ou não está disponível
            publicamente.
          </p>
          <ButtonLink href="/" variant="secondary" size="sm">
            Voltar ao início
          </ButtonLink>
        </Stack>
      </Container>
    </Section>
  );
}
