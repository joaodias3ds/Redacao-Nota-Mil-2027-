import { NextResponse } from 'next/server';
import { mockToday } from '@nota-mil/shared/student';
import { getDraft } from '@/lib/server/draft-store';

export const runtime = 'nodejs';

export async function GET() {
  const draft = await getDraft();
  return NextResponse.json({
    ...mockToday,
    draft,
  });
}
