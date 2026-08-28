import type { Evidence } from "@/sanity/types";

export function EvidenceList({ evidence }: { evidence: Evidence[] }) {
  const items = evidence.filter((item) => item?.label);
  if (!items.length) return null;

  return (
    <section className="mx-auto w-full max-w-2xl">
      <h2 className="mb-4 text-lg font-semibold tracking-tight">Evidências</h2>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={item._key ?? index} className="text-sm">
            <span className="text-fg-muted text-xs tracking-wide uppercase">
              {item.type}
            </span>{" "}
            {item.url ? (
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent underline underline-offset-2"
              >
                {item.label}
              </a>
            ) : (
              <span>{item.label}</span>
            )}
            {item.description ? (
              <p className="text-fg-muted">{item.description}</p>
            ) : null}
          </li>
        ))}
      </ul>
    </section>
  );
}
