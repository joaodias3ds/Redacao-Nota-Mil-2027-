# Gemini (pré-correção de redação)

1. Google AI Studio / Cloud → API key.
2. Restrinja a chave por API e, se possível, por IP/referrer.
3. Cole em `../privados/api.env` como `GEMINI_API_KEY`.
4. No código: envie **só o texto da redação + tema**, sem nome, e-mail ou turma.
5. Trate a saída como **estimativa**; nota oficial = professor.
6. Limite diário por aluno na API para controlar custo e abuso.

Modelo sugerido (ajustável): `gemini-2.5-flash`.
