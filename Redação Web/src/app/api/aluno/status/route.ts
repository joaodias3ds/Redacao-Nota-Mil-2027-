import { NextResponse } from 'next/server';
import { getEssayStatus } from '@/lib/server/essay-store';

export const runtime = 'nodejs';

export async function GET(req: Request) {
  const essayId = new URL(req.url).searchParams.get('essayId') || undefined;
  const essay = await getEssayStatus(essayId);
  return NextResponse.json(essay);
}
