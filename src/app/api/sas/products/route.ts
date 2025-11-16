
import { NextResponse } from 'next/server';
import { db } from '@/lib/prisma';
import * as handler from './handler';
export const dynamic = 'force-dynamic';
export async function GET() {
  try {
    const products = await db.product.findMany({
      select: { id: true, name: true, categoryId: true },
      orderBy: { name: 'asc' },
    });
    return NextResponse.json(products);
  } catch (err) {
    console.error('GET /api/sas/products error', err);
    return NextResponse.json({ error: 'Failed to load products' }, { status: 500 });
  }
}

// re-export POST/PUT from handler module so same route supports all verbs
export const POST = handler.POST;
export const PUT = handler.PUT;
