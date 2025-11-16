import { NextResponse } from 'next/server';
import { db } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const created = await db.product.create({
      data: {
        name: String(body.name || ''),
        description: String(body.description || ''),
        image: body.image ? String(body.image) : '',
        basePrice: body.basePrice ? parseFloat(String(body.basePrice)) : 0,
        category: { connect: { id: String(body.categoryId) } },
      },
    });
    return NextResponse.json(created, { status: 201 });
  } catch (err) {
    console.error('POST /api/sas/products error', err);
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    if (!body.id) return NextResponse.json({ error: 'missing id' }, { status: 400 });
    const updated = await db.product.update({
      where: { id: String(body.id) },
      data: {
        name: body.name ? String(body.name) : undefined,
        description: body.description ? String(body.description) : undefined,
        image: body.image ? String(body.image) : undefined,
        basePrice: body.basePrice ? parseFloat(String(body.basePrice)) : undefined,
        category: body.categoryId ? { connect: { id: String(body.categoryId) } } : undefined,
      },
    });
    return NextResponse.json(updated);
  } catch (err) {
    console.error('PUT /api/sas/products error', err);
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  }
}
