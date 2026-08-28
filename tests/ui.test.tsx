import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { TextLink } from "@/components/ui/TextLink";

describe("Button", () => {
  it("renders a real <button> with an explicit type", () => {
    render(<Button>Salvar</Button>);
    const btn = screen.getByRole("button", { name: "Salvar" });
    expect(btn.tagName).toBe("BUTTON");
    expect(btn).toHaveAttribute("type", "button");
  });

  it("carries variant styling", () => {
    render(
      <Button variant="secondary" size="sm">
        X
      </Button>
    );
    expect(screen.getByRole("button", { name: "X" }).className).toMatch(
      /border-border-strong/
    );
  });
});

describe("ButtonLink", () => {
  it("renders an anchor to the given href", () => {
    render(<ButtonLink href="/projects">Ver projetos</ButtonLink>);
    const link = screen.getByRole("link", { name: "Ver projetos" });
    expect(link.tagName).toBe("A");
    expect(link).toHaveAttribute("href", "/projects");
  });
});

describe("TextLink", () => {
  it("treats http(s) links as external with a safe rel and a hint", () => {
    render(<TextLink href="https://example.com">Fonte</TextLink>);
    const link = screen.getByRole("link", { name: /Fonte/ });
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
    expect(link).toHaveTextContent("abre em nova aba");
  });

  it("keeps internal links in the same tab", () => {
    render(<TextLink href="/sobre">Sobre</TextLink>);
    const link = screen.getByRole("link", { name: "Sobre" });
    expect(link).not.toHaveAttribute("target");
  });
});

describe("Badge", () => {
  it("renders its content", () => {
    render(<Badge tone="accent">Produção</Badge>);
    expect(screen.getByText("Produção")).toBeInTheDocument();
  });
});
