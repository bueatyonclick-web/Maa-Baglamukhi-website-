import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";
import { packageCreateSchema } from "@/lib/validations";
import { withCors } from "@/lib/cors";
import type { NextRequest } from "next/server";

type Params = { params: Promise<{ id: string }> };

export async function GET(request: NextRequest, { params }: Params) {
  const { id } = await params;
  const item = await prisma.pujaPackage.findUnique({ where: { id } });
  if (!item) {
    return withCors(request, NextResponse.json({ error: "Not found" }, { status: 404 }));
  }
  return withCors(request, NextResponse.json({ item }));
}

export async function PUT(request: NextRequest, { params }: Params) {
  const admin = await getAdminSession();
  if (!admin) {
    return withCors(request, NextResponse.json({ error: "Unauthorized" }, { status: 401 }));
  }
  const { id } = await params;
  try {
    const body = await request.json();
    const parsed = packageCreateSchema.partial().safeParse(body);
    if (!parsed.success) {
      return withCors(
        request,
        NextResponse.json({ error: parsed.error.flatten() }, { status: 400 }),
      );
    }
    const data = Object.fromEntries(
      Object.entries(parsed.data).filter(([, v]) => v !== undefined && v !== null),
    ) as Record<string, unknown>;
    const item = await prisma.pujaPackage.update({
      where: { id },
      data,
    });
    return withCors(request, NextResponse.json({ item }));
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
    await prisma.pujaPackage.delete({ where: { id } });
    return withCors(request, NextResponse.json({ ok: true }));
  } catch {
    return withCors(request, NextResponse.json({ error: "Not found" }, { status: 404 }));
  }
}
