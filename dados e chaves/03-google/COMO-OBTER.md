# Google (Drive + Sheets + 2 Gmails)

## Projeto no Google Cloud

1. Crie um projeto GCP: `redacao-nota-mil-2027`.
2. Ative APIs: Gmail API, Google Drive API, Google Sheets API.
3. Tela de consentimento OAuth → External (ou Internal se Workspace) → escopos mínimos:
   - Gmail: `gmail.send` (não use `gmail.modify` se não precisar)
   - Drive: pastas específicas (`drive.file`)
   - Sheets: `spreadsheets` só nas planilhas do curso
4. Crie **dois** OAuth Client IDs (ou um client + dois refresh tokens):
   - `gmail-curso` → conta do curso
   - `gmail-pessoal` / admin → sua conta
5. Baixe o JSON do client → `../privados/` (nunca no Git).
6. Gere refresh token uma vez (script local) e guarde em `privados`.

## Service account (opcional, Drive/Sheets)

- Crie service account sem chave em repositório público.
- Compartilhe a pasta/planilha com o e-mail da SA.
- JSON da SA → `privados/google-drive-sa.json`.

## Segurança

- Não peça escopos de leitura total da caixa de e-mail.
- Tokens só no servidor / n8n autenticado.
- Rotacione se o PC for compartilhado.
