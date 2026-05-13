import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";
import { contactSettingsSchema } from "@/lib/validations";
import { withCors } from "@/lib/cors";
import type { NextRequest } from "next/server";

async function getOrCreate() {
  let row = await prisma.contactSettings.findFirst();
  if (!row) {
    row = await prisma.contactSettings.create({
      data: {
        templeName: "Shree Maa Baglamukhi Siddha Peeth",
        address: "",
        phone1: "",
        email: "info@example.com",
      },
    });
  }
  return row;
}

export async function GET(request: NextRequest) {
  const settings = await getOrCreate();
  return withCors(request, NextResponse.json({ settings }));
}

export async function PUT(request: NextRequest) {
  const admin = await getAdminSession();
  if (!admin) {
    return withCors(request, NextResponse.json({ error: "Unauthorized" }, { status: 401 }));
  }
  try {
    const body = await request.json();
    const parsed = contactSettingsSchema.safeParse(body);
    if (!parsed.success) {
      return withCors(
        request,
        NextResponse.json({ error: parsed.error.flatten() }, { status: 400 }),
      );
    }
    const existing = await getOrCreate();
    const settings = await prisma.contactSettings.update({
      where: { id: existing.id },
      data: parsed.data,
    });
    return withCors(request, NextResponse.json({ settings }));
  } catch {
    return withCors(request, NextResponse.json({ error: "Server error" }, { status: 500 }));
  }
}
