import type { Metric } from "@/sanity/types";

function metricValue(metric: Metric): string | null {
  if (metric.before || metric.after) {
    return `${metric.before ?? "—"} → ${metric.after ?? "—"}`;
  }
  const parts = [metric.value, metric.unit].filter(Boolean);
  return parts.length ? parts.join(" ") : null;
}

export function MetricList({ metrics }: { metrics: Metric[] }) {
  const usable = metrics.filter((metric) => metricValue(metric));
  if (!usable.length) return null;

  return (
    <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {usable.map((metric, index) => (
        <div
          key={metric._key ?? index}
          className="border-border rounded-md border p-4"
        >
          <dt className="text-fg-muted text-sm">{metric.label}</dt>
          <dd className="mt-1 text-lg font-semibold tracking-tight">
            {metricValue(metric)}
          </dd>
          {metric.description ? (
            <p className="text-fg-muted mt-1 text-xs">{metric.description}</p>
          ) : null}
        </div>
      ))}
    </dl>
  );
}
