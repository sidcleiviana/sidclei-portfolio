import { PortableText } from "@/components/content/PortableText";
import { SanityImage } from "@/components/content/SanityImage";
import { MetricList } from "@/features/projects/MetricList";
import type {
  BeforeAfterBlock,
  MetricGridBlock,
  TechnicalDecisionsBlock,
  TimelineBlock,
} from "@/sanity/types";

import { BlockSection } from "./shared";

export function MetricGrid({ block }: { block: MetricGridBlock }) {
  const metrics = block.metrics ?? [];
  if (!metrics.length) return null;
  return (
    <BlockSection heading={block.heading} wide>
      <MetricList metrics={metrics} />
    </BlockSection>
  );
}

export function BeforeAfter({ block }: { block: BeforeAfterBlock }) {
  const sides = [
    { key: "before", label: "Antes", data: block.before },
    { key: "after", label: "Depois", data: block.after },
  ] as const;
  if (!block.before && !block.after) return null;
  return (
    <BlockSection heading={block.heading} wide>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {sides.map(({ key, label, data }) => (
          <div
            key={key}
            className="border-border rounded-[var(--radius)] border p-4"
          >
            <p className="text-muted text-xs font-semibold tracking-wide uppercase">
              {data?.label ?? label}
            </p>
            {data?.image?.asset ? (
              <SanityImage
                image={data.image}
                sizes="(min-width: 640px) 384px, 100vw"
                className="mt-2 w-full rounded"
              />
            ) : null}
            {data?.description ? (
              <p className="mt-2 text-sm leading-6">{data.description}</p>
            ) : null}
          </div>
        ))}
      </div>
    </BlockSection>
  );
}

export function Timeline({ block }: { block: TimelineBlock }) {
  const entries = block.entries ?? [];
  if (!entries.length) return null;
  return (
    <BlockSection heading={block.heading}>
      <ol className="border-border space-y-4 border-l pl-5">
        {entries.map((entry) => (
          <li key={entry._key} className="relative">
            <span
              aria-hidden
              className="bg-accent absolute top-1.5 -left-[1.4rem] h-2 w-2 rounded-full"
            />
            {entry.date ? (
              <p className="text-muted text-xs font-medium">{entry.date}</p>
            ) : null}
            <p className="font-medium">{entry.title}</p>
            {entry.description ? (
              <p className="text-muted text-sm">{entry.description}</p>
            ) : null}
          </li>
        ))}
      </ol>
    </BlockSection>
  );
}

export function TechnicalDecisions({
  block,
}: {
  block: TechnicalDecisionsBlock;
}) {
  const decisions = block.decisions ?? [];
  if (!decisions.length) return null;
  return (
    <BlockSection heading={block.heading ?? "Decisões técnicas"}>
      <dl className="space-y-6">
        {decisions.map((decision) => (
          <div key={decision._key}>
            <dt className="font-medium">{decision.question}</dt>
            <dd className="text-muted mt-1">
              <PortableText value={decision.rationale} />
            </dd>
          </div>
        ))}
      </dl>
    </BlockSection>
  );
}
