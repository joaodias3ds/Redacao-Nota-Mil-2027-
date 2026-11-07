import Link from 'next/link';
import { PhoneShell } from '@/components/aluno/PhoneShell';
import { mockStudentName } from '@/lib/student-mock';

export default function PerfilPage() {
  return (
    <PhoneShell>
      <h1 className="aluno-title">Perfil</h1>
      <section className="aluno-card">
        <h2 className="aluno-title" style={{ fontSize: 18 }}>
          {mockStudentName}
        </h2>
        <p className="aluno-muted">Aluna · Redação ENEM</p>
        <p className="aluno-body">Preferências, notificações e privacidade entram na próxima etapa.</p>
      </section>
      <Link className="aluno-btn secondary" href="/aluno/status">
        Ver status da última redação
      </Link>
      <Link className="aluno-btn" href="/aluno/login">
        Sair
      </Link>
    </PhoneShell>
  );
}
