import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { withCors } from "@/lib/cors";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const admin = await getAdminSession();
  if (!admin) {
    return withCors(request, NextResponse.json({ error: "Unauthorized" }, { status: 401 }));
  }
  return withCors(request, NextResponse.json({ admin }));
}
