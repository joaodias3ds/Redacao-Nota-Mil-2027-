# Segurança das integrações

## Arquitetura

```
Mobile / Web  --(anon key + JWT usuário)-->  Supabase Auth
                      |
                      v
                   API (servidor)
                      |
      +---------------+---------------+
      |               |               |
   Neon DB      Gemini API      Google APIs
 (Postgres)   (pré-correção)  (Gmail×2, Drive, Sheets)
```

- Cliente **nunca** recebe: service role, DATABASE_URL, refresh tokens Google, Gemini key.
- Supabase **RLS** obrigatório; API valida JWT + papel (aluno/professor/admin/responsável).
- Redação enviada à IA: texto + tema apenas; sem PII.
- Dois Gmails: contas e tokens separados (curso vs admin).

## Contas detectadas (referência)

| Serviço | Situação |
|---|---|
| Supabase | 1 projeto INACTIVE (`gewfhwgepuobkvrlfqcw`, sa-east-1) — reativar ou criar novo |
| Neon | vários projetos; preferir um dedicado `redacao-nota-mil-2027` em sa-east-1 |
| Google | preencher em `dados e chaves/` após criar OAuth no GCP |
| Gemini | chave em `dados e chaves/privados` |

## Checklist LGPD / menores

- Consentimento do responsável antes do 1º uso (menor).
- Minimização de dados.
- Sem anúncios / SDKs de tracking com dados de menor.
- Exportação e exclusão documentadas.
- Logs sem corpo completo de redação em ferramentas de métricas.
