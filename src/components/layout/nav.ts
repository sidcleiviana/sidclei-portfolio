/**
 * Primary navigation. Entries exist only for routes that exist (Design System
 * §14 — no empty pages to fill a menu). Grows as the product grows.
 */
export const PRIMARY_NAV = [
  { href: "/", label: "Início" },
  { href: "/projects", label: "Projetos" },
  { href: "/experiencia", label: "Experiência" },
] as const;
