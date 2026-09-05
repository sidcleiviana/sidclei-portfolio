import { PortableText } from "@/components/content/PortableText";
import { SanityImage } from "@/components/content/SanityImage";
import { MetricList } from "@/features/projects/MetricList";
import type {
  BeforeAfterBlock,
  MetricGridBlock,
  TechnicalDecisionsBlock,
  TimelineBlock,
} from "@/sanity/types";

import { BlockShell, Figure } from "./BlockShell";

export function MetricGrid({ block }: { block: MetricGridBlock }) {
  const metrics = block.metrics ?? [];
  if (!metrics.length) return null;
  return (
    <BlockShell heading={block.heading ?? "Resultados"} width="wide">
      <MetricList metrics={metrics} />
    </BlockShell>
  );
}

export function BeforeAfter({ block }: { block: BeforeAfterBlock }) {
  const sides = [
    { key: "before", fallback: "Antes", data: block.before },
    { key: "after", fallback: "Depois", data: block.after },
  ] as const;
  const usable = sides.filter(
    ({ data }) => data?.label || data?.description || data?.image?.asset
  );
  if (!usable.length) return null;

  return (
    <BlockShell heading={block.heading} width="wide">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {usable.map(({ key, fallback, data }) => (
          <div
            key={key}
            className="border-t border-[var(--color-border-strong)] pt-4"
          >
            <p className="text-fg-muted font-mono text-xs font-medium tracking-[0.14em] uppercase">
              {data?.label ?? fallback}
            </p>
            {data?.image?.asset ? (
              <Figure className="mt-3" caption={null}>
                <SanityImage
                  image={data.image}
                  sizes="(min-width: 640px) 24rem, 100vw"
                  ratio={4 / 3}
                  className="w-full border border-[var(--color-border)] object-cover"
                />
              </Figure>
            ) : null}
            {data?.description ? (
              <p className="text-fg-muted mt-3 text-sm leading-6">
                {data.description}
              </p>
            ) : null}
          </div>
        ))}
      </div>
    </BlockShell>
  );
}

export function Timeline({ block }: { block: TimelineBlock }) {
  const entries = (block.entries ?? []).filter((e) => e?.title);
  if (!entries.length) return null;
  return (
    <BlockShell heading={block.heading ?? "Processo"}>
      <ol className="space-y-6 border-l border-border-strong pl-6">
        {entries.map((entry) => (
          <li key={entry._key} className="relative">
            <span
              aria-hidden
              className="absolute top-1.5 -left-[1.6rem] h-2.5 w-2.5 rounded-full border-2 border-[var(--color-bg)] bg-[var(--color-accent)]"
            />
            {entry.date ? (
              <p className="text-fg-muted font-mono text-xs font-medium">
                {entry.date}
              </p>
            ) : null}
            <p className="font-medium">{entry.title}</p>
            {entry.description ? (
              <p className="text-fg-muted mt-0.5 text-sm">
                {entry.description}
              </p>
            ) : null}
          </li>
        ))}
      </ol>
    </BlockShell>
  );
}

export function TechnicalDecisions({
  block,
}: {
  block: TechnicalDecisionsBlock;
}) {
  const decisions = (block.decisions ?? []).filter(
    (d) => d?.question || d?.rationale?.length
  );
  if (!decisions.length) return null;
  return (
    <BlockShell heading={block.heading ?? "Decisões técnicas"}>
      <dl className="space-y-7">
        {decisions.map((decision) => (
          <div key={decision._key}>
            {decision.question ? (
              <dt className="text-fg font-medium">{decision.question}</dt>
            ) : null}
            <dd className="text-fg-muted mt-1.5">
              <PortableText value={decision.rationale} />
            </dd>
          </div>
        ))}
      </dl>
    </BlockShell>
  );
}
