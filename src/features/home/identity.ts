/**
 * Neutral fallbacks for the identity the CMS does not carry yet, and the four
 * professional focus areas. Everything here is drawn from `CLAUDE.md` §1–3
 * (the product constitution) — no invented claims about scale, results or
 * seniority (Sprint §4).
 */

export const FALLBACK_NAME = "Sidclei Viana";
/**
 * Technical fallback only — used when the CMS returns no `profile` (outage) and
 * in dev/test. It is deliberately kept at the *currently published* headline so
 * a code deploy can never surface a new positioning before the Profile document
 * itself is published (Sprint 10 governance).
 */
export const FALLBACK_HEADLINE = "Desenvolvedor de Software";
export const FALLBACK_SUMMARY =
  "Trajetória entre infraestrutura, sistemas, ERP, dados e automação — hoje construindo software. Este portfólio mostra onde e como cada conhecimento foi aplicado.";

/**
 * The territory line under the hero headline (CLAUDE.md §3–4). Not a headline
 * and not a claim of seniority — the four transversal areas as one line.
 */
export const FOCUS_LINE = "Automação · Sistemas · Dados · IA";

/** CLAUDE.md §3 — the four transversal areas. Definitional, not achievements. */
export const FOCUS_AREAS: ReadonlyArray<{ name: string; note: string }> = [
  { name: "Software", note: "Aplicações, serviços e integrações." },
  {
    name: "Automação",
    note: "Rotinas que substituem trabalho manual repetitivo.",
  },
  { name: "Dados", note: "Coleta, transformação e leitura de dados." },
  { name: "Sistemas", note: "ERP, infraestrutura e ferramentas internas." },
];
