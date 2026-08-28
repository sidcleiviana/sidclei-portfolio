import { Badge } from "@/components/ui/Badge";
import { TextLink } from "@/components/ui/TextLink";
import type { Evidence } from "@/sanity/types";

const EVIDENCE_LABEL: Record<string, string> = {
  github: "GitHub",
  demo: "Demo",
  video: "Vídeo",
  linkedin: "LinkedIn",
  document: "Documento",
  presentation: "Apresentação",
  article: "Artigo",
  certificate: "Certificado",
  other: "Link",
};

/**
 * Evidence is central to the portfolio (competência → projeto → evidência,
 * CLAUDE.md §4 / Sprint §17). Renders only what the CMS holds — never a
 * fabricated link or mockup.
 */
export function EvidenceList({ evidence }: { evidence: Evidence[] }) {
  const items = evidence.filter((item) => item?.label || item?.url);
  if (!items.length) return null;

  return (
    <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {items.map((item, index) => (
        <li
          key={item._key ?? index}
          className="border-border bg-surface rounded-md border p-4"
        >
          <Badge tone="neutral" mono className="mb-2">
            {EVIDENCE_LABEL[item.type ?? "other"] ?? item.type ?? "Link"}
          </Badge>
          <p className="text-sm font-medium">
            {item.url ? (
              <TextLink href={item.url}>{item.label || item.url}</TextLink>
            ) : (
              (item.label ?? "")
            )}
          </p>
          {item.description ? (
            <p className="text-fg-muted mt-1 text-sm">{item.description}</p>
          ) : null}
        </li>
      ))}
    </ul>
  );
}
