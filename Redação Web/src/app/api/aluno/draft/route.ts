import { NextResponse } from 'next/server';
import { getDraft, saveDraft } from '@/lib/server/draft-store';

export const runtime = 'nodejs';

export async function GET(req: Request) {
  const id = new URL(req.url).searchParams.get('id') || undefined;
  const draft = await getDraft(id);
  return NextResponse.json(draft);
}

export async function PUT(req: Request) {
  const body = await req.json();
  if (!body?.theme || typeof body.text !== 'string') {
    return NextResponse.json({ error: 'theme e text são obrigatórios' }, { status: 400 });
  }
  const draft = await saveDraft({
    id: body.id,
    theme: String(body.theme),
    text: String(body.text),
    linesUsed: Number(body.linesUsed) || 1,
    linesMax: body.linesMax ? Number(body.linesMax) : undefined,
    minRecommended: body.minRecommended ? Number(body.minRecommended) : undefined,
    savedRepertoireIds: Array.isArray(body.savedRepertoireIds) ? body.savedRepertoireIds : undefined,
  });
  return NextResponse.json(draft);
}
