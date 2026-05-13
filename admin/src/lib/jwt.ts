import { SignJWT, jwtVerify } from "jose";

function getSecret() {
  const s = process.env.JWT_SECRET;
  if (!s || s.length < 16) throw new Error("JWT_SECRET must be set (min 16 chars)");
  return new TextEncoder().encode(s);
}

export type AdminJwtPayload = { sub: string; email: string };

export async function signAdminToken(payload: AdminJwtPayload) {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(process.env.JWT_EXPIRES_IN || "7d")
    .setIssuedAt()
    .sign(getSecret());
}

export async function verifyAdminToken(token: string): Promise<AdminJwtPayload> {
  const { payload } = await jwtVerify(token, getSecret());
  return {
    sub: String(payload.sub),
    email: String(payload.email),
  };
}
