import { NextResponse } from 'next/server';
import { sendEssay } from '@/lib/server/essay-store';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  const body = await req.json();
  const theme = String(body?.theme || '').trim();
  const text = String(body?.text || '');
  if (!theme) {
    return NextResponse.json({ error: 'theme é obrigatório' }, { status: 400 });
  }
  if (text.trim().length < 40) {
    return NextResponse.json(
      { error: 'Escreva um pouco mais antes de enviar (mínimo ~40 caracteres).' },
      { status: 400 },
    );
  }

  const result = await sendEssay({
    draftId: body.draftId ? String(body.draftId) : undefined,
    theme,
    text,
    linesUsed: Number(body.linesUsed) || 1,
  });

  return NextResponse.json(result);
}
