
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/server/auth";
export const dynamic = 'force-dynamic';
export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const url = new URL(req.url);
    const q = url.searchParams.get("q") || undefined;

    // try to load prisma dynamically
    const { PrismaClient } = await import("@prisma/client");
    const prisma = new PrismaClient();


    // تجاوز الصلاحيات: جلب جميع الشحنات بدون فلترة المستخدم
    const where: any = {};
    if (q) {
      where.hipno = { contains: q };
    }
    const shipments = await prisma.shipment.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: {
        product: true,
        category: true,
        unit: true,
        typeshiper: true,
        CUSTOMER: true,
        CUSTOMERship: true,
      },
    });

    await prisma.$disconnect();

    return NextResponse.json({ success: true, shipments });
  } catch (err) {
    return NextResponse.json({ error: "failed" }, { status: 500 });
  }
}
