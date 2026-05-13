import { cookies } from "next/headers";
import { prisma } from "./prisma";
import { verifyAdminToken } from "./jwt";

const COOKIE = "admin_token";

export async function getAdminSession() {
  const token = cookies().get(COOKIE)?.value;
  if (!token) return null;
  try {
    const { sub } = await verifyAdminToken(token);
    const admin = await prisma.admin.findUnique({
      where: { id: sub },
      select: { id: true, name: true, email: true, createdAt: true },
    });
    return admin;
  } catch {
    return null;
  }
}

export async function requireAdminSession() {
  const admin = await getAdminSession();
  if (!admin) {
    return { error: "Unauthorized", status: 401 as const };
  }
  return { admin };
}

export function adminCookieName() {
  return COOKIE;
}
