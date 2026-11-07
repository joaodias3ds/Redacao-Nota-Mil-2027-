'use client';

import { useState } from 'react';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';
import { Button, TextField, Card } from '@/components/ui';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = url && key ? createClient(url, key) : null;

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);

  async function handleReset(e: React.FormEvent) {
    e.preventDefault();
    if (!supabase) return;
    setError('');
    setLoading(true);

    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/callback?next=/admin/dashboard`,
      });

      if (resetError) {
        setError('Não foi possível enviar o e-mail de recuperação.');
        return;
      }

      setSent(true);
    } catch {
      setError('Erro ao processar solicitação.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="center-layout">
      <Card style={{ width: '100%', maxWidth: 420 }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <img
            src="/brand/logo-redacao-1000.png"
            alt="Redação Nota Mil"
            style={{ width: 140, margin: '0 auto 16px', display: 'block' }}
          />
          <h1 style={{ fontSize: '1.35rem' }}>Recuperação de Senha</h1>
          <p style={{ fontSize: '0.875rem' }}>
            Informe seu e-mail cadastrado para receber as instruções de redefinição.
          </p>
        </div>

        {sent ? (
          <div className="form-grid">
            <div className="success-banner">
              Enviamos um link de recuperação para <strong>{email}</strong>. Confira sua caixa de entrada e spam.
            </div>
            <Link href="/login">
              <Button variant="secondary" fullWidth>
                Voltar para o login
              </Button>
            </Link>
          </div>
        ) : (
          <form onSubmit={handleReset} className="form-grid">
            <TextField
              label="E-mail"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu.email@exemplo.com"
              required
            />

            {error && <div className="error-banner">{error}</div>}

            <Button type="submit" variant="primary" loading={loading} fullWidth size="lg">
              Enviar Link de Redefinição
            </Button>

            <div style={{ textAlign: 'center', fontSize: '0.875rem', marginTop: 8 }}>
              <Link href="/login">Lembrou sua senha? Entrar</Link>
            </div>
          </form>
        )}
      </Card>
    </main>
  );
}

