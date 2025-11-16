
import { NextResponse } from 'next/server';
import { db } from '@/lib/prisma';
export const dynamic = 'force-dynamic';
export async function GET() {
  try {
    const units = await db.unit.findMany({ select: { id: true, nameunit: true }, orderBy: { nameunit: 'asc' } });
    return NextResponse.json(units);
  } catch (err) {
    console.error('GET /api/sas/units error', err);
    return NextResponse.json({ error: 'Failed to load units' }, { status: 500 });
  }
}
