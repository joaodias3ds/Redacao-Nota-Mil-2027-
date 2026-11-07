# Parte 1 — Editor sincronizado + IA auxiliar

## O que entrega

1. **Mesma API** para Web e Mobile (`http://localhost:3001/api/aluno/*`)
2. **Autosave** do rascunho (memória do servidor + Neon quando `DATABASE_URL` existe)
3. **IA auxiliar** no editor (`POST /api/aluno/assist`) — estrutura do curso, **sem nota ENEM**
4. Pasta `dados e chaves/` **fora do Git**

## Como rodar

```powershell
cd "D:\João - Computador\Redação Nota Mil - 2027"
pnpm install
pnpm build:shared
pnpm dev:web
# outro terminal
pnpm dev:mobile
```

- Web aluno: http://localhost:3001/aluno/hoje → Editor
- Mobile: `EXPO_PUBLIC_API_URL=http://localhost:3001` (já no `.env` local)

## Próximas partes

- Parte 2: envio + pré-correção C1–C5 (ficha estimada)
- Parte 3: fila do professor + nota oficial
