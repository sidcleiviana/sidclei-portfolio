import type { ProjectType } from "@/sanity/types";

/** Public, Portuguese labels for the internal (English, stable) values (§10). */
export const PROJECT_TYPE_LABELS: Record<ProjectType, string> = {
  production: "Produção",
  professional: "Profissional",
  lab: "Lab",
  study: "Estudo",
};

export function projectTypeLabel(
  type: ProjectType | string | undefined
): string {
  if (!type) return "Projeto";
  return PROJECT_TYPE_LABELS[type as ProjectType] ?? "Projeto";
}
