import { NextResponse } from 'next/server';
import { mockEvolution } from '@nota-mil/shared/student';

export const runtime = 'nodejs';

export async function GET() {
  return NextResponse.json(mockEvolution);
}
