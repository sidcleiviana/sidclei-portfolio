import type { Metric } from "@/sanity/types";

/**
 * The value exactly as authored. A `before → after` pair is shown verbatim
 * ("30 dias → 10 horas"); no percentages are computed to look more impressive
 * (Sprint §23). Returns null when there is nothing measurable.
 */
function metricValue(metric: Metric): string | null {
  if (metric.before || metric.after) {
    return `${metric.before ?? "—"} → ${metric.after ?? "—"}`;
  }
  const parts = [metric.value, metric.unit].filter(Boolean);
  return parts.length ? parts.join(" ") : null;
}

export function MetricList({ metrics }: { metrics: Metric[] }) {
  const usable = metrics
    .map((m) => ({ metric: m, value: metricValue(m) }))
    .filter((x): x is { metric: Metric; value: string } => Boolean(x.value));
  if (!usable.length) return null;

  return (
    <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {usable.map(({ metric, value }, index) => (
        <div
          key={metric._key ?? index}
          className="border-border bg-surface rounded-md border p-4"
        >
          <dd className="text-fg text-xl font-semibold tracking-tight">
            {value}
          </dd>
          {metric.label ? (
            <dt className="text-fg-muted mt-1 text-sm">{metric.label}</dt>
          ) : null}
          {metric.description ? (
            <p className="text-fg-muted mt-2 text-xs leading-5">
              {metric.description}
            </p>
          ) : null}
        </div>
      ))}
    </dl>
  );
}
