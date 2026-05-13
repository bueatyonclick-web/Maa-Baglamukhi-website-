import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";
import { bookingCreateSchema } from "@/lib/validations";
import { withCors } from "@/lib/cors";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const admin = await getAdminSession();
  if (!admin) {
    return withCors(request, NextResponse.json({ error: "Unauthorized" }, { status: 401 }));
  }
  const { searchParams } = new URL(request.url);
  const page = Math.max(1, Number(searchParams.get("page") || 1));
  const limit = Math.min(50, Math.max(1, Number(searchParams.get("limit") || 20)));
  const q = searchParams.get("search")?.trim();
  const status = searchParams.get("status")?.trim();
  const where: Record<string, unknown> = {};
  if (status) where.status = status;
  if (q) {
    where.OR = [
      { userName: { contains: q } },
      { email: { contains: q } },
      { phone: { contains: q } },
    ];
  }
  const [total, items] = await Promise.all([
    prisma.booking.count({ where }),
    prisma.booking.findMany({
      where,
      include: { package: true },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
  ]);
  return withCors(
    request,
    NextResponse.json({ items, total, page, limit, pages: Math.ceil(total / limit) || 1 }),
  );
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = bookingCreateSchema.safeParse(body);
    if (!parsed.success) {
      return withCors(
        request,
        NextResponse.json({ error: parsed.error.flatten() }, { status: 400 }),
      );
    }
    const d = parsed.data;
    const pkg = await prisma.pujaPackage.findUnique({ where: { id: d.packageId } });
    if (!pkg) {
      return withCors(request, NextResponse.json({ error: "Package not found" }, { status: 400 }));
    }
    const bookingDate = new Date(d.bookingDate);
    if (Number.isNaN(bookingDate.getTime())) {
      return withCors(request, NextResponse.json({ error: "Invalid date" }, { status: 400 }));
    }
    const booking = await prisma.booking.create({
      data: {
        userName: d.userName,
        email: d.email,
        phone: d.phone,
        address: d.address,
        packageId: d.packageId,
        bookingDate,
        status: "PENDING",
        paymentStatus: "PENDING",
      },
      include: { package: true },
    });
    return withCors(request, NextResponse.json({ booking }, { status: 201 }));
  } catch {
    return withCors(request, NextResponse.json({ error: "Server error" }, { status: 500 }));
  }
}
