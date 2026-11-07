import { NextResponse } from 'next/server';
import { getOfficialGrade } from '@/lib/server/essay-store';

export const runtime = 'nodejs';

export async function GET(req: Request) {
  const essayId = new URL(req.url).searchParams.get('essayId') || undefined;
  const data = await getOfficialGrade(essayId);
  if (!data) {
    return NextResponse.json({ error: 'Nota oficial ainda não publicada' }, { status: 404 });
  }
  return NextResponse.json(data);
}
