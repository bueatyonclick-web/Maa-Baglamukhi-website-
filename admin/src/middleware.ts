import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const COOKIE = "admin_token";

function corsFor(request: NextRequest) {
  const allow = process.env.ALLOW_ORIGIN || "http://localhost:3000";
  const origin = request.headers.get("origin");
  const match =
    origin &&
    (origin === allow ||
      origin.startsWith("http://localhost:") ||
      origin.startsWith("http://127.0.0.1:"));
  const acOrigin = match ? origin : allow;
  return {
    "Access-Control-Allow-Origin": acOrigin,
    "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Credentials": "true",
  };
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (pathname.startsWith("/api")) {
    const cors = corsFor(request);
    if (request.method === "OPTIONS") {
      return new NextResponse(null, { status: 204, headers: cors });
    }
    const res = NextResponse.next();
    Object.entries(cors).forEach(([k, v]) => res.headers.set(k, v));
    return res;
  }

  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    const token = request.cookies.get(COOKIE)?.value;
    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
    try {
      const secret = process.env.JWT_SECRET;
      if (!secret) throw new Error("no secret");
      await jwtVerify(token, new TextEncoder().encode(secret));
    } catch {
      const r = NextResponse.redirect(new URL("/admin/login", request.url));
      r.cookies.delete(COOKIE);
      return r;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*", "/api/:path*"],
};
