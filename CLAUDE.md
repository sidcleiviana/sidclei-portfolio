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
