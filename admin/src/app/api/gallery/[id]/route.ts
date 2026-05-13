import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";
import { galleryCreateSchema } from "@/lib/validations";
import { withCors } from "@/lib/cors";
import type { NextRequest } from "next/server";

type Params = { params: Promise<{ id: string }> };

export async function PUT(request: NextRequest, { params }: Params) {
  const admin = await getAdminSession();
  if (!admin) {
    return withCors(request, NextResponse.json({ error: "Unauthorized" }, { status: 401 }));
  }
  const { id } = await params;
  try {
    const body = await request.json();
    const parsed = galleryCreateSchema.partial().safeParse(body);
    if (!parsed.success) {
      return withCors(
        request,
        NextResponse.json({ error: parsed.error.flatten() }, { status: 400 }),
      );
    }
    const item = await prisma.gallery.update({ where: { id }, data: parsed.data });
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
    await prisma.gallery.delete({ where: { id } });
    return withCors(request, NextResponse.json({ ok: true }));
  } catch {
    return withCors(request, NextResponse.json({ error: "Not found" }, { status: 404 }));
  }
}
