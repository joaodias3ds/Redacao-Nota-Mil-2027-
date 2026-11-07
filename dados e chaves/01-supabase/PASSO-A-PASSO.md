# Passo a passo — Supabase

## Projeto (já criado)

| Campo | Valor |
|---|---|
| Nome | `redacao-nota-mil-2027` |
| Ref | `fjmtabrwtgpganwkulpk` |
| Região | `sa-east-1` (São Paulo) |
| Status | ACTIVE_HEALTHY |
| Uso | **Auth** (login/JWT). Banco do app = **Neon** |

URL: `https://fjmtabrwtgpganwkulpk.supabase.co`

## Arquivos em `privados/` (não sobem no Git)

| Arquivo | Conteúdo |
|---|---|
| `supabase.env` | URL, anon, publishable, service_role |
| `web.env` | só URL + anon (Next) |
| `mobile.env` | só URL + anon (Expo) |
| `api.env` | secrets do servidor |

## O que falta no painel (1 minuto)

1. Abra [API Settings](https://supabase.com/dashboard/project/fjmtabrwtgpganwkulpk/settings/api)
2. Copie **service_role** (secret)
3. Cole em `privados/supabase.env` e `privados/api.env` no lugar de `SUBSTITUA_SERVICE_ROLE`
4. Em **Authentication → URL Configuration**:
   - Site URL (dev): `http://localhost:3001`
   - Redirect URLs: `http://localhost:3001/**`, `redacao://**`
5. Em **Authentication → Providers**: e-mail ligado; cadastro aberto **desligado** (só convite) quando for para produção

## Segurança

- `service_role` **nunca** no mobile/web
- Anon key pode ir no app (com RLS nas tabelas do Supabase, se houver)
- Dados de redação ficam no **Neon**, não no Postgres do Supabase
