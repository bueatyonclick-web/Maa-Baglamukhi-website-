import { NextResponse } from "next/server";
import { adminAuthCookieBase } from "@/lib/authCookie";
import { withCors } from "@/lib/cors";
import type { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const res = NextResponse.json({ ok: true });
  res.cookies.set("admin_token", "", { ...adminAuthCookieBase(), maxAge: 0 });
  return withCors(request, res);
}
