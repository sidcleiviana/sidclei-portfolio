import { Container } from "@/components/ui/Container";

export function SiteFooter({ note }: { note?: string | null }) {
  return (
    <footer className="border-border text-muted mt-24 border-t py-8 text-sm">
      <Container>
        <p>{note ?? `© ${new Date().getFullYear()} Sidclei Viana`}</p>
      </Container>
    </footer>
  );
}
