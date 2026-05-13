import { NextRequest } from "next/server";

/** CRA dev often uses 127.0.0.1 while ALLOW_ORIGIN is localhost — browser requires exact Origin echo. */
function isPublicSiteOrigin(origin: string | null, configured: string): origin is string {
  if (!origin) return false;
  if (origin === configured) return true;
  if (origin.startsWith("http://localhost:")) return true;
  if (origin.startsWith("http://127.0.0.1:")) return true;
  return false;
}

export function getAllowedOrigin(request: NextRequest) {
  const configured = process.env.ALLOW_ORIGIN || "http://localhost:3000";
  const origin = request.headers.get("origin");
  if (isPublicSiteOrigin(origin, configured)) {
    return origin;
  }
  return configured;
}

export function corsHeaders(request: NextRequest) {
  const origin = getAllowedOrigin(request);
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Credentials": "true",
  };
}

export function withCors(request: NextRequest, res: Response) {
  const h = corsHeaders(request);
  Object.entries(h).forEach(([k, v]) => res.headers.set(k, v));
  return res;
}
