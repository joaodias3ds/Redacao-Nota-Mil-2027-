# Passo a passo — Gmail (2 contas) + Drive + Sheets

Faça isto no computador, com calma. No final você terá arquivos **só na pasta `privados/`** (não sobem pro GitHub).

Tempo estimado: 20–40 minutos na primeira vez.

---

## O que vamos conseguir

| Conta / serviço | Para quê no app |
|---|---|
| Gmail do **curso** | Convites, avisos de turma, “redação corrigida” |
| Gmail **pessoal/admin** | Suporte, alertas pra você |
| **Drive** | Materiais / pastas do curso |
| **Sheets** (opcional agora) | Planilha de turmas/notas |

**Importante:** o Cursor **não** entra na sua conta. Quem autoriza é **você** no navegador.

---

## Parte 1 — Criar o projeto no Google Cloud

1. Abra: https://console.cloud.google.com/
2. Faça login com a conta Google que **vai administrar** o app (pode ser a pessoal).
3. No topo, clique no seletor de projetos → **Novo projeto**.
4. Nome sugerido: `redacao-nota-mil-2027`
5. Organização: a sua, se aparecer; senão “Sem organização”.
6. Clique **Criar** e espere o projeto ficar selecionado no topo.

---

## Parte 2 — Ligar as APIs

1. No menu ☰ → **APIs e serviços** → **Biblioteca**.
2. Pesquise e clique **Ativar** em cada uma:
   - **Gmail API**
   - **Google Drive API**
   - **Google Sheets API** (se for usar planilhas)
3. Confirme que as três aparecem em **APIs e serviços** → **APIs ativadas**.

---

## Parte 3 — Tela de consentimento OAuth

1. Menu ☰ → **APIs e serviços** → **Tela de consentimento OAuth**.
2. Tipo de usuário:
   - Se as contas forem Gmail comum (`@gmail.com`): escolha **Externo**.
   - Se for Google Workspace da escola/empresa: pode ser **Interno**.
3. Preencha:
   - **Nome do app:** `Redação Nota Mil`
   - **E-mail de suporte:** o seu
   - **E-mail do desenvolvedor:** o seu
4. Clique **Salvar e continuar**.
5. Em **Escopos** → **Adicionar ou remover escopos** → marque só o necessário:
   - `https://www.googleapis.com/auth/gmail.send` — **enviar** e-mail (não ler a caixa inteira)
   - `https://www.googleapis.com/auth/drive.file` — arquivos que o app criar/abrir
   - `https://www.googleapis.com/auth/spreadsheets` — só se for usar Sheets
6. **Salvar e continuar**.
7. Em **Usuários de teste** (se o app estiver em “Teste”):
   - Adicione o e-mail do **Gmail do curso**
   - Adicione o e-mail do **Gmail pessoal/admin**
8. **Salvar e continuar** até o fim do resumo.

> Enquanto o app estiver em modo **Teste**, só esses e-mails de teste conseguem autorizar. Depois você pode publicar o app (revisão do Google), se precisar de mais usuários.

---

## Parte 4 — Criar o Client ID (OAuth)

1. Menu ☰ → **APIs e serviços** → **Credenciais**.
2. **+ Criar credenciais** → **ID do cliente OAuth**.
3. Tipo de aplicativo: **App para computador** (Desktop)  
   (é o mais simples para gerar o refresh token no seu PC).
4. Nome: `redacao-local-oauth`
5. **Criar**.
6. Clique **Fazer o download do JSON**.
7. Renomeie o arquivo para algo claro, por exemplo:  
   `client-oauth-desktop.json`
8. **Mova** esse arquivo para:

```
D:\João - Computador\Redação Nota Mil - 2027\dados e chaves\privados\
```

**Nunca** cole esse JSON no chat, no GitHub ou no WhatsApp.

---

## Parte 5 — (Opcional mas recomendado) Service Account só para Drive/Sheets

Use se quiser que o **servidor** acesse uma pasta/planilha sem “login de pessoa”.

1. Em **Credenciais** → **+ Criar credenciais** → **Conta de serviço**.
2. Nome: `redacao-drive-sheets`
3. Crie → abra a conta de serviço → aba **Chaves** → **Adicionar chave** → **JSON**.
4. Salve o download em:

```
dados e chaves\privados\google-drive-sa.json
```

5. No Google Drive, **compartilhe** a pasta do curso com:
   `redacao-drive-sheets@redacao-nota-mil-2027.iam.gserviceaccount.com`
   (permissão **Editor**).
6. Copie o **ID da pasta** (na URL do Drive: `.../folders/ESTE_ID`) para `privados/drive.env` → `GOOGLE_DRIVE_ROOT_FOLDER_ID=...`
7. No Sheets, compartilhe a planilha do mesmo jeito (opcional).

JSON da SA já está em `privados/google-drive-sa.json` (e espelho `drive.env`).

---

## Parte 6 — Autorizar os dois Gmails (gerar refresh token)

### Como o envio funciona (importante)

Não é um “plugin” separado do app Gmail. É a **API do Gmail** com a permissão `gmail.send`:

1. O servidor do nosso app pede para o Google enviar uma mensagem.
2. O Google envia **usando a conta que você autorizou** (ex.: e-mail do curso).
3. A mensagem aparece em **Enviados** dessa conta.
4. O aluno/responsável recebe no **inbox normal** (app Gmail no celular, Gmail web, Outlook…).

Escopo usado: só **enviar** (`gmail.send`) — o app **não** lê a caixa de entrada inteira.

Script do projeto: `scripts/google-oauth-gmail.mjs` (já instalado).

### 6.0 Redirect URI (uma vez no Console)

1. Google Cloud → **Credenciais** → seu client **App para computador**
2. Adicione URIs de redirecionamento:
   - `http://127.0.0.1:53682/oauth2callback`
   - `http://localhost:53682/oauth2callback`
3. **Salvar**

### 6.1 Usuários de teste

Tela de consentimento OAuth → **Usuários de teste** → inclua os 2 e-mails (curso + pessoal).

### 6.2 Rodar duas vezes (PowerShell na raiz)

```powershell
cd "D:\João - Computador\Redação Nota Mil - 2027"

# 1ª: Gmail do CURSO
node scripts/google-oauth-gmail.mjs curso

# 2ª: Gmail ADMIN / pessoal
node scripts/google-oauth-gmail.mjs admin
```

Cada vez o navegador abre → escolha a conta certa → Aceitar → volte ao terminal.

Arquivos gerados em `privados\`:

- `gmail-curso.env`
- `gmail-admin.env`

---

## Parte 7 — Conferir se está seguro

1. Abra o projeto no Cursor.
2. Rode:

```powershell
cd "D:\João - Computador\Redação Nota Mil - 2027"
.\scripts\auditoria-segredos.ps1
```

3. Tem que dizer que `privados\*.env` e JSONs estão **ignorados pelo git**.
4. `git status` **não** pode listar nada de `privados/`.

---

## Parte 8 — O que fazer depois (no app)

Quando os arquivos estiverem em `privados/`:

1. Copie os valores para `privados\api.env` (use o modelo em `export\api.env.EXEMPLO`).
2. Rode `.\scripts\aplicar-env-local.ps1` quando formos ligar a API de verdade.
3. A API do app (servidor) usa os tokens. O **celular/navegador do aluno nunca** recebe esses segredos.

---

## Problemas comuns

| Problema | Solução |
|---|---|
| “Acesso bloqueado: app não verificado” | Adicione o e-mail em **Usuários de teste** (Parte 3). |
| Escolhi a conta errada no login | Revogue o acesso em https://myaccount.google.com/permissions e autorize de novo. |
| Refresh token veio vazio | No OAuth Desktop, use `access_type=offline` e `prompt=consent` (o script certo já faz isso). |
| Drive da SA “não vê pasta” | Compartilhe a pasta com o e-mail da service account. |
| Medo de vazar | Só `privados/`. Nunca commit. Nunca cola no chat. |

---

## Checklist rápido

- [ ] Projeto GCP criado  
- [ ] Gmail + Drive (+ Sheets) APIs ativadas  
- [ ] Tela de consentimento + usuários de teste (2 e-mails)  
- [ ] Client OAuth Desktop baixado → `privados\`  
- [ ] (Opcional) Service account + pasta compartilhada  
- [ ] Tokens dos 2 Gmails em `privados\`  
- [ ] `auditoria-segredos.ps1` passou  

Quando terminar a Parte 4 (JSON na pasta `privados`), me avise que eu monto o **script do projeto** para gerar os dois refresh tokens com um comando só.
