import { NextResponse } from 'next/server';
import { mockPreCorrection } from '@nota-mil/shared/student';

export const runtime = 'nodejs';

export async function GET(req: Request) {
  const essayId = new URL(req.url).searchParams.get('essayId') || mockPreCorrection.essayId;
  return NextResponse.json({ ...mockPreCorrection, essayId });
}
