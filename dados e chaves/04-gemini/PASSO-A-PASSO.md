# Passo a passo — Gemini (pré-correção)

A chave fica **só** em `dados e chaves/privados/gemini.env` (não sobe pro Git).

## Status

- Chave válida (prefixo `AQ.`)
- Modelo padrão: **`gemini-3.1-flash-lite`** (rápido; OK para novos projetos)
- `gemini-2.5-flash` **não** funciona mais para chaves novas (404)

## 1. Criar / renovar a API key

1. Abra https://aistudio.google.com/apikey
2. Projeto Google Cloud: **`redacao-nota-mil-2027`**
3. Copie a chave (não cole no chat / GitHub)

## 2. Salvar no PC

```powershell
cd "D:\João - Computador\Redação Nota Mil - 2027"
.\scripts\salvar-gemini-key.ps1
```

## 3. Conferir

```powershell
.\scripts\testar-gemini.ps1
```

Esperado: `Gemini OK` + `modelo=gemini-3.1-flash-lite`

## Uso no app

- Enviar à IA: **só tema + texto** (sem nome do aluno)
- Resposta = estimativa; nota oficial = professor
