# Neon (Postgres)

Projetos já existentes na conta (não misturar dados de outros produtos sem querer):

- `redasmil` (sa-east-1)
- `mobileredas` (sa-east-1)
- `redas-financeiro`, `rnm-matematica`, etc.

## Projeto dedicado (já criado)

- **Nome:** `redacao-nota-mil-2027`
- **ID:** `calm-grass-30104205`
- **Região:** `aws-sa-east-1` (São Paulo)
- **Postgres:** 17

1. Connection string real → `../privados/neon.env` (gerada na configuração; **não** versionar).
2. No console Neon você também pode copiar a URL **pooled** (app) e **direct** (migrations).
3. Nunca exponha `DATABASE_URL` no cliente.

IP allowlist: em produção, restrinja se possível; em dev pode ficar aberto com SSL obrigatório.
