import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";
import { socialSettingsSchema } from "@/lib/validations";
import { withCors } from "@/lib/cors";
import type { NextRequest } from "next/server";

async function getOrCreate() {
  let row = await prisma.socialLinks.findFirst();
  if (!row) {
    row = await prisma.socialLinks.create({ data: {} });
  }
  return row;
}

export async function GET(request: NextRequest) {
  const social = await getOrCreate();
  return withCors(request, NextResponse.json({ social }));
}

export async function PUT(request: NextRequest) {
  const admin = await getAdminSession();
  if (!admin) {
    return withCors(request, NextResponse.json({ error: "Unauthorized" }, { status: 401 }));
  }
  try {
    const body = await request.json();
    const parsed = socialSettingsSchema.safeParse(body);
    if (!parsed.success) {
      return withCors(
        request,
        NextResponse.json({ error: parsed.error.flatten() }, { status: 400 }),
      );
    }
    const existing = await getOrCreate();
    const social = await prisma.socialLinks.update({
      where: { id: existing.id },
      data: parsed.data,
    });
    return withCors(request, NextResponse.json({ social }));
  } catch {
    return withCors(request, NextResponse.json({ error: "Server error" }, { status: 500 }));
  }
}
