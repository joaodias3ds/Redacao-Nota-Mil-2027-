# Redação Nota Mil — 2027

App do aluno em pastas separadas, com design system do Site Principal.

## Estrutura

```
Redação Nota Mil - 2027/
├── Redação Mobile/     # Expo (iOS/Android) — 8 telas do aluno
├── Redação Web/        # Next.js — mesmas telas em /aluno/*
├── packages/shared/    # contratos Zod + módulo student (mocks/API)
├── design-system/      # design-system-export (tokens, componentes, UI kits)
└── README.md
```

Origem trazida de `D:\João - Computador\Redação Nota Mil\Site Principal`.

## Como rodar

Na raiz (precisa de Node + pnpm):

```bash
pnpm install
pnpm build:shared
pnpm dev:web      # http://localhost:3001/aluno/onboarding
pnpm dev:mobile  # Expo
```

Atalhos web: `/aluno/onboarding` → login → Hoje / Feed / Evolução / Perfil.

A web usa `next dev --webpack` (Turbopack falha com path Unicode no monorepo neste ambiente).

## Três formas de ligar Mobile e Web

1. **`packages/shared` + `design-system`**  
   Tipos, mocks e tokens iguais. Trocar mock por HTTP sem reescrever telas.

2. **API do Site Principal (`nota-mil-api` + Supabase)**  
   Os dois apps apontam para o mesmo backend (auth, redações, feed).  
   Schema ENEM já existe em `packages/shared/src/assessment`.

3. **Deep links**  
   Scheme mobile: `redacao://` (ver `app.json`).  
   Paths espelhados na web: `/aluno/status`, `/aluno/pre-correcao`, `/aluno/editor`, `/aluno/feed`.

## Design

Base: `design-system/` (rosa `#EC008B`, ação `#D1007B`, Poppins + Inter).  
Componentes de referência: `EssayFeedback`, `GradeChart`, `BottomNav` em `design-system/components`.

## Fase atual

**Parte 1–2:** editor sincronizado + IA auxiliar; **envio** com pré-correção C1–C5 (nota estimada para treino). Ver `docs/PART1.md` e `docs/PART2.md`.

## Segurança e chaves

A pasta **`dados e chaves/`** é **local** e está no `.gitignore` (não sobe no GitHub).  
Exemplos públicos de env: `docs/env/`. Contrato da IA auxiliar: `docs/ia/`.  
Antes de qualquer push: `.\scripts\auditoria-segredos.ps1`.

Integrações: Supabase (Auth), Neon (`redacao-nota-mil-2027`), Google (Drive/Sheets/2 Gmails), Gemini — detalhes em `docs/SEGURANCA-INTEGRACOES.md`.

Repositório: https://github.com/joaodias3ds/Redacao-Nota-Mil-2027-
