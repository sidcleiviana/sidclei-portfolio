# CLAUDE.md — Portfólio Profissional Sidclei Viana

## 1. Sobre este projeto

Este projeto NÃO é um currículo convertido em página web.

É uma plataforma profissional pessoal, modular e expansível, criada para apresentar:

- quem é Sidclei Viana;
- sua trajetória profissional;
- o que ele sabe;
- onde aplicou esse conhecimento;
- quais problemas já resolveu;
- quais projetos já construiu;
- quais resultados produziu;
- o que estuda;
- como seus diferentes conhecimentos se relacionam.

O produto deve transmitir profundidade técnica, curiosidade, capacidade de aprender e, principalmente, capacidade de transformar problemas reais em soluções.

A informação é o elemento mais importante do produto.

Design, animações, efeitos e interações existem para melhorar a compreensão, exploração e percepção da informação — nunca para competir com ela.

---

# 2. Objetivo principal

Quando uma empresa, recrutador, gestor ou profissional técnico visitar o site, deve conseguir responder rapidamente:

1. Quem é Sidclei?
2. Qual é sua profissão?
3. Em quais áreas ele atua?
4. O que ele sabe fazer?
5. Onde ele aplicou esse conhecimento?
6. Quais projetos já construiu?
7. Quais resultados alcançou?
8. Qual é sua experiência profissional?
9. O quanto estuda e se desenvolve?
10. Há evidências reais das competências apresentadas?

O portfólio deve reduzir a sensação de:

> "Ele diz que sabe muitas coisas."

e substituí-la por:

> "Consigo ver exatamente onde e como ele utilizou cada conhecimento."

---

# 3. Posicionamento profissional

A identidade principal deve permanecer centrada em:

## Desenvolvedor de Software

com atuação e experiência transversal em:

- Software
- Automação
- Dados
- Sistemas

Áreas complementares podem aparecer quando pertinentes:

- Inteligência Artificial
- Machine Learning
- Banco de Dados
- ERP
- Infraestrutura
- Redes
- Cybersecurity
- Integrações
- RPA
- Analytics

Não apresentar Sidclei como especialista absoluto em todas essas áreas.

A amplitude profissional deve ser explicada através da trajetória.

A narrativa é aproximadamente:

Infraestrutura
→ Sistemas
→ ERP
→ Dados
→ Automação
→ Desenvolvimento de Software

As áreas não são uma coleção aleatória de tecnologias.

Elas representam diferentes camadas de uma mesma capacidade:

> entender operações, identificar problemas e construir soluções tecnológicas.

---

# 4. Princípio central: PROVA

Nunca apresentar uma competência isoladamente quando for possível relacioná-la a evidências.

A estrutura conceitual do portfólio é:

Competência
→ Experiência
→ Projeto
→ Evidência
→ Resultado

Exemplo:

Python
→ utilizado profissionalmente
→ utilizado em determinados projetos
→ determinadas soluções foram construídas
→ determinados resultados foram obtidos

Evitar listas gigantes de tecnologias sem contexto.

---

# 5. Não usar níveis artificiais de habilidade

É proibido utilizar elementos como:

Python: 95%
SQL: 90%
JavaScript: 80%

Também evitar:

- estrelas;
- barras de progresso;
- níveis arbitrários;
- "Expert";
- "Master";
- classificações subjetivas sem evidência.

Competências devem ser demonstradas através de:

- projetos;
- experiência;
- uso profissional;
- estudos;
- certificações;
- resultados;
- artefatos;
- publicações;
- experimentos.

---

# 6. Projetos são o núcleo do portfólio

Projetos não devem ser tratados apenas como cards com título, imagem e tecnologias.

Cada projeto pode ser um case study.

Projetos podem possuir diferentes níveis de profundidade.

Um projeto simples pode conter apenas:

- título;
- resumo;
- contexto;
- tecnologias;
- imagem;
- links.

Um projeto complexo pode conter:

- contexto;
- problema;
- processo anterior;
- meu papel;
- restrições;
- arquitetura;
- solução;
- decisões técnicas;
- implementação;
- desafios;
- métricas;
- resultados;
- galeria;
- vídeos;
- diagramas;
- timeline;
- aprendizados;
- próximos passos;
- tecnologias;
- competências relacionadas;
- experiências relacionadas;
- evidências.

A página de projeto deve ser composta dinamicamente pelos blocos existentes.

Não exigir que todos os projetos possuam os mesmos campos.

---

# 7. Classificação dos projetos

Projetos devem poder ser classificados de acordo com sua natureza.

Categorias iniciais:

## Produção

Software efetivamente utilizado em ambiente real.

## Profissional

Projeto realizado dentro de contexto profissional, mesmo que não constitua um produto independente.

## Lab

Experimento técnico criado para estudar, validar ou compreender algum conceito.

## Estudo / Pesquisa

Projeto cujo objetivo principal é aprendizado, investigação ou exploração.

Nunca apresentar um projeto educacional como se fosse um produto de produção.

Nunca exagerar impacto ou responsabilidade.

Credibilidade é mais importante que marketing.

---

# 8. Modularidade é requisito arquitetural

Este portfólio será continuamente expandido.

Sidclei desenvolve novos projetos frequentemente.

Adicionar conteúdo NÃO deve exigir alteração de código-fonte.

Deve ser possível adicionar, editar, remover, publicar e despublicar conteúdo utilizando um sistema de gerenciamento de conteúdo.

No mínimo, os seguintes tipos de conteúdo devem ser administráveis:

- projetos;
- competências;
- tecnologias;
- experiências;
- formação acadêmica;
- certificações;
- estudos;
- métricas;
- mídias;
- links;
- artigos ou publicações;
- conteúdo da página inicial quando pertinente.

Não criar arrays hardcoded como fonte definitiva dos projetos.

Evitar:
```ts
const projects = [...]

9. Conteúdo relacional

As entidades do portfólio devem possuir relacionamentos.

Exemplos:

Project
↔ Skill

Project
↔ Technology

Project
↔ Experience

Project
↔ Education

Skill
↔ Experience

Skill
↔ Education

Certification
↔ Skill

Article
↔ Project

Essas relações devem permitir que o sistema responda perguntas implicitamente.

Exemplo:

Ao acessar Python, o visitante pode descobrir:

projetos que utilizaram Python;
experiências relacionadas;
estudos relacionados;
certificações relacionadas.

Ao acessar uma experiência profissional, pode descobrir:

projetos daquele período;
tecnologias utilizadas;
competências desenvolvidas.
10. Knowledge Graph

O produto deverá possuir, em algum momento de sua evolução, uma visualização interativa das relações entre conhecimentos.

Exemplos de nós:

Python
SQL
Oracle
Tasy
Machine Learning
Automação
RPA
Django
APIs
Redes
Active Directory
Cybersecurity
Power BI

As conexões devem surgir a partir dos dados reais do portfólio.

Não manter manualmente um segundo conjunto de dados apenas para o grafo.

O grafo deve reutilizar relacionamentos existentes.

Possíveis interações:

hover;
click;
drag;
highlight de relações;
filtros;
pesquisa;
navegação para projetos relacionados.

Em dispositivos onde a interação gráfica não for adequada, deve existir uma alternativa acessível.

11. UX como prioridade

A experiência deve transmitir:

tecnologia;
engenharia;
organização;
profundidade;
curiosidade;
modernidade.

Não deve transmitir:

excesso;
carnaval visual;
landing page genérica de startup;
template de portfólio comprado;
demonstração gratuita de efeitos CSS.

O visitante deve sentir vontade de explorar.

12. Interações

O portfólio DEVE possuir comportamentos interativos.

Entretanto, toda interação deve possuir uma intenção.

Possíveis comportamentos:

elementos respondendo à posição do cursor;
hover contextual;
magnetic buttons discretos;
project cards com movimento leve;
transições compartilhadas;
timeline progressiva;
diagramas exploráveis;
filtros animados;
busca rápida;
knowledge graph;
destaques relacionais;
contadores;
before/after;
microinterações;
mudanças de estado elegantes.

Interações devem ser discretas.

Evitar animações repetitivas sem função.

13. Motion Design

Movimento deve seguir quatro princípios:

informar;
orientar;
conectar;
dar feedback.

Não utilizar movimento apenas para chamar atenção.

Evitar:

partículas permanentes;
objetos flutuando aleatoriamente;
parallax excessivo;
animações demoradas;
transições que atrasam navegação;
efeitos que prejudiquem leitura;
cursor customizado que atrapalhe usabilidade.

Sempre respeitar:

prefers-reduced-motion

O produto deve continuar completamente utilizável sem animações.

14. Design visual

Direção visual:

sofisticada;
limpa;
moderna;
tecnológica;
minimalista sem ser vazia;
forte uso de tipografia;
excelente espaçamento;
hierarquia clara.

Preferir:

tons neutros;
grafite;
preto suave;
off-white;
cinzas;
uma cor principal de destaque.

Evitar múltiplas cores competindo entre si.

Não transformar categorias em um arco-íris.

15. Informação antes da decoração

Em qualquer decisão entre:

A) um efeito visual interessante;

e

B) melhor legibilidade ou compreensão;

escolher B.

O conteúdo nunca deve depender de hover para ser descoberto.

Hover pode enriquecer informação, mas não esconder informação essencial.

16. Página inicial

A página inicial deve responder rapidamente:

Quem?
O quê?
Por quê acreditar?

Ela não deve tentar apresentar absolutamente tudo.

A Home funciona como porta de entrada para o restante do sistema.

Estrutura conceitual possível:

Hero

→ Posicionamento

→ Impacto / resultados

→ O que construo

→ Projetos em destaque

→ Conhecimentos

→ Trajetória resumida

→ Estudos

→ Contato

Essa estrutura pode evoluir conforme UX.

17. Navegação progressiva

O portfólio deve funcionar para diferentes profundidades de visita.

Visitante rápido

Entende quem é Sidclei em menos de um minuto.

Recrutador interessado

Consegue entender experiência, tecnologias e principais projetos.

Gestor técnico

Consegue investigar decisões, arquiteturas, implementação e resultados.

Desenvolvedor

Consegue explorar detalhes técnicos, tecnologias e projetos.

Não obrigar todos os visitantes a consumir o mesmo nível de informação.

18. Busca

Planejar arquitetura para uma busca global.

Atalho desejado:

Ctrl/Cmd + K

A busca poderá localizar:

projetos;
tecnologias;
competências;
experiências;
estudos;
certificações.

Resultados devem permitir navegação rápida.

19. Experiência profissional

Não reproduzir simplesmente o currículo.

Cada experiência pode possuir:

empresa;
função;
período;
contexto;
responsabilidades;
tecnologias;
competências;
projetos relacionados;
principais resultados.

A trajetória deve ajudar a explicar a evolução profissional.

20. Formação e aprendizado

Separar claramente:

Formação acadêmica

Graduações e especializações formais.

Certificações

Cursos e certificados relevantes.

Aprendizado contínuo

Assuntos sendo estudados ou aprofundados.

Experimentos

Aplicação prática de assuntos estudados.

Evitar criar uma "parede de certificados".

O objetivo é demonstrar evolução intelectual, não quantidade de PDFs.

21. Métricas

Quando houver impacto mensurável, destacá-lo.

Exemplos:

tempo anterior
→ tempo posterior

processo manual
→ processo automatizado

volume processado

redução de etapas

quantidade de usuários

ganho operacional

Nunca inventar métricas.

Quando um número não for comprovável ou publicável, não utilizá-lo.

22. Confidencialidade

Parte importante da experiência profissional envolve sistemas corporativos.

Nunca expor:

dados de pacientes;
informações pessoais;
dados empresariais confidenciais;
credenciais;
tokens;
senhas;
strings de conexão;
IPs internos;
arquitetura sensível;
queries confidenciais;
tabelas sensíveis;
dados comerciais;
screenshots com informações privadas.

Projetos corporativos poderão ser apresentados de maneira anonimizada.

Quando necessário:

substituir dados reais por dados demonstrativos;
simplificar diagramas;
ocultar nomes;
explicar conceitos sem revelar implementação sensível.
23. Mobile first, mas não mobile only

Todas as funcionalidades devem possuir experiência adequada em:

desktop;
notebook;
tablet;
smartphone.

Interações baseadas em mouse precisam possuir equivalentes para touch.

Não criar funcionalidade essencial que dependa exclusivamente de hover.

24. Acessibilidade

Acessibilidade não é melhoria futura.

É requisito.

Garantir:

HTML semântico;
navegação por teclado;
foco visível;
contraste adequado;
labels;
ARIA quando necessário;
alt text;
leitores de tela;
reduced motion;
touch targets adequados.
25. Performance

O impacto visual não pode sacrificar performance.

Priorizar:

Core Web Vitals;
lazy loading;
image optimization;
code splitting;
carregamento progressivo;
fontes otimizadas;
JavaScript apenas quando necessário.

Bibliotecas de animação devem ser utilizadas com responsabilidade.

Não importar bibliotecas enormes para efeitos triviais.

26. SEO

Cada projeto deve possuir metadados próprios.

Preparar:

title;
description;
canonical;
Open Graph;
Twitter/X cards;
sitemap;
robots;
structured data quando aplicável.

Projetos devem possuir URLs estáveis e legíveis.

Exemplo:

/projetos/visionhash

/projetos/comparador-xml

27. Arquitetura

Prioridades arquiteturais:

manutenção;
modularidade;
escalabilidade;
legibilidade;
performance;
testabilidade.

Evitar abstrações prematuras.

Evitar componentes gigantes.

Separar adequadamente:

conteúdo;
apresentação;
domínio;
interação;
integração com CMS.

Componentes compartilhados devem possuir propósito real.

28. Regra contra overengineering

Este é um portfólio profissional, não uma plataforma SaaS.

Não adicionar:

microserviços desnecessários;
filas desnecessárias;
Kubernetes;
bancos adicionais sem motivo;
abstrações empresariais artificiais;
sistemas de autenticação complexos sem necessidade;
infraestrutura cara.

Complexidade precisa resolver um problema concreto.

29. CMS

A arquitetura deve possuir um CMS ou mecanismo equivalente para gerenciamento de conteúdo.

Sidclei deve conseguir publicar um novo projeto sem:

abrir o editor de código;
alterar componentes;
criar nova rota manualmente;
editar arrays;
executar deploy manual específico para aquele projeto.

O CMS deve suportar conteúdo modular.

Projetos devem permitir blocos flexíveis.

30. Imagens e mídia

Projetos poderão conter:

screenshots;
diagramas;
imagens;
apresentações;
vídeos;
GIFs;
documentos;
links externos.

Mídia deve ser otimizada.

Não carregar vídeos pesados automaticamente.

Screenshots profissionais precisam preservar privacidade.

31. Código

Código deve ser:

legível;
tipado quando possível;
documentado quando necessário;
consistente;
simples;
testável.

Evitar comentários descrevendo o óbvio.

Comentários devem explicar decisões, não traduzir código.

32. TypeScript

Se TypeScript estiver sendo utilizado:

evitar any;
modelar entidades;
reutilizar tipos de domínio;
validar dados externos;
tratar estados opcionais adequadamente.

Não criar tipagem falsa apenas para silenciar erros.

33. Componentes

Evitar componentes monolíticos.

Uma página complexa deve ser composta de seções menores.

Entretanto, não dividir componentes triviais apenas para aumentar quantidade de arquivos.

Componentização deve seguir responsabilidade.

34. Estados da interface

Toda funcionalidade que depende de dados deve considerar:

loading;
empty;
error;
success;
unavailable.

Nunca assumir que conteúdo sempre existirá.

Isso é especialmente importante porque projetos terão estruturas diferentes.

35. Conteúdo ausente

Se um projeto não possuir:

vídeo;
métrica;
arquitetura;
galeria;

o frontend simplesmente não renderiza aquela seção.

Não mostrar placeholders como:

"Em breve"

salvo quando explicitamente configurado.

36. Integridade do conteúdo

Nunca inventar informações profissionais.

Não gerar automaticamente:

resultados;
empresas;
tecnologias utilizadas;
responsabilidades;
números;
cargos;
certificações.

Todo dado público deve possuir origem no conteúdo cadastrado.

37. Cases profissionais

Ao apresentar um projeto profissional, sempre que possível seguir:

Contexto

→ Problema

→ Restrições

→ Decisão

→ Solução

→ Resultado

Isso é mais importante que apenas listar tecnologias.

38. Decisões técnicas

Projetos complexos podem possuir uma seção:

Decisões técnicas

Exemplo:

"Por que Oracle foi mantido read-only?"

"Por que determinado processo foi automatizado?"

"Por que determinada arquitetura foi escolhida?"

Esse conteúdo demonstra engenharia melhor que uma lista de frameworks.

39. Evolução futura

A arquitetura deve permitir futuras funcionalidades sem precisar reconstruir todo o produto.

Possíveis evoluções:

Knowledge Graph avançado;
busca global;
artigos;
changelog profissional;
"Agora estou estudando";
projetos privados compartilháveis;
versões PT/EN;
inteligência artificial baseada no próprio portfólio;
analytics;
filtros avançados;
timeline explorável.

Não implementar antecipadamente funcionalidades futuras apenas porque estão listadas aqui.

Preparar arquitetura quando barato; implementar somente quando solicitado.

40. Inteligência artificial futura

Uma futura funcionalidade poderá permitir perguntas como:

"Sidclei já trabalhou com Oracle?"

"Quais projetos utilizam Python?"

"Quais projetos envolvem automação?"

Se implementada, IA deve responder exclusivamente a partir do conteúdo estruturado do portfólio.

Nunca inventar experiências ou competências.

Essa funcionalidade NÃO faz parte do MVP.

41. Git

Commits devem ser pequenos, compreensíveis e semanticamente coerentes.

Evitar commits gigantes contendo várias funcionalidades independentes.

Preferir mensagens descritivas.

Exemplo:

feat: add modular project content model

feat: add project filtering

fix: respect reduced motion in project cards

refactor: extract project media renderer

42. Desenvolvimento por Sprint

O projeto será desenvolvido incrementalmente.

Antes de implementar uma Sprint:

ler este CLAUDE.md;
compreender o objetivo da Sprint;
inspecionar o estado atual do repositório;
preservar decisões anteriores;
identificar possíveis regressões;
implementar somente o escopo aprovado.

Não antecipar grandes funcionalidades de Sprints futuras.

43. Ao receber uma nova tarefa

Antes de modificar código:

investigar;
localizar componentes relacionados;
entender o fluxo atual;
identificar impacto;
elaborar mentalmente a alteração;
implementar;
testar;
revisar.

Não reescrever áreas estáveis sem necessidade.

44. Mudanças arquiteturais

Não alterar silenciosamente:

stack principal;
CMS;
modelo de dados;
sistema de estilos;
biblioteca central de animações;
organização principal do projeto;
estratégia de deploy.

Mudanças arquiteturais importantes precisam ser explicitamente discutidas.

45. Preservação de comportamento

Ao alterar uma funcionalidade existente:

preservar comportamentos homologados;
verificar regressões;
não remover interações existentes sem motivo;
não modificar identidade visual global incidentalmente.

Uma Sprint não deve "melhorar" áreas fora do seu escopo sem solicitação.

46. Definition of Done

Uma tarefa não está concluída apenas porque "funciona na minha máquina".

Considerar concluída quando aplicável:

implementação finalizada;
TypeScript sem erros;
lint aprovado;
testes aprovados;
build aprovado;
responsividade verificada;
acessibilidade básica verificada;
estados vazios tratados;
loading tratado;
erros tratados;
reduced motion respeitado;
nenhuma regressão óbvia;
documentação atualizada quando necessário.
47. Princípio final

Quando houver dúvida entre:

"Isso parece impressionante"

e

"Isso explica melhor quem é Sidclei"

escolher a segunda opção.

O objetivo do portfólio não é provar que sabemos construir animações.

O objetivo é usar excelente engenharia, excelente UX e excelente apresentação para tornar evidente a trajetória, o conhecimento e o trabalho de Sidclei Viana.

---

# TECHNICAL BASELINE

> Seção adicionada ao final da Sprint 0. Registra apenas o que foi efetivamente
> implementado. Não altera nenhum princípio acima. Detalhes em `README.md`,
> `docs/architecture.md`, `docs/content-model.md` e `docs/decisions/`.

## Stack implementada

| Item             | Valor                                                        |
| ---------------- | ----------------------------------------------------------- |
| Framework        | Next.js 15.5 (App Router)                                    |
| UI               | React 19.2                                                  |
| Linguagem        | TypeScript 5.9, `strict` + `noUncheckedIndexedAccess`       |
| Estilo           | Tailwind CSS v4 (`@tailwindcss/postcss`) + CSS variables    |
| CMS              | Sanity v3.99, Studio embutido em `/studio` (`next-sanity` 9) |
| Consulta         | GROQ centralizado em `src/sanity/queries/`                  |
| Validação        | Zod 3 (disponível; usado quando há contrato de entrada)     |
| Testes           | Vitest 2 + Testing Library                                  |
| Lint / Format    | ESLint 8 (`next/core-web-vitals` + `next/typescript`) / Prettier 3 |
| Package manager   | pnpm 11                                                     |
| Node             | >= 20.11 (`.nvmrc`: 20.11.0)                                 |
| Deploy alvo      | Vercel + Sanity (não executado nesta Sprint)                |

Versões exatas: `pnpm-lock.yaml`.

## Comandos oficiais

```
pnpm dev         # desenvolvimento
pnpm build       # build de produção
pnpm start       # serve o build
pnpm lint        # ESLint
pnpm typecheck   # tsc --noEmit
pnpm test        # Vitest (run único)
pnpm format      # Prettier --write
```

## Decisões-chave (ADRs)

- ADR-001 — CMS headless: Sanity, Studio embutido.
- ADR-002 — Modelo de conteúdo relacional e modular; `skill` ≠ `technology`;
  sem proficiência; `projectContribution`; blocos semânticos; confidencialidade
  no dado.
- ADR-003 — Publicação sem código: ISR + revalidação on-demand por cache tags
  via webhook assinado do Sanity (`/api/revalidate`).

## Garantias de confidencialidade

Projeto `private` é excluído **na query GROQ** e novamente barrado por
`isPubliclyVisible()` antes de qualquer render. `getProjectBySlug` usa o mesmo
filtro (slug privado → `notFound()`). Validação de schema impede `private` +
`featured`/`published`. Token do Sanity só no servidor; nunca `NEXT_PUBLIC_`.

---

## Atualização — Sprint 0.1 (homologação & type safety)

- **Projeto Sanity real provisionado.** `projectId` / `dataset` / token vivem em
  `.env.local` (git-ignored) — não registrados aqui. `.env.local` confirmado no
  `.gitignore`.
- **Sanity TypeGen adotado** (ADR-004). Fluxo:
  `schema + queries (defineQuery)` → `pnpm typegen` → `src/sanity/sanity.types.ts`
  (versionado, fonte de verdade). `src/sanity/types.ts` virou adaptador;
  `src/domain/*` aceita subconjuntos estruturais. `pnpm typegen:check` para CI.
- **Webhook de revalidação verificado localmente** com assinatura HMAC real
  (`tests/revalidateWebhook.test.ts`): sem assinatura → 401, inválida → 401,
  válida → 200 + tags, sem secret → 503. Mapeamento `_type`→tags extraído para
  função pura `tagsForWebhookPayload`. `parseBody(req, secret, false)` (sem a
  espera de 3s). Teste ponta a ponta com HTTPS + Studio real: ver
  `docs/homologation-checklist.md`.
- Comandos oficiais adicionados: `pnpm typegen`, `pnpm typegen:check`.
- `src/sanity/sanity.types.ts` é gerado — **não editar à mão**.

---

## Atualização — Sprint 0.2 (produção)

- **Repositório:** GitHub `sidcleiviana/sidclei-portfolio` — **público**, branch
  `main`. Histórico das Sprints 0 / 0.1 preservado. Auditoria de segredos:
  nada sensível na árvore nem no histórico; `.env.local` e `.vercel`
  git-ignored; `.env.example` sem valores.
- **Hosting:** Vercel, projeto `sidclei-portfolio`, **Git Integration ligada**
  (`push` em `main` → deploy automático; sem GitHub Actions). Produção:
  `https://sidclei-portfolio.vercel.app`.
- **Env na Vercel:** `NEXT_PUBLIC_SANITY_PROJECT_ID`,
  `NEXT_PUBLIC_SANITY_DATASET`, `NEXT_PUBLIC_SANITY_API_VERSION`,
  `NEXT_PUBLIC_SITE_URL` (Config); `SANITY_REVALIDATE_SECRET`,
  `SANITY_API_READ_TOKEN` (Secret).
- **CMS em produção:** Sanity `portifolio-sidclei` / dataset `production`.
  CORS: localhost + `https://sidclei-portfolio.vercel.app` (credentials, sem
  wildcard). Webhook GROQ "Portfolio Revalidation" → `/api/revalidate`
  (assinado). Criação do webhook é manual (a CLI só abre o navegador).
- Nenhum ID/token/segredo sensível registrado aqui.

---

## Atualização — Sprint 0.2.1 (dataset privado)

- Dataset `production` alterado para **PRIVATE** (`aclMode: private`). Leitura
  anônima direta do Content Lake não retorna documentos (query/`doc`/`export`
  anônimos → vazio; comprovado com marcador único). A confidencialidade deixa
  de depender apenas do filtro GROQ da aplicação.
- Leitura server-side autenticada com `SANITY_API_READ_TOKEN` (token
  `portfolio-server-read`, role `viewer`, somente leitura). Aplicado no
  `client` server-side (`src/sanity/client.ts`); `useCdn` só quando anônimo.
  Nunca no bundle do browser (scan de HTML/RSC/chunks: limpo).
- Studio e webhook não afetados (autenticação/infra próprias). Imagens em
  `cdn.sanity.io` seguem públicas.

---

## Atualização — Sprint 1 (Design System & Interaction Foundation)

- **Fundação visual** estabelecida. Direção: editorial-técnica, um único tema
  claro (`color-scheme: light`); tokens preparados para tema futuro via
  `:root[data-theme]` sem tocar componentes. Detalhe: `docs/design-system.md`.
- **Tokens** centralizados em `src/styles/globals.css` (`@theme`): cor,
  tipografia (escala + line-heights), radius, sombras discretas, larguras de
  container, motion (durations/easings). Componentes não hardcodam cor/raio/tempo.
- **Tipografia:** Inter + JetBrains Mono via `next/font/google` (self-hosted,
  sem runtime externo). `src/styles/fonts.ts`.
- **Primitivos de layout** (`src/components/ui/`): `Container` (default/wide/prose),
  `Section`, `Stack`, `Cluster`, `Grid`, `Divider`.
- **Componentes:** `Button` (`<button>` real), `ButtonLink` (`next/link`),
  `TextLink` (externos com `rel`+dica SR), `Badge`, `Card` (variante
  `interactive` para stretched-link), `Eyebrow`, `SectionHeading`.
- **Interação (CSS-only, sem biblioteca):** hover discreto, `:focus-visible`
  em tudo, pressed nos botões, card lift, uma entrada `[data-animate="rise"]`.
  `prefers-reduced-motion` zera tudo e força estado final.
- **Header/Footer** reconstruídos: skip link, header sticky com backdrop,
  `MobileNav` acessível (disclosure: `aria-expanded`/`aria-controls`, Escape,
  outside-click, `aria-current`). Nav só com rotas que existem (Início/Projetos).
- **Rotas** `/`, `/projects`, `/projects/[slug]`, `not-found` aplicam a
  fundação. Blocos de conteúdo continuam funcionando; `BlockSection` alinhado.
- **Sem regressão:** schemas, TypeGen, referências, visibility, webhook,
  ISR/revalidation, dataset privado, sitemap/robots/canonical intactos.
- 33 testes (24 → +9: UI primitives, MobileNav). Gates verdes.

---

## Atualização — Sprint 2 (Project Case Study System)

- `/projects/[slug]` agora é um **sistema de case study** modular
  (`src/features/projects/ProjectCaseStudy.tsx`): header editorial, contribuição,
  contexto/problema, blocos modulares na ordem do editor, resultados, evidências,
  meta (skills ≠ technologies), nav anterior/próximo. Toda seção é condicional —
  projeto enxuto continua elegante; projeto rico continua navegável.
- **Nenhuma mudança de schema.** TypeGen intacto. Lacunas documentadas em
  `docs/case-study.md` (sem code block dedicado; sem relação explícita de
  "projetos relacionados").
- **Índice do projeto** (`case/ProjectToc`, único client component): derivado das
  seções que realmente renderizam (`src/domain/caseSections.ts`), só aparece com
  ≥ 4 seções; `IntersectionObserver` nativo p/ seção ativa, sem biblioteca.
  Âncoras com `scroll-mt-24`; scroll suave exceto em `prefers-reduced-motion`.
- **12 block renderers** redesenhados sobre o Design System via `BlockShell`
  (medidas prose/wide, §10). Callout com **uma** linguagem neutra (§22). Métrica
  exibida literalmente, sem percentual calculado (§23).
- **Sandbox dev:** `/dev/case-preview` (fixtures sintéticas, `notFound` em prod,
  noindex, em `robots.txt`). `src/features/projects/fixtures.ts` — nunca em rota
  pública.
- Prev/next derivados só da lista pública → projeto `private` nunca vaza (§26).
- 45 testes (33 → +12: caseSections, contribution, sparse/rich composition).
  Gates verdes. Sem regressão de infra (dataset privado, webhook, deploy).

---

## Atualização — Sprint 3 (Experience & Professional Journey)

- **`/experiencia`** — página CMS-driven da trajetória. Server Component.
  `src/app/(site)/experiencia/page.tsx` → `CareerJourney` → `ExperienceItem`.
- **Sem mudança de schema.** Lacunas resolvidas com helpers:
  `src/domain/experienceAnchor.ts` (âncora determinística de `company+role`, sem
  slug no schema) e `src/domain/monthRange.ts` (precisão mês/ano, "— Atual").
  Ordenação em GROQ (`period.ongoing desc, period.startDate desc`).
- **Query única** (`src/sanity/queries/experience.ts`, `defineQuery`): traz as
  experiências + projetos relacionados via `references(^._id)` num round trip,
  repetindo o portão público → projeto `private`/unpublished nunca vaza (§8).
  `ExperienceProjects` filtra de novo com `isPubliclyVisible`.
- **Cross-link projeto ↔ experiência**: `ProjectMeta` linka `relatedExperience`
  para `/experiencia#<anchor>`; `/experiencia` linka cada projeto para
  `/projects/[slug]`.
- **Revalidação**: `CACHE_TAGS.experience`. `tagsForWebhookPayload` — `experience`
  → `["experience"]`; `project` → `["projects","experience","project:<slug>"]`;
  default → `["projects","experience"]`.
- **Nav**: `Início · Projetos · Experiência`. `DesktopNav` virou client island
  para `aria-current="page"`.
- `ProjectCard` ganhou `variant="compact"` (sem cópia divergente, §30).
  `MonoHeading` primitivo compartilhado.
- **Sandbox dev** `/dev/experience-preview` + `src/features/experience/fixtures.ts`
  (sintético, `notFound` em prod, noindex, robots).
- **Conteúdo real:** nenhum documento `experience` no CMS ainda — sistema pronto,
  homologado com fixtures. Campos a preencher no Studio: ver `docs/experience.md`.
- 61 testes (45 → +16). Gates verdes. Infra intacta (dataset privado, webhook).

---

## Atualização — Sprint 4 (Home definitiva & identidade profissional)

- **`/` reescrita** — deixou de ser o sandbox da Sprint 1. Agora é o **índice
  narrativo** (§2): `Hero → FocusAreas → FeaturedProjects → CareerSummary →
  NextStep`. Sintetiza e encaminha para `/projects` e `/experiencia`; sem
  profundidade de case study (§46). Tudo Server Component
  (`src/features/home/`, sem `"use client"`).
- **Sem mudança de schema (§6, §53).** `profile` já modela identidade;
  `project.featured` ("Destaque na home") já existia. Nenhum `homePage` doc
  criado — não há conteúdo que `profile` + `featured` não resolvam.
- **CMS quase vazio** (profile=0, experience=0, project=1 sem cover/tech/featured).
  Home correta primeiro no caso vazio (§43): `src/features/home/identity.ts`
  traz copy estrutural neutra do `CLAUDE.md` §1–3 (nome, headline, resumo da
  trajetória, 4 áreas). **Nenhuma afirmação profissional inventada (§4).**
  Nenhuma fixture em produção (§5, §21).
- **Query única** `src/sanity/queries/home.ts` (`defineQuery`, um round trip):
  `profile` + `projects[0...6]` (portão público inline, `order(featured desc,
  …)`, projeção leve — sem `contentBlocks`) + `experiences[0...2]` (mesma
  ordenação de `/experiencia`). `getHome()` → `HomeData` (TypeGen
  `HomeQueryResult`), fallback `{ profile: null, projects: [], experiences: [] }`.
- **Seções condicionais:** `FeaturedProjects` prefere `featured`, cai para os
  mais recentes com regra transparente (§12), some com 0 projetos (§13), reusa
  `ProjectCard`. `CareerSummary` = 2 papéis mais recentes num `<ol>` linkado
  (não o `CareerJourney` inteiro — §18), some com 0 experiências (§20).
  `NextStep` mostra a linha de contato só se `links`/`resumeUrl`/
  `professionalEmail` existirem no `profile` (§23, §35) — sem formulário.
  Home ao vivo hoje: `Hero → FocusAreas → NextStep`, sem seções fantasma.
- **Revalidação (§40):** `getHome` com tags `[profile, projects, experience]`.
  `tagsForWebhookPayload` já purga as três — sem alteração em `revalidate.ts`,
  sem `revalidatePath` global.
- **Confidencialidade (§41):** projeção de projetos com o mesmo portão público;
  `FeaturedProjects` refiltra com `isPubliclyVisible`. `private`/unpublished
  nunca alcança a Home.
- **Design (§28–31):** só primitivos e tokens da Sprint 1 — sem nova paleta,
  raio, fonte, sombra, animação ou lib de motion. Caráter autoral via
  composição (medida `wide` no Hero, `text-balance`/`text-pretty`, ritmo de
  `Section`, um `data-animate="rise"`). Sem cursor custom, parallax,
  scroll-hijack, canvas/WebGL.
- **SEO (§36):** `generateMetadata` da Home usa `profile.shortSummary`
  (fallback neutro) + `canonical: "/"`. Sem keyword list, sem schema.org novo.
- **Sandbox dev** `/dev/home-preview` + `src/features/home/fixtures.ts`
  (`richHomeFixture` + `emptyHomeFixture`, sintético, `notFound` em prod,
  noindex, robots, nunca importado por rota pública).
- **Performance (§33):** `/` = 352 B / 174 kB First Load JS (igual a
  `/projects` e `/experiencia`); shared chunk **103 kB**, sem regressão.
- **Lacunas de conteúdo real (§54 — não preencher automaticamente):** doc
  `profile` não publicado; nenhum projeto com `featured`/cover/tecnologias;
  nenhum `experience`; nenhum link profissional/email/currículo. Detalhe em
  `docs/home.md`.
- 71 testes (61 → +10: `tests/home.test.tsx`). Gates verdes. Infra intacta
  (dataset privado, webhook assinado, deploy Vercel via git).

---

## Atualização — Sprint 5 (Knowledge Hub: Skills, Technologies & navegação relacional)

- **`/conhecimento`** — hub relacional de competências e tecnologias (Server
  Components, `src/features/knowledge/`). Responde "o que sabe fazer" e "em quais
  contextos", nunca "quantas tecnologias conhece" (§2). Duas seções por anchor
  (`#competencias`, `#tecnologias`), agrupadas pela `category` real do schema
  (ordem alfabética; "Outras" por último). Sem contagem, sem barra, sem nível,
  sem cloud (§3). Marcador neutro "· em destaque" para `skill.featured` (§11).
- **`/conhecimento/competencias/[slug]` e `/conhecimento/tecnologias/[slug]`** —
  detail pages SSG (de `getKnowledgeSlugs`), 404 em slug desconhecido.
  Breadcrumb → nome + categoria → descrição (só quando existe, §12) → **Onde
  apareceu** (experiências, link p/ `/experiencia#<experienceAnchor>`, §18) →
  **Projetos** (`ProjectCard variant="compact"`, some quando vazio, §20/§27).
- **Sem mudança de schema (§46).** Relações usadas = inverso de
  `experience.skills/technologies` e `project.skills/technologies` via
  `*[... references(^._id)]`. **Nenhuma edge `skill ↔ technology`** criada,
  consultada ou renderizada (§7) — co-ocorrência não é relação.
- **Queries** `src/sanity/queries/knowledge.ts` (`defineQuery`, sem N+1):
  `knowledgeHubQuery` (um round trip, sem `count()`), `skillBySlugQuery` /
  `technologyBySlugQuery` (entidade + experiências + projetos com portão público
  inline), `knowledgeSlugsQuery`. `KnowledgeDetail` refiltra projetos com
  `isPubliclyVisible` (§21). Projeções leves, sem `contentBlocks` (§24).
- **Cross-links:** badges de skill/technology em `/experiencia` (`ExperienceItem`)
  e no case study (`ProjectMeta`) viraram `KnowledgeBadge` — aparência idêntica,
  link só adiciona foco/cursor (§17, §19, §32). Home `NextStep` ganhou 3º card
  "Conhecimento" (§31). Header: `Início · Projetos · Experiência · Conhecimento`
  (§30).
- **Cache (§43–44):** tags novas `knowledge`/`skills`/`technologies`.
  `tagsForWebhookPayload` — `skill` → `[knowledge, skills, experience, projects,
  skill:<slug>]`; `technology` → idem com `technologies`; `experience` →
  `[experience, knowledge]`; `project` → `[projects, experience, knowledge,
  project:<slug>]`. Sem purge global. Testes atualizados.
- **Sitemap:** + `/conhecimento` + `/experiencia` (faltava) + detail routes
  publicadas.
- **Conteúdo real:** 11 skills · 8 technologies · 3 experiences · **0 projetos
  públicos**. Toda skill/technology tem ≥ 1 experiência → toda detail page tem
  "Onde apareceu"; nenhuma tem "Projetos" ainda. Sem dev fixture (§47).
- **Graph (§35, §53):** NÃO implementado. `docs/knowledge.md` documenta as 5
  edges reais disponíveis e a não-edge `skill ↔ technology`. Nenhum adapter/engine
  escondido (§36).
- **Performance (§49):** tudo Server Component; `/conhecimento` 340 B / 169 kB;
  shared First Load JS **103 kB**, sem regressão. Homologado 375/768/1280/1440
  (sem overflow). 83 testes (71 → +12: `tests/knowledge.test.tsx`). Gates verdes.
  Infra intacta (dataset privado, webhook 401, deploy Vercel via git).

---

## Atualização — Sprint 7 (Redesign visual profundo: "Editorial Relational Premium")

- **Reconstrução visual de todo o frontend** — nova identidade "Editorial
  Relational Premium + ~20% Knowledge Atlas". Dados, schemas, queries,
  confidencialidade, URLs, relações CMS, SEO, revalidação e infraestrutura
  **preservados** (§47). Nenhuma mudança de conteúdo no Sanity — exceto
  `knowledgeHubQuery` ganhar `contexts` (companies distintas por skill/tech,
  `array::unique`, apenas apresentação).
- **Tokens v2** (`src/styles/globals.css`): paleta neutra com `--color-fg-faint`
  (números editoriais) e `--color-rule` (hairline forte); escala tipográfica
  até `--text-5xl` + `clamp()` no hero/case; `--radius-none`/`sm`/`md` (raio
  quase eliminado, §37); só `--shadow-sm` (§38); containers `editorial 84rem` /
  `max` / `wide` / `prose` + `--gutter` fluido (§41). Nada hardcoded.
- **Tipografia protagonista** (§6, §44): 3 faces self-hosted — **Newsreader**
  (serif, DISPLAY: hero/capítulos/case), **Inter** (corpo), **JetBrains Mono**
  (`.u-label`: números, categorias, tecnologias, meta). `h1/h2/h3` são serif por
  padrão.
- **Numeração editorial** (§7): `01 02 03` mono, `fg-faint`, sempre
  `aria-hidden` (a label carrega o sentido). `SectionMarker`, `SectionHeading
  index`, `CaseHeading index`, nav, linhas de projeto/experiência/conhecimento.
- **Primitivos**: `Container` (5 tamanhos), `Section` (sm/md/lg/xl), `Rule`
  (hair/strong), `SectionMarker`, `ArrowLink` (CTA editorial "LABEL →"), `Badge`
  achatado. **Removidos (§54):** `Grid`, `Card`, `Cluster`, `Divider`,
  `Eyebrow` — mortos após o rebuild.
- **Home reconstruída**: Hero assimétrico (nome como label, profissão em serif
  gigante multi-linha, eixos mono, `Explorar trabalho →`); FocusAreas = índice
  editorial `01 SOFTWARE…`; FeaturedProjects = peça editorial monumental
  (`ProjectCard variant="feature"`); CareerSummary = progressão + arco
  `Infraestrutura → Sistemas → Dados/Automação → Software`; NextStep = 3 rotas
  serif. Sem card central, sem 100vh, sem foto.
- **/projects** = coleção editorial numerada (`ProjectCard variant="index"`),
  sem grid de cards. **Case study** = topo monumental (`01 / PRODUÇÃO`, título
  clamp, `MINHA ATUAÇÃO`, `Rule strong`, `STACK` mono), spine numerado
  `01 CONTRIBUIÇÃO · 02 CONTEXTO · 03 PROBLEMA`, `Solução` (richText serif),
  aviso `anonymized` como nota editorial discreta (§48, não warning vermelho).
  Sistema modular da Sprint 2 preservado; TOC restilizado.
- **/experiencia** = progressão editorial (sem timeline com bolinhas): ano +
  função serif + empresa mono + `— responsabilidades`; `data-rel-scope` nos
  badges.
- **/conhecimento** = atlas: cada `category` é capítulo numerado; cada item
  mostra `usado em <empresas>` (contexts reais) e deep-linka. Skill/Technology
  detail = ficha relacional (`APARECEU EM` numerado, `DEMONSTRADO EM`). Sem
  dashboard, sem nuvem, sem contagem.
- **Knowledge Atlas (§12, §24, §25)**: highlight relacional — CSS `[data-rel-scope]`
  `:has()` dim + `RelationalScope` (client island ~40 linhas) que mantém
  relativos acesos por `data-rel-keys`. Sem canvas/D3/força. `prefers-reduced-motion`
  zera. Toda relação tem link + texto (§26, §42).
- **Header/Footer** editoriais: wordmark serif + nav numerada `01 Projetos…`;
  footer = nome serif + headline + nav + links reais + whitespace, sem 4 colunas.
  `MobileNav` mantém disclosure/teclado/touch homologados.
- **Motion**: CSS-only + 1 island. `ds-rise`, `ds-line`, `.u-arrow`. Sem
  scroll-hijack/parallax/zoom/cursor-follow.
- **Performance (§43)**: tudo Server Component salvo `MobileNav`, `DesktopNav`,
  `ProjectToc`, `RelationalScope`. Shared First Load JS **103 kB — sem
  regressão** (Newsreader é asset self-hosted, fora do bundle JS). Páginas
  ~169 kB (leve queda vs 174 kB).
- **Testes (§55)**: 6 arquivos adaptados à nova estrutura; +1 (contexts). 85
  testes, gates verdes. Sem pixel/snapshot.
- **Doc**: `docs/design-system.md` reescrito para v2.

---

## Atualização — Sprint 7.2 (Cor + Atmosfera + Superfícies)

- **Direção cromática, não redesign.** Preservados: layout, tipografia
  (Newsreader/Inter/JetBrains Mono), grid 12-col, componentes, relações,
  conteúdo, URLs. Regra central: cor = identidade + estrutura + relação, não
  apenas link/hover. Proporção-alvo ~80% neutro / 15% indigo / 5% petrol.
- **Tokens novos** em `globals.css`: `--color-bg-tonal` (indigo-soft),
  `--color-accent-on-dark` (indigo luminoso), `--color-surface-dark` (indigo-
  ink profundo — um *capítulo*, não dark mode), `--color-on-dark`/`-muted`/
  `-faint`, `--color-rule-on-dark`, `--color-petrol` (2ª cor, rara — só nós/
  marcadores relacionais), `--color-node-on-dark`. Todos com contraste WCAG
  verificado (AA/AAA — ver `docs/design-system.md`).
- **Mecanismo de superfície**: atributo `data-surface="tonal"|"dark"` em
  `<Section>`/`<footer>` (já full-bleed) que redefine localmente `--color-fg`,
  `--color-fg-muted`, `--color-border`, `--color-rule`, `--color-accent` no
  escopo — os componentes existentes (`text-fg`, `text-accent`, `.u-label`,
  `.u-connect`) se repintam sozinhos, **zero mudança por componente**. Nenhum
  componente novo, nenhum card, nenhum raio, nenhum gradiente.
- **Ritmo cromático da Home**: Hero (paper + painel tonal nos eixos) → Focus
  (paper) → **Projetos (dark full-bleed)** → Trajetória (paper) → **Explorar
  (tonal)** → **Footer (dark full-bleed)**.
- **Case study**: abertura (`ProjectHeader`) em **dark**; corpo/documentação
  volta ao paper — contraste abertura → documentação.
- **Knowledge**: capítulo "Competências" em **dark** (a maior ousadia
  cromática, §21); "Tecnologias" permanece em paper (recessiva, "meios, não o
  assunto"). Detail pages ganham cabeçalho **tonal** + spine relacional em
  accent (`RelationLabel`).
- **Relação cromática**: linhas/spines/conectores (`.u-connect`) em indigo;
  nós/marcadores (skill em destaque, marcador do footer) em petrol — raro, só
  pontos. Fase atual da Experiência em indigo (régua + ano), sem badge verde
  SaaS. `/projects` revela `bg-bg-tonal` no hover/focus da linha (CSS puro).
- **Sem taxonomia por cor**: nenhuma Skill/Technology/área ganhou cor própria.
- **Sem mudança de CMS/schema/query/rota.**
- **Performance**: zero biblioteca nova, zero JS novo — tudo `data-surface` +
  cascata de variáveis CSS. Gates: lint/typecheck/test verdes (85 testes,
  inalterados — mudança puramente visual). Build local bloqueado por
  instabilidade de rede da máquina ao buscar fontes do Google (não relacionado
  ao código); verificado via build/deploy do Vercel em produção.
- **Doc**: `docs/design-system.md` ganhou seção "Sprint 7.2 — chromatic art
  direction" com paleta, função de cada cor, superfícies, exemplos corretos/
  incorretos e contraste.

---

## Atualização — Sprint 8 (Modular Surfaces — nova identidade visual B+C)

- **Identidade visual reconstruída.** A direção "Editorial Relational Premium"
  (Sprint 7/7.1/7.2) foi **encerrada** após revisão visual. Nova direção
  aprovada: **"Modular Surfaces"** — base B (superfícies modulares, contraste
  graphite/off-white, densidade maior, hero compacto, projeto com presença
  visual forte) + **~25–30% da lógica interativa de C** (seleção contextual,
  painéis que atualizam in-place, sem Knowledge Graph). Detalhe completo em
  `docs/design-system.md` (reescrito para v3).
- **Tokens v3** (`src/styles/globals.css`): graphite `#14171F` como registro
  primário; `data-surface="paper|tonal|deep"` repinta os tokens compartilhados
  por escopo (mecanismo da Sprint 7.2 reaproveitado, proporção invertida).
  Indigo `#4A3AFF`/`#8B90FF` = única cor de interação/relação; petrol `#22D3C5`
  = só status "ao vivo" (pulse, "· Atual"). Sem gradiente, sem glow, sem KPI
  falso, sem cor por categoria.
- **Tipografia**: **Hanken Grotesk** (display/interface) · **Inter** (corpo) ·
  **JetBrains Mono** (metadata). **Newsreader removido** (`src/styles/fonts.ts`).
  Escala reduzida — h1 da Home `clamp(2rem,4.5vw,2.9rem)`, nunca monumental.
- **Primitivos** (`src/components/ui`): novos `Surface`, `Kicker`, `Chip`,
  `Tag`/`TagLink`; `Container`/`Section`/`Button`/`buttonClass`/`TextLink`
  reescritos. **Removidos**: `ArrowLink`, `Badge`, `Rule`, `SectionHeading`,
  `SectionMarker`, `MonoHeading`, `Stack`, `Panel`.
- **3 módulos interativos** (os únicos desta Sprint, todos com estado de
  repouso pleno — progressive enhancement obrigatório):
  `FeaturedProjectCard` (integrações do projeto como chips → nota contextual;
  **não** é architecture diagram), `TrajectorySelector` (`features/experience` —
  lista de papéis → painel in-place no desktop, accordion no mobile; usado na
  Home e em `/experiencia`), `KnowledgeExplorer` (`features/knowledge` — chips
  por categoria → contextos reais + "tecnologias presentes nesses contextos",
  **nunca** edge Skill→Technology; usado na Home e em `/conhecimento`).
- **Queries**: `homeQuery` ganhou projeção de `roles`/`period` nos projetos,
  projeção completa das experiências `[0...4]` e `featuredSkills` com contextos
  (um round trip). `knowledgeHubQuery` ganhou `contextExperiences`/
  `contextProjects` por entidade + `contextTechnologies` por skill.
  `skillBySlugQuery` ganhou `contextTechnologies`. **Sem mudança de schema.**
  Gate público inline em toda projeção de projeto. TypeGen regenerado.
- **Superfícies públicas reconstruídas** na ordem de prioridade: Home
  (`Hero → FeaturedProject → HomeTrajectory → HomeKnowledge → HomeOutro`),
  Projects (feature em paper + linhas), Experience (`TrajectorySelector` pleno),
  Knowledge (`KnowledgeExplorer`: Competências em tonal, Tecnologias em
  graphite), Case Study (abertura navy + spine contextual `ProjectToc` +
  sistema de blocos da Sprint 2 preservado + seção "Relações"), Knowledge
  Detail (cabeçalho tonal + "Apareceu em"/"Demonstrado em"), Header/Footer.
- **Command Palette / busca ⌘K**: **não implementada** (possibilidade futura;
  nenhum componente, dependência, atalho ou placeholder criado).
- **Preservado**: schema/conteúdo/slugs/relações/confidencialidade/ISR/webhook/
  SEO/segurança intactos; sistema de blocos do case study; infra de
  acessibilidade; helpers de domínio; `RelationalScope`. Rotas `/dev/*`
  (sandboxes da identidade antiga) removidas.
- **Gates**: typecheck, lint, 91 testes (85 → +6, adaptados à nova estrutura),
  build verdes. Shared First Load JS **103 kB — inalterado** (os 3 islands
  somam ~1–3 kB por rota). Homologação: verificação estrutural + de superfície
  + de overflow via JS em 375/1440 (zero overflow em toda rota, ritmo
  cromático correto, seletores funcionando); screenshots reais a 582px
  (limitação do painel de browser da sessão para viewports emulados).

---

## Atualização — Sprint 8.1 (Interactive Layer & NODE)

- **Camada de interação** sobre "Modular Surfaces" — sem redesign, sem mudança
  de arquitetura visual, sem CMS. 4 níveis: ambiente (movimento sozinho),
  reação (hover/focus), descoberta (click/tap), continuidade (o NODE reaparece).
  Regra de densidade: nunca mais de 1–2 elementos com movimento por viewport.
- **NODE** (`src/components/node/`): entidade visual abstrata (núcleo +
  satélites + linhas finas, SVG inline ~0.3 kB), indigo dominante, 1 satélite
  petrol "vivo". `Node` é presentacional e `aria-hidden` (breathing ambiente em
  CSS, zerado por `prefers-reduced-motion`). `NodeButton` (client, ~30 linhas)
  é a **única** instância interativa (Home): `<button>` real, `aria-label`,
  teclado; tap abre os satélites + revela "contextos conectados". Reaparece em
  Home (hero, featured project, knowledge), footer (todas as páginas), case
  ("Relações"), knowledge detail — bem acima do mínimo de 3 contextos.
- **FeaturedProject** mais reativo: coluna direita ganha profundidade discreta
  no hover do grupo; ao focar/tocar uma integração a stack correspondente
  acende e as outras recuam (name-match, não arquitetura); conector vertical
  fino (`data-animate="draw-y"`, `animation-timeline`, sem JS) liga as facetas
  ao projeto. Nada de tilt/pipeline.
- **TrajectorySelector**: painel entra com stagger curto (`.u-stagger`, 40/80/
  120ms); papel atual ganha ponto petrol pulsante na lista (indicador único —
  "· Atual" no detalhe voltou a muted). Estados idle/hover/selected/current
  visualmente distintos (§31).
- **KnowledgeExplorer**: Node no cabeçalho do painel; painel remonta com
  stagger a cada seleção; dim relacional em hover via `RelationalScope` +
  `:has()` (já existia, verificado).
- **/projects**: linhas ganham `.u-row` (fundo sutil + seta que desliza no
  hover/focus, CSS puro).
- **Case study**: `ProjectToc` ganhou progresso "NN/NN" + barra fina indigo
  acompanhando a seção ativa (o IntersectionObserver já existia).
- **Header**: item ativo com sublinhado accent que escala (`::after scale-x`),
  hover idem — sem page transitions.
- **Footer**: NODE grande estático/ambiente ao lado do nome.
- **Hero grid spotlight** (`src/components/motion/HeroSpotlight.tsx`, client,
  ~25 linhas): luz radial indigo ~12% seguindo o ponteiro, **só no Hero**, só
  em `(hover: hover)` + motion permitido; em touch/reduced-motion não faz nada
  e a camada fica invisível. `--sx/--sy` via `pointermove`, sem listener global.
- **Scroll reveals**: `data-animate="rise"` (fade+translate) em alguns
  cabeçalhos de módulo; `data-animate="draw"`/`draw-y` para conectores. Ambos
  via `animation-timeline: view()` — **zero JS**, fallback = estado final
  visível. Nenhum runtime global de interação.
- **Reduced motion**: bloco estendido — remove breathing do NODE, pulse,
  stagger, draw, spotlight (`display:none`), arrow/row transforms. Estado final
  sempre visualmente completo.
- **Não implementado** (conforme §4/§52/§53): WebGL/Three/canvas/D3/React
  Flow/GSAP/Framer Motion, cursor custom, scroll hijack, parallax forte, scroll
  snap, partículas, gamificação, chatbot/IA, analytics.
- **Client Components novos**: 2 — `NodeButton` (estado de toggle acessível
  para touch), `HeroSpotlight` (coordenadas de ponteiro ao vivo). Justificados,
  escopados, ~55 linhas somadas.
- **Gates**: typecheck, lint, **95 testes** (91 → +4: NODE a11y + teclado,
  TrajectorySelector arrow-keys), build — verdes. Shared First Load JS
  **103 kB — inalterado**. Home 3.5 kB / 174 kB de rota (+~1 kB dos 2 islands).

---

## Atualização — Sprint 8.2 (Living Agent — o NODE vira um agente)

- **O NODE virou um pequeno agente digital roaming.** Não é redesign, não é
  chatbot, não é IA, não é grafo. Um único agente "vivo" por viewport que
  pousa em `[data-agent-anchor]`, segue a seleção dentro de um contexto,
  olha na direção do ponteiro quando ele se aproxima, e pode ser cutucado no
  Hero. Continuidade narrativa (Hero → Project → Experience → Knowledge →
  Footer), não `position: fixed` seguindo scroll.
- **Anatomia** (`src/components/agent/AgentSvg.tsx`, SVG inline ~0.4 kB):
  corpo geométrico (rounded rect), 2 sensores mínimos, antena com ponta
  petrol (o elemento "vivo"), 2 apoios, 2 satélites de conexão. Indigo +
  graphite; petrol só na antena. Sem rosto, sem emoji, sem robô genérico.
- **Máquina de estados** (CSS, dirigida por `[data-agent-state]`): `idle`
  (breathing 5s + pulse petrol 3.6s) · `look` (sensores/corpo inclinam até
  3px em `--lx/--ly`) · `move` (transição de `translate` num salto curto,
  fade num salto longo) · `land` (bounce 240ms) · `interact` (sensores
  abrem, satélites afastam, antena flare, tilt −2.5°).
- **Anchor system**: `<AgentAnchor name="hero|project|experience|knowledge|
  case|relations|footer|collection|detail" active />` — span 0×0,
  server-rendered, `aria-hidden`, sem footprint. `repositionAgent()`
  dispara `agent:reposition` (deferido 1 frame para o React commitar).
- **Coordenador** (`LivingAgent.tsx`, client, ~180 linhas, carregado como
  chunk async via `AgentMount` → **fora do shared bundle**): 1
  `IntersectionObserver` sobre todos os anchors + 1 `pointermove` escopado
  à `<section>` do contexto ativo (trocado quando o contexto muda). Sem
  listener global de scroll, sem RAF idle (breathing é CSS); RAF só durante
  pointermove ativo. `pick()` escolhe o contexto mais central e, dentro
  dele, o anchor com `data-agent-here` (a seleção atual).
- **Interativo só no Hero**: quando o anchor ativo é `hero`, o agente vira
  `role="button"` + `aria-label="explore"` + teclado (Enter/Space) + hit
  area 44px; toggle abre os sensores e revela a label. Nos outros anchors é
  `aria-hidden` + `pointer-events: none` (nunca cobre conteúdo; z-10, abaixo
  do header).
- **Jornada por contexto**: Hero (acordado, à direita, cutucável) → Featured
  Project (dentro do módulo; anda para a integração selecionada — sem
  pipeline falso) → Experience (na trilha do seletor; **desliza até o papel
  selecionado**, o momento-vitrine do §16) → Knowledge (na trilha de chips
  no desktop; sobe/desce até o chip escolhido; no mobile pousa no cabeçalho
  do painel) → Footer (parado, "fim da viagem"). Case: abertura + "Relações".
  `/projects` e `/conhecimento/[slug]`: um pouso discreto.
- **Reduced motion**: sem viagem (snap instantâneo), sem breathing, sem
  pulse, sem look, sem land bounce — permanece visível e estático em cada
  contexto. `[overflow-x:clip]` no wrapper de `<main>` impede que um agente
  ancorado perto da borda cause scroll horizontal (não quebra o sticky do
  `ProjectToc`).
- **Removido**: `src/components/node/` (Node estático + NodeButton) — para
  não ter "clones". Reaproveitados: palette, tokens, semântica a11y,
  `RelationalScope`, o padrão de reduced-motion.
- **Client Components novos**: 2 — `LivingAgent` (coordenação anchor↔pos↔
  estado, impossível em CSS) e `AgentMount` (o `dynamic(ssr:false)`
  wrapper). `HeroSpotlight` mantido.
- **Gates**: typecheck, lint, **99 testes** (95 → +4: AgentSvg decorativo,
  AgentAnchor toggle, `repositionAgent` dispara evento, `LivingAgent` monta
  inerte sem anchor; + Experience move o anchor na seleção, Knowledge mantém
  anchor ativo), build — verdes. Shared First Load JS **103 kB —
  inalterado**. Home 3.4 kB de rota. Zero overflow em 375/1440 em toda rota.

---

## Atualização — Sprint 9 (Mapa de Conhecimento / Knowledge Map MVP)

- **`/conhecimento/mapa`** — visualização das relações **reais** entre
  experiências, projetos, competências e tecnologias. Sem force graph, sem
  biblioteca, sem CMS novo, sem IA. Aprovado com 4 ajustes: (1) edges muito
  discretos no overview, só o cluster selecionado é protagonista; (2)
  estabilidade espacial — focus é **dim-in-place**, nenhum nó se move; (3)
  deep link com chave pública `type:slug`, não `_id`; (4) o Living Agent
  complementa, move só na seleção (não no hover).
- **Data audit real**: 30 nós (4 experiences · 1 project público · 11 skills ·
  14 technologies) · 52 edges dos 5 tipos (`experience_skill` 17,
  `experience_technology` 22, `project_skill` 3, `project_technology` 9,
  `project_experience` 1) · **0 `skill_technology`**. Grafo conexo.
- **Query** `knowledgeMapQuery` + `getKnowledgeMap()` — uma projeção
  relacional, um round trip, gate público inline, projeção leve. TypeGen
  regenerado (`KnowledgeMapQueryResult`).
- **Adapter** `src/domain/knowledgeGraph.ts` (puro, testado): `toGraphData`
  (5 builders de edge; edge só existe se ambos endpoints forem nós → project
  privado nunca contribui), `nodeKey` = `type:slug` (experience via
  `slugify(company-role)`, sem `_id`), `parseNodeKey`, `connectedIds`
  (1 hop), `applyFilter` (esconde tipo + edges órfãos), `computeLayout`
  (determinístico, 3 faixas: skills / exp+proj / technologies; wrap quando
  a faixa fica apertada).
- **Progressive enhancement**: a rota é **`ƒ` server-rendered on demand** — o
  deep link `?node=type:slug` é lido no `searchParams` do Server Component e
  passado como `initialNode`, **não** via `useSearchParams` (que forçava toda a
  rota a renderizar no cliente atrás de um `Suspense fallback={null}`, deixando
  o HTML — inclusive a lista textual de relações — vazio). Agora todo o mapa
  (trilha, título, filtros, nós, lista textual, estado selecionado do deep
  link) chega no HTML sem JS. A fetch do Sanity continua com cache tags →
  revalidação por webhook intacta; só a montagem do HTML é por request.
- **Client** (`src/features/knowledge/map/`, island de rota, fora do shared
  bundle): `KnowledgeMap` (estado local, `initialNode` do servidor, `?node`
  sincronizado via `router.replace` na forma legível `type:slug`, media hook
  desktop↔mobile, `repositionAgent()` só na seleção), `KnowledgeMapCanvas` (nós HTML posicionados por `computeLayout`
  medido no mount — `opacity:0` até medir, sem mismatch; `ResizeObserver`
  debounced 150ms; focus = dim-in-place: `data-emphasis` base/connected/
  focus/dim, nada se move), `KnowledgeMapNode` (`<button>` real, forma por
  tipo — pill/retângulo/chip/tag), `KnowledgeMapEdges` (`<svg>` de `<path>`
  bézier; overview opacity ~0.1, ativo ~0.85 indigo; `aria-hidden`),
  `KnowledgeMapExplorer` (mobile: entidade focada + rails verticais +
  tap-para-refocar encadeado + "← voltar" numa stack rasa),
  `KnowledgeMapPanel` (vocabulário Apareceu em / Demonstrado em /
  Relacionado à experiência / Tecnologias presentes nesses contextos —
  **derivado, rotulado explicitamente, nunca edge**), `KnowledgeMapFilters`
  (4 toggles + "Visão geral"), `KnowledgeMapTextMap` (fallback a11y sempre
  presente: `<nav>` com cada nó → conexões diretas como links; SVG das
  linhas é `aria-hidden`). Hook `useKnowledgeMap`.
- **Living Agent**: novos anchors `map-overview` (perto do painel na visão
  geral) e `map-node` (no nó selecionado). Reusa `AgentSvg`, movimentos,
  reduced motion. Move → land → idle na seleção; hover não move o agente.
- **Integração**: `/conhecimento` ganhou a superfície CTA "Mapa de
  Conhecimento · Explorar mapa →"; skill/technology detail ganharam "Ver no
  mapa →" com deep link `?node=type:slug`. Header **não** mudou (§6).
- **Reduced motion**: `.km-node` sem transição/scale, agente estático,
  edges instantâneos. Overview aparece completo.
- **CMS intacto**: nenhum schema, conteúdo, slug, relação, ISR, webhook,
  SEO ou regra de segurança alterado. `anonymized` participa só com dado já
  público; `private`/`draft` excluído de nós e edges.
- **Gates**: typecheck, lint, **114 testes** (99 → +15: `knowledgeGraph`
  domain — os 5 edge types, **zero `skill_technology`** mesmo com
  co-ocorrência, exclusão de project privado, `connectedIds` não-transitivo,
  `computeLayout` determinístico; `knowledgeMap` component — overview,
  seleção, deep link, filtro, cadeia mobile, text map), build — verdes.
  Shared First Load JS **103 kB — inalterado**. `/conhecimento/mapa` ~5,9 kB
  de rota / 174 kB First Load (`ƒ` dynamic). Sem physics loop, sem RAF idle,
  sem mousemove global. Zero overflow em 375/1440.
- **Homologação em produção** (`sidclei-portfolio.vercel.app`): HTML SSR do
  mapa traz 30 `.km-node`, 30 linhas "conecta a:", trilha, título e lista
  "Relações em lista"; `?node=technology:python` renderiza já selecionado no
  servidor. Selecionar a competência "Backend Development" acende **apenas**
  2 experiências + 1 projeto — nenhuma tecnologia é nó conectado (§ regra
  crítica verificada ao vivo); o painel mostra "Tecnologias presentes nesses
  contextos" como bloco derivado rotulado. Focus = dim-in-place (nós não se
  movem). Deep link atualiza para `?node=project:chatbot-…` (dois-pontos
  legível). Mobile 375: explorer encadeado (Backend → Chatbot → Voltar),
  `docOverflow: 0`. Rotas `/`, `/conhecimento`, `/conhecimento/mapa`,
  `/experiencia`, `/projects`, case study e detail → 200; webhook sem
  assinatura → 401; nenhum token no HTML.
