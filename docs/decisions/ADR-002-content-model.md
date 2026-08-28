# ADR-002 — Modelo de conteúdo relacional e modular

- **Status:** aceito
- **Data:** 2026-08-27
- **Sprint:** 0

## Contexto

O produto é "um sistema de conteúdo relacional", não uma coleção de páginas
(Sprint §2). Precisa suportar, sem alteração de schema central:

- projetos simples (título + descrição + tecnologia) e projetos-case completos;
- projetos individuais **e** em equipe, distinguindo a contribuição de Sidclei;
- confidencialidade (público / anonimizado / privado);
- relações reutilizáveis por filtros, "projetos relacionados", busca futura e
  Knowledge Graph — sem manter um segundo banco de dados para o grafo.

## Decisão

1. **Entidades separadas** para `project`, `skill`, `technology`, `experience`,
   `education`, `certification`, `learningItem`, mais os singletons `profile` e
   `siteSettings`. Relações via **referência** do Sanity.
2. **`skill` ≠ `technology`** — competência vs. ferramenta. Sem sobreposição.
3. **Sem níveis de proficiência** em lugar nenhum (nada de `proficiency: 95`,
   estrelas, barras). Competência se prova por projeto/experiência/evidência.
4. **`projectContribution`** como objeto dedicado: `authorship`
   (`individual`/`team`/`participation`) + `roles[]` + `responsibilities[]` +
   `teamContext` + `summary`. A UI diz "Minha contribuição", nunca "fiz sozinho".
5. **`contentBlocks[]`** com blocos **semânticos** (richText, gallery, video,
   metricGrid, beforeAfter, architecture, timeline, technicalDecisions, learning,
   callout, links, image). Nenhum primitivo de layout no CMS (§23).
6. **Confidencialidade no dado**, não só na UI: `visibility` +
   `confidentialityNotice`, com o filtro aplicado na query GROQ e revalidado no
   domínio (`isPubliclyVisible`). Ver ADR-003 e `docs/architecture.md`.
7. **Direção única de referência** + relação inversa **derivada por GROQ**
   (ex.: `experience` não lista `projects[]`; a lista é uma query).

## Alternativas consideradas

- **Um único tipo "content" genérico com blocos livres** — vira page builder
  (Webflow), explicitamente rejeitado (§23). Perde tipagem e relações.
- **`technology` como string em `project`** — impede o grafo e cria duplicatas
  ("Python" escrito de 5 formas). Rejeitado (§24).
- **Referência bidirecional project⇄experience no CMS** — dupla manutenção e
  risco de inconsistência. Derivar a inversa é mais barato e sempre correto.
- **Campos fixos para "arquitetura", "métricas", "galeria" no schema de project**
  — obrigaria todo projeto ao mesmo formato; blocos opcionais resolvem melhor.

## Consequências

- **+** Um projeto novo, simples ou complexo, cabe no modelo sem código.
- **+** O grafo/busca/IA futuros reutilizam as mesmas referências.
- **+** Cases em equipe são honestos por construção.
- **−** Mais tipos para o editor navegar → mitigado pela `structure.ts`
  (grupos: Perfil, Projetos, Conhecimento, Carreira, Formação, Configuração).
- **−** Tipos de resultado das queries escritos à mão por ora
  (`src/sanity/types.ts`); `sanity typegen` pode substituí-los depois sem tocar
  componentes.
