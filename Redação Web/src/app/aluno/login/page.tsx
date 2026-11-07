import Link from 'next/link';
import { PhoneShell } from '@/components/aluno/PhoneShell';

export default function LoginPage() {
  return (
    <PhoneShell showNav={false}>
      <h1 className="aluno-title">Entrar</h1>
      <p className="aluno-body" style={{ color: '#57585a' }}>
        Use o e-mail do convite que o curso enviou para você.
      </p>
      <label className="aluno-muted" htmlFor="email">
        E-mail
      </label>
      <input id="email" className="aluno-input" type="email" placeholder="nome@email.com" />
      <label className="aluno-muted" htmlFor="senha">
        Senha
      </label>
      <input id="senha" className="aluno-input" type="password" placeholder="Sua senha" />
      <button type="button" className="aluno-btn ghost" style={{ alignSelf: 'flex-start' }}>
        Esqueci minha senha
      </button>
      <Link className="aluno-btn" href="/aluno/hoje">
        Entrar
      </Link>
      <p className="aluno-muted">
        Tem menos de 18 anos? Seu responsável precisa aceitar os termos antes do seu primeiro acesso.
        Coletamos só o necessário.
      </p>
      <p className="aluno-muted">Não tem convite? Fale com a secretaria do seu curso.</p>
    </PhoneShell>
  );
}
