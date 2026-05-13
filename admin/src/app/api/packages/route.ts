import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";
import { packageCreateSchema } from "@/lib/validations";
import { withCors } from "@/lib/cors";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category")?.trim();
  const where = category ? { category } : {};
  const items = await prisma.pujaPackage.findMany({
    where,
    orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
  });
  return withCors(request, NextResponse.json({ items }));
}

export async function POST(request: NextRequest) {
  const admin = await getAdminSession();
  if (!admin) {
    return withCors(request, NextResponse.json({ error: "Unauthorized" }, { status: 401 }));
  }
  try {
    const body = await request.json();
    const parsed = packageCreateSchema.safeParse(body);
    if (!parsed.success) {
      return withCors(
        request,
        NextResponse.json({ error: parsed.error.flatten() }, { status: 400 }),
      );
    }
    const item = await prisma.pujaPackage.create({
      data: {
        ...parsed.data,
        image: parsed.data.image ?? null,
        isFeatured: parsed.data.isFeatured ?? false,
      },
    });
    return withCors(request, NextResponse.json({ item }, { status: 201 }));
  } catch (e: unknown) {
    const msg = e && typeof e === "object" && "code" in e && (e as { code?: string }).code === "P2002";
    if (msg) {
      return withCors(request, NextResponse.json({ error: "Slug already exists" }, { status: 400 }));
    }
    return withCors(request, NextResponse.json({ error: "Server error" }, { status: 500 }));
  }
}
