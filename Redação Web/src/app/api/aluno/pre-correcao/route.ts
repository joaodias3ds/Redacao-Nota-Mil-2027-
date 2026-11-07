import { NextResponse } from 'next/server';
import { getPreCorrection } from '@/lib/server/essay-store';

export const runtime = 'nodejs';

export async function GET(req: Request) {
  const essayId = new URL(req.url).searchParams.get('essayId') || undefined;
  const data = await getPreCorrection(essayId);
  return NextResponse.json(data);
}
