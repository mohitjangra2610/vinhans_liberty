import { getStats } from '@/lib/apicalls/stats';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const stats = await getStats({
      source: 'server',
    });

    return NextResponse.json(stats);
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
}
