import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { getAdminSession } from "@/lib/auth";
import { withCors } from "@/lib/cors";
import type { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const admin = await getAdminSession();
  if (!admin) {
    return withCors(request, NextResponse.json({ error: "Unauthorized" }, { status: 401 }));
  }
  try {
    const form = await request.formData();
    const file = form.get("file");
    if (!file || !(file instanceof Blob)) {
      return withCors(request, NextResponse.json({ error: "No file" }, { status: 400 }));
    }
    const buf = Buffer.from(await file.arrayBuffer());
    const orig = (file as File).name || "upload";
    const ext = path.extname(orig) || ".bin";
    const name = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}${ext}`;
    const dir = path.join(process.cwd(), "public", "uploads");
    await mkdir(dir, { recursive: true });
    const full = path.join(dir, name);
    await writeFile(full, buf);
    const url = `/uploads/${name}`;
    return withCors(request, NextResponse.json({ url }));
  } catch {
    return withCors(request, NextResponse.json({ error: "Upload failed" }, { status: 500 }));
  }
}
