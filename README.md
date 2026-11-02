# Arquitetura E2E — POM, Fixture de Sessão e Data-Driven

Atividade Prática 2 — Playwright & TypeScript (Unidade 14) · Aponti Academy
Autor: Anthony Ricardo

## Plataforma escolhida

**LojaQA (Projeto Didático)** — Opção Base

- Login: https://alisonmelo.github.io/tioalison-pe-t4-fap26/projetos-base/01-sistema-login/login.html
- Área restrita: `painel.html`
- API de autenticação: `https://api-qa-fap2026.onrender.com/api/login`

### Credenciais públicas de teste ("Massa de dados para QA" da tela de login)

| Perfil     | E-mail               | Senha              | Resultado esperado                     |
|------------|----------------------|--------------------|----------------------------------------|
| Cliente    | `user@system.com`    | `UserPassword123`  | Painel "Minha Conta" — badge `USER`    |
| Admin      | `admin@system.com`   | `AdminPassword123` | "Painel Administrativo" — `ADMIN`      |
| Lojista    | `lojista@system.com` | `SellerPass123`    | "Painel do Lojista" — `SELLER`         |
| Bloqueado  | `blocked@system.com` | `Blocked123`       | Erro "Usuário bloqueado."              |

## Estrutura

```
meu-projeto-automacao/
├── data/
│   └── usuarios.data.ts            # Interface CenarioLogin + 8 cenários tipados
├── pages/
│   ├── LoginPage.ts                # POM da tela de Login
│   └── DashboardPage.ts            # POM do painel.html com logout()
├── fixtures/
│   └── auth.fixture.ts             # test.extend que injeta dashboardPage já autenticado
├── tests/
│   ├── dashboard-sessao.spec.ts    # 6 testes iniciando direto na área logada
│   └── login-data-driven.spec.ts   # 8 testes dinâmicos gerados via for...of
├── playwright.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

## Como cada requisito foi atendido

- **Req. 1 — DashboardPage:** `constructor(private page: Page)`; mapeia o identificador do usuário autenticado (`#userSummary`), o título do painel (`#panelTitle`), o badge de perfil (`#roleBadge`), os dados do perfil (`#profileMetrics`) e o botão Sair (`#logoutButton`). O método `logout()` clica em Sair e aguarda o retorno para `loja.html` (estado deslogado). **Nenhum `expect()` nos Page Objects.**
- **Req. 2 — Fixture:** `test.extend<{ loginPage; dashboardPage }>` navega para o login, preenche as credenciais do cliente, submete, aguarda a URL `painel.html` e o título visível, e entrega a página com `await use(dashboardPage)`. Os 6 testes de `dashboard-sessao.spec.ts` começam logados sem digitar credenciais.
- **Req. 3 — Data-Driven:** interface `CenarioLogin { descricao, usuario, senha, sucesso, mensagemEsperada?, perfilEsperado?, bloqueadoNoFront? }` e array `listaUsuarios` com 8 cenários: cliente, admin e lojista válidos, usuário bloqueado, senha incorreta, usuário inexistente, e-mail inválido e senha curta (esses dois são barrados pela validação do front, que desabilita o botão Entrar). O spec itera com `for (const cenario of listaUsuarios)` e nomeia via `` `CT - Login: ${cenario.descricao}` ``.
- **Req. 4 — Boas práticas:** zero `waitForTimeout`; apenas assertions web-first (`toBeVisible`, `toHaveURL`, `toHaveText`, `toContainText`, `toBeDisabled`). Nenhum seletor solto nos specs — tudo passa pelos Page Objects.

> Observação: a API fica hospedada no Render e pode levar alguns segundos para "acordar" na primeira requisição. Por isso o `playwright.config.ts` usa `expect.timeout` de 30s.

## Como executar

Pré-requisito: Node.js 18+.

```bash
npm install
npx playwright install chromium
npx playwright test
```

Outros comandos:

```bash
npm run test:headed   # executa com navegador visível
npm run test:ui       # modo UI do Playwright
npm run report        # abre o relatório HTML
npm run typecheck     # checagem de tipos TypeScript
```

Resultado esperado: **14 testes passando (100% verde)**.
