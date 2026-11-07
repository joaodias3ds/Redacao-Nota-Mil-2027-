import { NextResponse } from 'next/server';
import { runWritingAssist } from '@/lib/server/writing-assist';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  const body = await req.json();
  const theme = String(body?.theme || '').trim();
  const text = String(body?.text || '');
  if (!theme) {
    return NextResponse.json({ error: 'theme é obrigatório' }, { status: 400 });
  }
  const result = await runWritingAssist(theme, text);
  return NextResponse.json(result);
}
