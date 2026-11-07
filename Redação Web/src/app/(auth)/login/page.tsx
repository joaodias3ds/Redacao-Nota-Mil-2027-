'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { apiRequest } from '@/lib/api';
import { getSupabase, roleHome } from '@/lib/supabase';
import { loginError } from '@/lib/validation';
import { Button, TextField, Card } from '@/components/ui';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    const invalid = loginError(email, password);
    if (invalid) {
      setError(invalid);
      return;
    }
    const supabase = getSupabase();
    if (!supabase) {
      setError('Configuração do Supabase ausente.');
      return;
    }
    setError('');
    setLoading(true);

    try {
      const { data: signed, error: authError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (authError || !signed.session) {
        setError('E-mail ou senha incorretos. Confira seus dados.');
        return;
      }

      const me = await apiRequest<{ data: { activeRole: string } }>('/v1/me', signed.session.access_token, '');
      router.push(roleHome[me.data.activeRole] ?? '/login');
    } catch {
      setError('Falha de conexão. Tente novamente.');
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
            style={{ width: 160, margin: '0 auto 16px', display: 'block' }}
          />
          <h1 style={{ fontSize: '1.5rem' }}>Acesso ao Sistema</h1>
          <p style={{ fontSize: '0.875rem' }}>Entre com suas credenciais para continuar</p>
        </div>

        <form onSubmit={handleLogin} className="form-grid">
          <TextField
            label="E-mail"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="seu.email@exemplo.com"
            required
            autoComplete="username"
          />

          <TextField
            label="Senha"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            autoComplete="current-password"
          />

          {error && <div className="error-banner">{error}</div>}

          <Button type="submit" variant="primary" loading={loading} fullWidth size="lg">
            Entrar
          </Button>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginTop: 8 }}>
            <Link href="/forgot-password">Esqueci minha senha</Link>
            <Link href="/enrollment">Fazer matrícula</Link>
          </div>
        </form>
      </Card>
    </main>
  );
}

