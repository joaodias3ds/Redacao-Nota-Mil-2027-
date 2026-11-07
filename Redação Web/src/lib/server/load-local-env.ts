import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

let loaded = false;

/** Carrega `dados e chaves/privados/*.env` no process.env (só local / servidor). */
export function loadLocalSecrets() {
  if (loaded || process.env.NOTA_MIL_SECRETS_LOADED === '1') {
    loaded = true;
    return;
  }

  const root = path.resolve(process.cwd(), '..');
  const priv = path.join(root, 'dados e chaves', 'privados');
  const files = ['api.env', 'neon.env', 'gemini.env', 'supabase.env'];

  for (const name of files) {
    const full = path.join(priv, name);
    if (!existsSync(full)) continue;
    const text = readFileSync(full, 'utf8');
    for (const line of text.split(/\r?\n/)) {
      if (!line || line.trimStart().startsWith('#')) continue;
      const i = line.indexOf('=');
      if (i < 0) continue;
      const key = line.slice(0, i).trim();
      const value = line.slice(i + 1).trim();
      if (!key || value.includes('SUBSTITUA')) continue;
      if (!process.env[key]) process.env[key] = value;
    }
  }

  process.env.NOTA_MIL_SECRETS_LOADED = '1';
  loaded = true;
}
