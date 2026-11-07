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
| Supabase | Auth ativo `redacao-nota-mil-2027` (`fjmtabrwtgpganwkulpk`, sa-east-1) |
| Neon | DB ativo `calm-grass-30104205` (`redacao-nota-mil-2027`, sa-east-1) + schema core |
| Google | Gmail OAuth (curso+admin) + Drive SA em `privados/` |
| Gemini | `gemini-3.1-flash-lite` em `privados/gemini.env` |

## Checklist LGPD / menores

- Consentimento do responsável antes do 1º uso (menor).
- Minimização de dados.
- Sem anúncios / SDKs de tracking com dados de menor.
- Exportação e exclusão documentadas.
- Logs sem corpo completo de redação em ferramentas de métricas.
