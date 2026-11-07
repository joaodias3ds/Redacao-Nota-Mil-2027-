# Parte 3 — Fila do professor

## Fluxo

1. Aluno envia redação (Parte 2)
2. Professor abre `/professor/fila`
3. Revisar texto + ficha da IA
4. Ajustar C1–C5 → **Publicar nota oficial** ou **Devolver**
5. Aluno vê status atualizado e `/aluno/oficial`

## APIs

- `GET /api/professor/fila`
- `GET /api/professor/essays/:id`
- `POST /api/professor/essays/:id` `{ action: "publish"|"return", competencies, teacherNote }`
- `GET /api/aluno/oficial?essayId=`

## Demo

Sem login ainda. Depois: proteger com Supabase role `teacher`.
