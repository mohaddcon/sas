
import { NextResponse } from 'next/server';
import { db } from '@/lib/prisma';
export const dynamic = 'force-dynamic';
export async function GET() {
  try {
    const categories = await db.category.findMany({ select: { id: true, name: true }, orderBy: { name: 'asc' } });
    return NextResponse.json(categories);
  } catch (err) {
    console.error('GET /api/sas/categories error', err);
    return NextResponse.json({ error: 'Failed to load categories' }, { status: 500 });
  }
}
