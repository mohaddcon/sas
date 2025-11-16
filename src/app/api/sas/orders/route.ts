
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/server/auth";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const body = await req.json();
    const { PrismaClient } = await import("@prisma/client");
    const prisma = new PrismaClient();

    // Extract shipment fields from body
    const {
      shipno,
      pickupLocation,
      deliveryLocation,
      productId,
      categoryId,
      unitId,
      typeshiperId,
      loadDate,
      deliveryDate,
      goodsCost,
      price,
      customerId,
      status,
      userId,
      shipperId,
    } = body;

    // Create shipment
    const shipment = await prisma.shipment.create({
      data: {
        shipno: hipno,
        pickupLocation,
        deliveryLocation,
        productId,
        categoryId,
        unitid: unitId,
        typeshiperid: typeshiperId,
        loadDate: loadDate ? new Date(loadDate) : undefined,
        deliveryDate: deliveryDate ? new Date(deliveryDate) : undefined,
        goodsCost,
        price,
        CUSTOMER_id: customerId,
        STATE: status ? [status] : [],
        userId: shipperId || userId || (session?.user?.id ?? undefined),
      },
    });

    await prisma.$disconnect();
    return NextResponse.json({ success: true, shipment });
  } catch (err) {
    return NextResponse.json({ error: "failed to create shipment" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const body = await req.json();
    const { PrismaClient } = await import("@prisma/client");
    const prisma = new PrismaClient();

    const {
      id,
      shipno,
      pickupLocation,
      deliveryLocation,
      productId,
      categoryId,
      unitId,
      typeshiperId,
      loadDate,
      deliveryDate,
      goodsCost,
      price,
      customerId,
      status,
      userId,
      shipperId,
    } = body;

    const shipment = await prisma.shipment.update({
      where: { id },
      data: {
        shipno: hipno,
        pickupLocation,
        deliveryLocation,
        productId,
        categoryId,
        unitid: unitId,
        typeshiperid: typeshiperId,
        loadDate: loadDate ? new Date(loadDate) : undefined,
        deliveryDate: deliveryDate ? new Date(deliveryDate) : undefined,
        goodsCost,
        price,
        CUSTOMER_id: customerId,
        STATE: status ? [status] : [],
        userId: shipperId || userId || (session?.user?.id ?? undefined),
      },
    });

    await prisma.$disconnect();
    return NextResponse.json({ success: true, shipment });
  } catch (err) {
    return NextResponse.json({ error: "failed to update shipment" }, { status: 500 });
  }
}
