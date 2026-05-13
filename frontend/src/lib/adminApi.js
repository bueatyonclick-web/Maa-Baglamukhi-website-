/**
 * Next.js admin app (SQLite / Prisma) — public read + writes.
 * Set REACT_APP_ADMIN_API_URL e.g. http://127.0.0.1:3001
 */

export function getAdminApiOrigin() {
  const raw = process.env.REACT_APP_ADMIN_API_URL;
  if (!raw || typeof raw !== "string") return "";
  return raw.replace(/\/$/, "");
}

/** Turn `/uploads/x` or `http://...` into a browser-usable URL (CRA is on another port). */
export function resolveAdminAssetUrl(fileUrl) {
  if (!fileUrl) return "";
  if (fileUrl.startsWith("http://") || fileUrl.startsWith("https://")) return fileUrl;
  const base = getAdminApiOrigin();
  if (!base) return fileUrl;
  return `${base}${fileUrl.startsWith("/") ? "" : "/"}${fileUrl}`;
}

export async function fetchAdminJson(path) {
  const base = getAdminApiOrigin();
  if (!base) return null;
  try {
    const res = await fetch(`${base}${path.startsWith("/") ? path : `/${path}`}`, {
      method: "GET",
      mode: "cors",
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export async function postAdminJson(path, body) {
  const base = getAdminApiOrigin();
  if (!base) throw new Error("Admin API URL not configured");
  const res = await fetch(`${base}${path.startsWith("/") ? path : `/${path}`}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    mode: "cors",
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = data.error?.message || data.error || res.statusText;
    throw new Error(typeof msg === "string" ? msg : "Request failed");
  }
  return data;
}
