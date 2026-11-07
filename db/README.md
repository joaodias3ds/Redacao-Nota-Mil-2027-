# Banco (Neon)

Banco principal do app: projeto Neon `redacao-nota-mil-2027` em **sa-east-1** (mesma região do Supabase Auth).

| Papel | Serviço |
|---|---|
| Auth / JWT | Supabase `fjmtabrwtgpganwkulpk` |
| Dados (redações, feed, evolução, Drive meta) | Neon |
| Arquivos | Google Drive (service account) |

## Migrations

1. `neon/001_core.sql` — tabelas core + índices

Aplicado no branch `main`. Para reaplicar em outro ambiente, rode o SQL no SQL Editor do Neon ou via MCP `run_sql`.

## Performance

- Connection string **pooler** no servidor (`DATABASE_URL` em `privados/neon.env`)
- Índices em `essays(student_id, updated_at)`, status e pré-correções
- Região única `sa-east-1` para Auth + DB
