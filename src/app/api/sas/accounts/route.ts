
import { NextResponse } from 'next/server';
import { db } from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export async function GET() {
  try {
    const accounts = await db.account.findMany({ select: { id: true, provider: true, providerAccountId: true, userId: true }, orderBy: { provider: 'asc' } });
    return NextResponse.json(accounts);
  } catch (err) {
    console.error('GET /api/sas/accounts error', err);
    return NextResponse.json({ error: 'Failed to load accounts' }, { status: 500 });
  }
}
