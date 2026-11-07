'use client';

import { useEffect, useState } from 'react';
import { apiRequest, type Person } from '@/lib/api';
import { usePortal, type ClassRow } from '@/components/portal/use-portal';
import { classGroupError } from '@/lib/validation';

export default function ClassesPage() {
  const portal = usePortal(['ADMIN']);
  const [classes, setClasses] = useState<ClassRow[]>([]);
  const [teachers, setTeachers] = useState<Person[]>([]);
  const [name, setName] = useState('');
  const [teacherId, setTeacherId] = useState('');
  const [capacity, setCapacity] = useState('');
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  async function load(token: string) {
    const [groupResult, peopleResult] = await Promise.all([
      apiRequest<{ data: ClassRow[] }>('/v1/class-groups', token, 'ADMIN'),
      apiRequest<{ data: Person[] }>('/v1/people?limit=50', token, 'ADMIN'),
    ]);
    setClasses(groupResult.data);
    setTeachers(peopleResult.data.filter((person) => person.roles.includes('PROFESSOR')));
  }

  useEffect(() => {
    if (!portal.data) return;
    void load(portal.data.token).catch((cause) => setError(cause instanceof Error ? cause.message : 'Não foi possível carregar as turmas.'));
  }, [portal.data?.token]);

  async function createClass(event: React.FormEvent) {
    event.preventDefault();
    if (!portal.data) return;
    const invalid = classGroupError(name, teacherId, capacity);
    if (invalid) {
      setError(invalid);
      return;
    }
    setError('');
    setNotice('');
    try {
      await apiRequest('/v1/class-groups', portal.data.token, 'ADMIN', {
        method: 'POST',
        body: JSON.stringify({ name: name.trim(), teacherId, capacity: Number(capacity) }),
      });
      setName('');
      setCapacity('');
      setNotice('Turma cadastrada.');
      await load(portal.data.token);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Não foi possível criar a turma.');
    }
  }

  return (
    <>
      <div className="topbar-header">
        <div>
          <p className="eyebrow">Secretaria</p>
          <h1>Turmas</h1>
        </div>
      </div>
      {portal.loading && <p>Carregando a área…</p>}
      {portal.error && <p className="error" role="alert">{portal.error}</p>}
      {portal.data && (
        <section className="card">
          <h2>Nova turma</h2>
          <p>Cada turma fica com um professor. Esse professor passa a ver só os alunos dela.</p>
          <form className="form-grid" onSubmit={createClass}>
            <label>Nome<input value={name} onChange={(event) => setName(event.target.value)} maxLength={120} /></label>
            <label>Professor
              <select value={teacherId} onChange={(event) => setTeacherId(event.target.value)}>
                <option value="">Selecione</option>
                {teachers.map((person) => <option key={person.id} value={person.id}>{person.name}</option>)}
              </select>
            </label>
            <label>Capacidade<input inputMode="numeric" value={capacity} onChange={(event) => setCapacity(event.target.value)} /></label>
            <button className="primary" type="submit">Cadastrar turma</button>
          </form>
          {error && <p className="error" role="alert">{error}</p>}
          {notice && <p className="success" role="status">{notice}</p>}
          {classes.length === 0 ? <p>Nenhuma turma cadastrada.</p> : (
            <ul className="record-list">
              {classes.map((group) => {
                const teacher = teachers.find((person) => person.id === group.teacherId);
                return (
                  <li key={group.id}>
                    <div>
                      <strong>{group.name}</strong>
                      <small>{teacher ? teacher.name : 'Professor não está nesta página'} · {group.capacity ?? 'sem capacidade'} vagas</small>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      )}
    </>
  );
}
