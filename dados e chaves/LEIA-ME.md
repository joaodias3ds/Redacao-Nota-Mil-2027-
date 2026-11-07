# Dados e chaves — uso exclusivo local

**Esta pasta NÃO vai para o GitHub.**  
Guarde aqui tudo que for sensível. O código do app só lê variáveis de ambiente; nunca chaves embutidas no código.

## Estrutura

| Pasta | Conteúdo |
|---|---|
| `01-supabase/` | URL, anon key, service role, JWT secret, DB password |
| `02-neon/` | Connection string Postgres (app / migrations) |
| `03-google/gmail-curso/` | OAuth do Gmail institucional (avisos, convites) |
| `03-google/gmail-pessoal/` | OAuth do 2º Gmail (admin / suporte) |
| `03-google/drive/` | Service account ou OAuth do Drive (materiais) |
| `03-google/sheets/` | Credenciais Sheets (planilhas de turma/notas) |
| `04-gemini/` | API key Gemini (pré-correção) |
| `05-deploy/web\|mobile\|api/` | Envs prontos para colar no host (Vercel, EAS, Railway…) |
| `export/` | Modelos `.env` sem segredo (podem ser versionados fora) |
| `privados/` | Arquivos reais com senha — **nunca commit** |

## Como preencher

1. Copie cada `*.EXEMPLO.env` → remova `.EXEMPLO` (ex.: `privados/web.env`).
2. Cole os valores dos painéis (Supabase, Neon, Google Cloud).
3. Rode `.\scripts\aplicar-env-local.ps1` para gerar `.env.local` / `.env` nos apps.
4. Para publicar: copie o arquivo de `05-deploy/...` no painel do provedor.

## Regras de segurança

- **Service role / DB password / refresh tokens** = só servidor (API), nunca no app mobile/web público.
- **Anon key** pode ir no app (com RLS no Supabase). Ainda assim não publique em repositório público se puder evitar.
- Menores (LGPD / ECA Digital): não envie texto de redação para analytics; Gemini só recebe texto sem nome.
- Rotacione chaves se vazar. Guarde backup cifrado fora do OneDrive público.
- Dois Gmails: separe escopos (curso = envios automáticos; pessoal = admin).

## Checklist antes de qualquer `git push`

- [ ] `dados e chaves/privados/` não aparece no `git status`
- [ ] Nenhum `.env`, `.env.local`, `credentials.json`, `*.pem`
- [ ] `git grep` / busca por `sk-`, `eyJ`, `AIza`, `postgres://` sem hits reais
- [ ] Só `*.EXEMPLO.env` e este LEIA-ME (se a pasta estiver no ignore, nem isso sobe)
