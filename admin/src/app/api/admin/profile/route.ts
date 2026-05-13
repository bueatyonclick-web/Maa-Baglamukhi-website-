import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";
import { verifyPassword, hashPassword } from "@/lib/password";
import { z } from "zod";
import { withCors } from "@/lib/cors";
import type { NextRequest } from "next/server";

const patchSchema = z.object({
  name: z.string().min(1).optional(),
  currentPassword: z.string().optional(),
  newPassword: z.string().min(8).optional(),
});

export async function PATCH(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return withCors(request, NextResponse.json({ error: "Unauthorized" }, { status: 401 }));
  }
  try {
    const body = await request.json();
    const parsed = patchSchema.safeParse(body);
    if (!parsed.success) {
      return withCors(
        request,
        NextResponse.json({ error: parsed.error.flatten() }, { status: 400 }),
      );
    }
    const { name, currentPassword, newPassword } = parsed.data;
    if (newPassword) {
      if (!currentPassword) {
        return withCors(
          request,
          NextResponse.json({ error: "currentPassword required" }, { status: 400 }),
        );
      }
      const full = await prisma.admin.findUnique({ where: { id: session.id } });
      if (!full) {
        return withCors(request, NextResponse.json({ error: "Not found" }, { status: 404 }));
      }
      const ok = await verifyPassword(currentPassword, full.password);
      if (!ok) {
        return withCors(request, NextResponse.json({ error: "Invalid password" }, { status: 400 }));
      }
      const password = await hashPassword(newPassword);
      await prisma.admin.update({ where: { id: session.id }, data: { password, ...(name ? { name } : {}) } });
    } else if (name) {
      await prisma.admin.update({ where: { id: session.id }, data: { name } });
    }
    const admin = await prisma.admin.findUnique({
      where: { id: session.id },
      select: { id: true, name: true, email: true, createdAt: true },
    });
    return withCors(request, NextResponse.json({ admin }));
  } catch {
    return withCors(request, NextResponse.json({ error: "Server error" }, { status: 500 }));
  }
}
