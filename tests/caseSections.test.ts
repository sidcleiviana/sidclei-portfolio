import { describe, expect, it } from "vitest";

import {
  blockAnchorId,
  blockHeading,
  buildCaseSections,
  shouldShowToc,
} from "@/domain/caseSections";
import type { ContentBlock } from "@/sanity/types";

const block = (over: Partial<ContentBlock> & { _type: string }) =>
  ({ _key: "k", ...over }) as ContentBlock;

describe("blockHeading", () => {
  it("uses an explicit heading or title", () => {
    expect(
      blockHeading(block({ _type: "galleryBlock", heading: "Telas" } as never))
    ).toBe("Telas");
    expect(
      blockHeading(block({ _type: "videoBlock", title: "Demo" } as never))
    ).toBe("Demo");
  });
  it("falls back to a default for headed block types", () => {
    expect(blockHeading(block({ _type: "architectureBlock" }))).toBe(
      "Arquitetura"
    );
    expect(blockHeading(block({ _type: "technicalDecisionsBlock" }))).toBe(
      "Decisões técnicas"
    );
  });
  it("keeps inline-punctuation blocks out of the TOC, even with a title", () => {
    expect(blockHeading(block({ _type: "richTextBlock" }))).toBeNull();
    expect(blockHeading(block({ _type: "imageBlock" }))).toBeNull();
    expect(
      blockHeading(
        block({ _type: "calloutBlock", title: "Observação" } as never)
      )
    ).toBeNull();
  });
});

describe("buildCaseSections", () => {
  it("only lists sections that will render, in page order", () => {
    const sections = buildCaseSections({
      hasContribution: true,
      hasContext: true,
      hasProblem: false,
      blocks: [
        block({ _key: "a", _type: "richTextBlock" }),
        block({
          _key: "b",
          _type: "timelineBlock",
          heading: "Processo",
        } as never),
      ],
      hasResults: true,
      hasEvidence: false,
    });
    expect(sections.map((s) => s.id)).toEqual([
      "contribuicao",
      "contexto",
      "sec-b",
      "resultados",
    ]);
    expect(sections.map((s) => s.label)).toEqual([
      "Contribuição",
      "Contexto",
      "Processo",
      "Resultados",
    ]);
  });

  it("anchors block ids off the block key", () => {
    expect(blockAnchorId({ _key: "xyz" })).toBe("sec-xyz");
  });
});

describe("shouldShowToc", () => {
  it("needs at least four sections to be worth it", () => {
    expect(shouldShowToc([{ id: "a", label: "A" }])).toBe(false);
    expect(
      shouldShowToc([
        { id: "a", label: "A" },
        { id: "b", label: "B" },
        { id: "c", label: "C" },
        { id: "d", label: "D" },
      ])
    ).toBe(true);
  });
});
