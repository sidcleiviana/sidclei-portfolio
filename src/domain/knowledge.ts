/**
 * Grouping and ordering for the Knowledge Hub (Sprint §10, §26). Categories are
 * the schema's own `category` values — never invented here — sorted
 * alphabetically (pt) for a predictable order as the list grows. Items keep the
 * order the query gave them (featured-first for skills, then name).
 */

type Categorised = { category?: string | null };

export type CategoryGroup<T> = { category: string; items: T[] };

const UNCATEGORISED = "Outras";

export function groupByCategory<T extends Categorised>(
  items: T[]
): CategoryGroup<T>[] {
  const map = new Map<string, T[]>();
  for (const item of items) {
    const key = item.category?.trim() || UNCATEGORISED;
    const bucket = map.get(key);
    if (bucket) bucket.push(item);
    else map.set(key, [item]);
  }
  return [...map.entries()]
    .sort(([a], [b]) => {
      if (a === UNCATEGORISED) return 1;
      if (b === UNCATEGORISED) return -1;
      return a.localeCompare(b, "pt");
    })
    .map(([category, groupItems]) => ({ category, items: groupItems }));
}
