import { NextResponse } from 'next/server';
import { mockToday } from '@nota-mil/shared/student';
import { getDraft } from '@/lib/server/draft-store';
import { getEssayStatus } from '@/lib/server/essay-store';

export const runtime = 'nodejs';

export async function GET() {
  const draft = await getDraft();
  const lastEssay = await getEssayStatus();
  return NextResponse.json({
    ...mockToday,
    draft,
    lastEssay: lastEssay.status === 'draft' ? mockToday.lastEssay : lastEssay,
  });
}
