# Integrações (servidor)

Módulo futuro da API. Aqui ficam **só contratos e clientes**, sem chaves.

Variáveis: ver `dados e chaves/export/api.env.EXEMPLO`.

| Integração | Uso no app |
|---|---|
| Supabase Auth | Login, JWT, sessão |
| Neon | Banco principal (redações, feed, evolução) |
| Gemini | Pré-correção C1–C5 |
| Gmail (curso) | Convites, avisos de turma |
| Gmail (admin) | Suporte / alertas operacionais |
| Drive | Materiais / anexos autorizados |
| Sheets | Espelho opcional de turmas/notas |

Nunca importe este pacote no bundle do Expo/Next cliente com secrets.
