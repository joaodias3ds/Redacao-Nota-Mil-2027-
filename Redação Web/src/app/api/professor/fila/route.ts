import { NextResponse } from 'next/server';
import { listTeacherQueue } from '@/lib/server/teacher-store';

export const runtime = 'nodejs';

export async function GET() {
  const items = await listTeacherQueue();
  return NextResponse.json({ items });
}
