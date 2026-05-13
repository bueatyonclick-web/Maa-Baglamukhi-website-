import { NextResponse } from "next/server";
import { withCors } from "@/lib/cors";
import type { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const res = NextResponse.json({ ok: true });
  res.cookies.set("admin_token", "", { httpOnly: true, path: "/", maxAge: 0 });
  return withCors(request, res);
}
