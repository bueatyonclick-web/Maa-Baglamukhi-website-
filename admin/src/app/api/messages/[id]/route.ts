import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";
import { withCors } from "@/lib/cors";
import type { NextRequest } from "next/server";

type Params = { params: Promise<{ id: string }> };

export async function PATCH(request: NextRequest, { params }: Params) {
  const admin = await getAdminSession();
  if (!admin) {
    return withCors(request, NextResponse.json({ error: "Unauthorized" }, { status: 401 }));
  }
  const { id } = await params;
  try {
    const body = await request.json();
    const isRead = Boolean(body.isRead);
    const msg = await prisma.contactMessage.update({
      where: { id },
      data: { isRead },
    });
    return withCors(request, NextResponse.json({ message: msg }));
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
    await prisma.contactMessage.delete({ where: { id } });
    return withCors(request, NextResponse.json({ ok: true }));
  } catch {
    return withCors(request, NextResponse.json({ error: "Not found" }, { status: 404 }));
  }
}
