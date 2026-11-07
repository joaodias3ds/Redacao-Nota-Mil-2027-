# Parte 2 — Envio + pré-correção C1–C5

## Fluxo

1. Aluno escreve no editor (Web ou Mobile)
2. **Enviar** → `POST /api/aluno/send`
3. Servidor chama Gemini (ou heurística) e monta ficha C1–C5
4. Status → `GET /api/aluno/status`
5. Pré-correção → `GET /api/aluno/pre-correcao`

## Regras

- Notas só em **0 / 40 / 80 / 120 / 160 / 200**
- Total recalculado no servidor
- UI: **“Nota estimada para treino”**
- Nota oficial continua com o professor

## Docs

- Contrato: `docs/ia/pre-correcao.md`
