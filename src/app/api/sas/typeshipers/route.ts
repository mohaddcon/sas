import { NextResponse } from 'next/server';
import { db } from '@/lib/prisma';
export const dynamic = 'force-dynamic';
export async function GET() {
  try {
    const typeshipers = await db.typeshiper.findMany({ select: { id: true, name: true }, orderBy: { name: 'asc' } });
    return NextResponse.json(typeshipers);
  } catch (err) {
    console.error('GET /api/sas/typeshipers error', err);
    return NextResponse.json({ error: 'Failed to load typeshipers' }, { status: 500 });
  }
}
