import Link from "next/link";

import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <Container className="py-24 text-center">
      <h1 className="text-2xl font-semibold tracking-tight">
        Página não encontrada
      </h1>
      <p className="text-muted mt-3">
        O conteúdo que você procura não existe ou não está disponível
        publicamente.
      </p>
      <Link href="/" className="text-accent mt-6 inline-block underline">
        Voltar ao início
      </Link>
    </Container>
  );
}
