import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";
import { messageCreateSchema } from "@/lib/validations";
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
  const where = q
    ? {
        OR: [
          { name: { contains: q } },
          { email: { contains: q } },
          { message: { contains: q } },
        ],
      }
    : {};
  const [total, items] = await Promise.all([
    prisma.contactMessage.count({ where }),
    prisma.contactMessage.findMany({
      where,
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
    const parsed = messageCreateSchema.safeParse(body);
    if (!parsed.success) {
      return withCors(
        request,
        NextResponse.json({ error: parsed.error.flatten() }, { status: 400 }),
      );
    }
    const msg = await prisma.contactMessage.create({ data: parsed.data });
    return withCors(request, NextResponse.json({ message: msg }, { status: 201 }));
  } catch {
    return withCors(request, NextResponse.json({ error: "Server error" }, { status: 500 }));
  }
}
