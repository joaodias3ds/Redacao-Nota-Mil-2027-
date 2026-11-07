# Supabase

Projeto atual na conta: `jcsolucoes3d@gmail.com's Project` (ref `gewfhwgepuobkvrlfqcw`, região `sa-east-1`) — status **INACTIVE**.

## Passos

1. Abra https://supabase.com/dashboard e reative ou crie o projeto **Redação Nota Mil 2027** em **São Paulo (sa-east-1)**.
2. Settings → API:
   - Project URL → `SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_URL`
   - `anon` `public` → apps
   - `service_role` → **só** `dados e chaves/privados/api.env` (nunca mobile/web)
3. Settings → Database → connection string (se usar Postgres do Supabase) **ou** use Neon como DB principal e Supabase só Auth/Storage.
4. Authentication → Providers: e-mail/senha; desligue cadastro aberto (só convite).
5. Ative **RLS** em todas as tabelas antes de dados reais.

Cole os valores reais em `../privados/supabase.env`.
