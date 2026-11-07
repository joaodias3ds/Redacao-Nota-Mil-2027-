/**
 * Autoriza 1 conta Gmail (OAuth Desktop) e grava refresh token em privados/.
 *
 * Uso:
 *   node scripts/google-oauth-gmail.mjs curso
 *   node scripts/google-oauth-gmail.mjs admin
 *
 * Não imprime client_secret nem refresh token completos.
 */
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const privados = path.join(root, 'dados e chaves', 'privados');
const clientPath = path.join(privados, 'client-oauth-desktop.json');
const PORT = 53682;
// Desktop client costuma ter "http://localhost" — usamos localhost (não 127.0.0.1)
const REDIRECT = `http://localhost:${PORT}/oauth2callback`;

const profile = (process.argv[2] || '').toLowerCase();
if (!['curso', 'admin'].includes(profile)) {
  console.error('Use: node scripts/google-oauth-gmail.mjs curso');
  console.error('  ou: node scripts/google-oauth-gmail.mjs admin');
  process.exit(1);
}

const outPath = path.join(privados, profile === 'curso' ? 'gmail-curso.env' : 'gmail-admin.env');

function loadGoogle() {
  try {
    return require('googleapis');
  } catch {
    console.error('Instale dependências na raiz: pnpm add -w googleapis');
    process.exit(1);
  }
}

function openBrowser(url) {
  // Salva URL para abrir manualmente se preciso
  const urlFile = path.join(privados, `_oauth-url-${profile}.txt`);
  fs.writeFileSync(urlFile, url, 'utf8');
  console.log('URL também salva em:', urlFile);

  if (process.platform === 'win32') {
    // PowerShell Start-Process não corta os & da query string
    const escaped = url.replace(/'/g, "''");
    spawn(
      'powershell',
      ['-NoProfile', '-Command', `Start-Process '${escaped}'`],
      { detached: true, stdio: 'ignore' },
    ).unref();
    return;
  }
  spawn(process.platform === 'darwin' ? 'open' : 'xdg-open', [url], {
    detached: true,
    stdio: 'ignore',
  }).unref();
}

if (!fs.existsSync(clientPath)) {
  console.error('Falta:', clientPath);
  process.exit(1);
}

const raw = JSON.parse(fs.readFileSync(clientPath, 'utf8'));
const installed = raw.installed || raw.web || raw;
const clientId = installed.client_id;
const clientSecret = installed.client_secret;
if (!clientId || !clientSecret) {
  console.error('client-oauth-desktop.json sem client_id/client_secret');
  process.exit(1);
}

const { google } = loadGoogle();

const oauth2Client = new google.auth.OAuth2(clientId, clientSecret, REDIRECT);

const SCOPES = [
  'https://www.googleapis.com/auth/gmail.send',
  'https://www.googleapis.com/auth/userinfo.email',
];

const authUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  prompt: 'consent',
  scope: SCOPES,
  include_granted_scopes: true,
});

console.log('');
console.log('=== Autorização Gmail:', profile.toUpperCase(), '===');
console.log('1) Vai abrir o navegador.');
console.log('2) Entre com a conta correta (curso OU pessoal/admin).');
console.log('3) Aceite as permissões (enviar e-mail).');
console.log('4) Se aparecer aviso de app não verificado: Avançado → Continuar.');
console.log('Aguardando callback em', REDIRECT);
console.log('');

const server = http.createServer(async (req, res) => {
  try {
    if (!req.url || !req.url.startsWith('/oauth2callback')) {
      res.writeHead(404);
      res.end('Not found');
      return;
    }
    const url = new URL(req.url, `http://127.0.0.1:${PORT}`);
    const err = url.searchParams.get('error');
    if (err) throw new Error(err);
    const code = url.searchParams.get('code');
    if (!code) throw new Error('Sem code na URL');

    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    let email = '';
    try {
      const oauth2 = google.oauth2({ version: 'v2', auth: oauth2Client });
      const me = await oauth2.userinfo.get();
      email = me.data.email || '';
    } catch {
      email = '';
    }

    if (!tokens.refresh_token) {
      throw new Error(
        'Google não devolveu refresh_token. Revogue o acesso do app em https://myaccount.google.com/permissions e rode de novo.',
      );
    }

    const env = [
      `# Gmail ${profile} — NÃO SUBIR AO GIT`,
      `GOOGLE_CLIENT_ID=${clientId}`,
      `GOOGLE_CLIENT_SECRET=${clientSecret}`,
      `GOOGLE_REFRESH_TOKEN=${tokens.refresh_token}`,
      `GOOGLE_SENDER=${email}`,
      '',
    ].join('\n');

    fs.writeFileSync(outPath, env, 'utf8');

    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(
      `<h1>OK — Gmail ${profile}</h1><p>Conta: <b>${email || '(desconhecido)'}</b></p><p>Pode fechar esta aba e voltar ao terminal.</p>`,
    );

    console.log('Salvo em:', outPath);
    console.log('Conta autorizada:', email || '(e-mail não lido)');
    console.log('refresh_token: ****' + String(tokens.refresh_token).slice(-6));
    server.close();
    process.exit(0);
  } catch (e) {
    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Erro: ' + e.message);
    console.error('Falha:', e.message);
    server.close();
    process.exit(1);
  }
});

server.listen(PORT, '127.0.0.1', () => {
  console.log('Abrindo navegador…');
  console.log('Se não abrir, cole esta URL manualmente:');
  console.log(authUrl);
  openBrowser(authUrl);
});
