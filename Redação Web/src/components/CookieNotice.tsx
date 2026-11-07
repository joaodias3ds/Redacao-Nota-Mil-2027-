'use client';

import { useEffect, useState } from 'react';

const KEY = 'rnm_cookie_notice_v1';

export function CookieNotice() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      setOpen(window.localStorage.getItem(KEY) !== 'aceito');
    } catch {
      setOpen(true);
    }
  }, []);

  if (!open) return null;

  return (
    <div className="cookie" role="dialog" aria-labelledby="cookie-title" aria-describedby="cookie-body">
      <p id="cookie-title" style={{ fontWeight: 700, color: 'var(--text-primary)' }}>
        Cookies deste site
      </p>
      <p id="cookie-body">
        Usamos somente cookies essenciais de sessão e de segurança. Não há Google Analytics, pixel de anúncio nem cookie de marketing neste sistema. O aviso completo está na política de cookies.
      </p>
      <div className="cookie-actions">
        <button
          type="button"
          className="primary"
          onClick={() => {
            try {
              window.localStorage.setItem(KEY, 'aceito');
            } catch {
              /* o aviso volta na próxima visita se o armazenamento estiver bloqueado */
            }
            setOpen(false);
          }}
        >
          Entendi
        </button>
        <a className="secondary" href="/cookies">
          Ler a política de cookies
        </a>
      </div>
    </div>
  );
}
