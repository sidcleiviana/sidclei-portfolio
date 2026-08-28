import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  hasRenderer,
  renderContentBlock,
} from "@/features/projects/blockRegistry";
import type { ContentBlock } from "@/sanity/types";

describe("content block registry", () => {
  it("knows which block types have a renderer", () => {
    expect(hasRenderer("calloutBlock")).toBe(true);
    expect(hasRenderer("metricGridBlock")).toBe(true);
    expect(hasRenderer("totallyMadeUpBlock")).toBe(false);
  });

  it("renders a known block from its _type", () => {
    const block: ContentBlock = {
      _key: "a1",
      _type: "calloutBlock",
      tone: "info",
      title: "Nota importante",
      body: [
        {
          _type: "block",
          _key: "b1",
          style: "normal",
          children: [
            { _type: "span", _key: "s1", text: "Conteúdo do destaque" },
          ],
        },
      ],
    };

    render(<>{renderContentBlock(block)}</>);
    expect(screen.getByText("Nota importante")).toBeInTheDocument();
    expect(screen.getByText("Conteúdo do destaque")).toBeInTheDocument();
  });

  it("does not throw on an unknown block type", () => {
    const block: ContentBlock = {
      _key: "x1",
      _type: "blockFromAFutureSprint",
      whatever: 123,
    };

    expect(() => render(<>{renderContentBlock(block)}</>)).not.toThrow();
    // dev builds surface it to developers; it is never a user-facing placeholder
    expect(screen.getByText(/blockFromAFutureSprint/)).toBeInTheDocument();
  });

  it("renders a metric grid, tolerating metrics with only before/after", () => {
    const block: ContentBlock = {
      _key: "m1",
      _type: "metricGridBlock",
      heading: "Resultados",
      metrics: [
        {
          _key: "mm1",
          label: "Tempo de processo",
          before: "30 dias",
          after: "10 horas",
        },
        { _key: "mm2", label: "Usuários", value: "150", unit: "usuários" },
      ],
    };

    render(<>{renderContentBlock(block)}</>);
    expect(screen.getByText("30 dias → 10 horas")).toBeInTheDocument();
    expect(screen.getByText("150 usuários")).toBeInTheDocument();
  });
});
