
import { NextResponse } from 'next/server';
import { db } from '@/lib/prisma';
export const dynamic = 'force-dynamic';
export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get('id');
    if (id) {
      const customer = await db.cUSTOMER.findUnique({ where: { id } });
      if (!customer) return NextResponse.json({ error: 'Not found' }, { status: 404 });
      return NextResponse.json(customer);
    }

    const list = await db.cUSTOMER.findMany({ orderBy: { name: 'asc' } });
    return NextResponse.json(list);
  } catch (err) {
    console.error('GET /api/sas/customers error', err);
    return NextResponse.json({ error: 'Failed to load customers' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { PrismaClient } = await import('@prisma/client');
    const prisma = new PrismaClient();
    const created = await prisma.cUSTOMER.create({
      data: {
        name: String(body.name || ''),
        email: String(body.email || ''),
        image: body.image ? String(body.image) : null,
        phone: body.phone ? String(body.phone) : null,
        streetAddress: body.streetAddress ? String(body.streetAddress) : null,
        postalCode: body.postalCode ? String(body.postalCode) : null,
        city: body.city ? String(body.city) : null,
        country: body.country ? String(body.country) : null,
      },
    });
    await prisma.$disconnect();
    return NextResponse.json(created, { status: 201 });
  } catch (err: unknown) {
    console.error('POST /api/sas/customers error', err);
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    if (!body.id) return NextResponse.json({ error: 'missing id' }, { status: 400 });
    const { PrismaClient } = await import('@prisma/client');
    const prisma = new PrismaClient();
    const updated = await prisma.cUSTOMER.update({
      where: { id: String(body.id) },
      data: {
        name: body.name ? String(body.name) : undefined,
        email: body.email ? String(body.email) : undefined,
        image: body.image ? String(body.image) : undefined,
        phone: body.phone ? String(body.phone) : undefined,
        streetAddress: body.streetAddress ? String(body.streetAddress) : undefined,
        postalCode: body.postalCode ? String(body.postalCode) : undefined,
        city: body.city ? String(body.city) : undefined,
        country: body.country ? String(body.country) : undefined,
      },
    });
    await prisma.$disconnect();
    return NextResponse.json(updated);
  } catch (err: unknown) {
    console.error('PUT /api/sas/customers error', err);
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message || 'Failed to update' }, { status: 500 });
  }
}
