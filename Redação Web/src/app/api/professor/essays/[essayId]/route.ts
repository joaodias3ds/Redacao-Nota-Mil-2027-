import { NextResponse } from 'next/server';
import { getTeacherEssay, reviewEssay } from '@/lib/server/teacher-store';

export const runtime = 'nodejs';

type Ctx = { params: Promise<{ essayId: string }> };

export async function GET(_req: Request, ctx: Ctx) {
  const { essayId } = await ctx.params;
  const detail = await getTeacherEssay(essayId);
  return NextResponse.json(detail);
}

export async function POST(req: Request, ctx: Ctx) {
  const { essayId } = await ctx.params;
  const body = await req.json();
  const action = body?.action === 'return' ? 'return' : 'publish';
  const competencies = Array.isArray(body?.competencies) ? body.competencies : [];
  if (!competencies.length && action === 'publish') {
    return NextResponse.json({ error: 'competencies obrigatórias para publicar' }, { status: 400 });
  }
  const result = await reviewEssay(essayId, {
    action,
    competencies,
    teacherNote: body?.teacherNote ? String(body.teacherNote) : '',
  });
  return NextResponse.json(result);
}
