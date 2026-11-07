'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { EssayDraft, WritingAssistResult } from '@nota-mil/shared/student';
import { PhoneShell } from '@/components/aluno/PhoneShell';
import { countEssayLines, studentApi } from '@/lib/student-api';

export default function EditorPage() {
  const router = useRouter();
  const [draft, setDraft] = useState<EssayDraft | null>(null);
  const [text, setText] = useState('');
  const [savedLabel, setSavedLabel] = useState('Carregando…');
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const [assist, setAssist] = useState<WritingAssistResult | null>(null);
  const [assistLoading, setAssistLoading] = useState(false);
  const [assistError, setAssistError] = useState<string | null>(null);

  const lines = useMemo(() => countEssayLines(text), [text]);

  useEffect(() => {
    let alive = true;
    studentApi
      .getDraft()
      .then((d) => {
        if (!alive || !d) return;
        setDraft(d);
        setText(d.text);
        setSavedLabel(d.savedLabel);
      })
      .catch(() => {
        if (alive) setSavedLabel('Falha ao carregar');
      });
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    if (!draft) return;
    const handle = setTimeout(() => {
      studentApi
        .saveDraft({
          id: draft.id,
          theme: draft.theme,
          text,
          linesUsed: Math.min(lines, draft.linesMax),
          linesMax: draft.linesMax,
          minRecommended: draft.minRecommended,
          savedRepertoireIds: draft.savedRepertoireIds,
        })
        .then((saved) => setSavedLabel(saved.savedLabel))
        .catch(() => setSavedLabel('Erro ao salvar'));
    }, 700);
    return () => clearTimeout(handle);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, lines, draft?.id]);

  const askAssist = useCallback(async () => {
    if (!draft) return;
    setAssistLoading(true);
    setAssistError(null);
    try {
      setAssist(await studentApi.writingAssist({ theme: draft.theme, text }));
    } catch (e) {
      setAssistError(e instanceof Error ? e.message : 'Falha na IA auxiliar');
    } finally {
      setAssistLoading(false);
    }
  }, [draft, text]);

  const send = useCallback(async () => {
    if (!draft || sending) return;
    setSending(true);
    setSendError(null);
    try {
      const result = await studentApi.sendEssay({
        draftId: draft.id,
        theme: draft.theme,
        text,
        linesUsed: Math.min(lines, draft.linesMax),
      });
      router.push(`/aluno/status?essayId=${encodeURIComponent(result.essay.id)}`);
    } catch (e) {
      setSendError(e instanceof Error ? e.message : 'Falha ao enviar');
      setSending(false);
    }
  }, [draft, sending, text, lines, router]);

  if (!draft) {
    return (
      <PhoneShell showNav={false}>
        <p className="aluno-muted">{savedLabel}</p>
      </PhoneShell>
    );
  }

  return (
    <PhoneShell showNav={false}>
      <div className="aluno-row">
        <Link className="aluno-btn ghost" href="/aluno/hoje">
          Voltar
        </Link>
        <p className="aluno-muted">{savedLabel}</p>
        <button type="button" className="aluno-btn" onClick={send} disabled={sending}>
          {sending ? 'Enviando…' : 'Enviar'}
        </button>
      </div>
      {sendError ? <p className="aluno-muted">{sendError}</p> : null}
      <h1 className="aluno-title">Nova redação</h1>
      <p className="aluno-overline">Tema</p>
      <p className="aluno-body" style={{ fontWeight: 600 }}>
        {draft.theme}
      </p>
      <p className="aluno-overline">Seu texto</p>
      <textarea
        className="aluno-textarea"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Escreva sua redação aqui"
      />
      <p className="aluno-muted">
        {Math.min(lines, draft.linesMax)} de {draft.linesMax} linhas · Mínimo recomendado:{' '}
        {draft.minRecommended} linhas
      </p>

      <section className="aluno-assist">
        <div className="aluno-row" style={{ marginBottom: 8 }}>
          <p className="aluno-overline" style={{ margin: 0 }}>
            IA auxiliar (estrutura)
          </p>
          <button type="button" className="aluno-btn" onClick={askAssist} disabled={assistLoading}>
            {assistLoading ? 'Analisando…' : 'Pedir dicas'}
          </button>
        </div>
        <p className="aluno-muted" style={{ marginBottom: 8 }}>
          Orienta a estrutura do curso. A nota estimada só aparece depois do envio.
        </p>
        {assistError ? <p className="aluno-muted">{assistError}</p> : null}
        {assist ? (
          <div className="aluno-assist-body">
            <p className="aluno-body" style={{ fontWeight: 600 }}>
              {assist.structure.summary}
            </p>
            <ul className="aluno-assist-flags">
              <li data-on={assist.structure.hasContext}>Contexto</li>
              <li data-on={assist.structure.hasThesis}>Tese</li>
              <li data-on={assist.structure.hasDevelopment}>Desenvolvimento</li>
              <li data-on={assist.structure.hasIntervention}>Intervenção</li>
            </ul>
            {assist.tips.map((tip) => (
              <article key={`${tip.area}-${tip.title}`} className="aluno-card" style={{ gap: 4 }}>
                <p className="aluno-overline">{tip.area}</p>
                <p className="aluno-body" style={{ fontWeight: 700 }}>
                  {tip.title}
                </p>
                <p className="aluno-muted">{tip.body}</p>
              </article>
            ))}
            <p className="aluno-muted">{assist.encouragement}</p>
          </div>
        ) : null}
      </section>

      <Link href="/aluno/feed" className="aluno-card" style={{ background: '#fff0f8', textDecoration: 'none' }}>
        <p className="aluno-body" style={{ fontWeight: 700 }}>
          Repertório que você salvou
        </p>
        <p className="aluno-muted" style={{ color: '#d1007b', fontWeight: 600 }}>
          Ver salvos no feed
        </p>
      </Link>
    </PhoneShell>
  );
}
