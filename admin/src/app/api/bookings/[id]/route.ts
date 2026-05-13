import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";
import { bookingUpdateSchema } from "@/lib/validations";
import { withCors } from "@/lib/cors";
import type { NextRequest } from "next/server";

type Params = { params: Promise<{ id: string }> };

export async function GET(request: NextRequest, { params }: Params) {
  const admin = await getAdminSession();
  if (!admin) {
    return withCors(request, NextResponse.json({ error: "Unauthorized" }, { status: 401 }));
  }
  const { id } = await params;
  const booking = await prisma.booking.findUnique({
    where: { id },
    include: { package: true },
  });
  if (!booking) {
    return withCors(request, NextResponse.json({ error: "Not found" }, { status: 404 }));
  }
  return withCors(request, NextResponse.json({ booking }));
}

export async function PUT(request: NextRequest, { params }: Params) {
  const admin = await getAdminSession();
  if (!admin) {
    return withCors(request, NextResponse.json({ error: "Unauthorized" }, { status: 401 }));
  }
  const { id } = await params;
  try {
    const body = await request.json();
    const parsed = bookingUpdateSchema.safeParse(body);
    if (!parsed.success) {
      return withCors(
        request,
        NextResponse.json({ error: parsed.error.flatten() }, { status: 400 }),
      );
    }
    const data: Record<string, unknown> = { ...parsed.data };
    if (parsed.data.bookingDate) {
      const dt = new Date(parsed.data.bookingDate);
      if (Number.isNaN(dt.getTime())) {
        return withCors(request, NextResponse.json({ error: "Invalid date" }, { status: 400 }));
      }
      data.bookingDate = dt;
    }
    const booking = await prisma.booking.update({
      where: { id },
      data,
      include: { package: true },
    });
    return withCors(request, NextResponse.json({ booking }));
  } catch {
    return withCors(request, NextResponse.json({ error: "Not found" }, { status: 404 }));
  }
}

export async function DELETE(request: NextRequest, { params }: Params) {
  const admin = await getAdminSession();
  if (!admin) {
    return withCors(request, NextResponse.json({ error: "Unauthorized" }, { status: 401 }));
  }
  const { id } = await params;
  try {
    await prisma.booking.delete({ where: { id } });
    return withCors(request, NextResponse.json({ ok: true }));
  } catch {
    return withCors(request, NextResponse.json({ error: "Not found" }, { status: 404 }));
  }
}
