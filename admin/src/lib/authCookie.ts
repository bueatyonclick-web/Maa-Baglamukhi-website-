/**
 * Admin JWT cookie options.
 * In production over plain HTTP (e.g. IP address), `Secure` cookies are dropped by browsers.
 * Set AUTH_COOKIE_SECURE=true only when the admin site is served over HTTPS.
 */
export function adminAuthCookieBase() {
  const env = process.env.NODE_ENV;
  const explicit = process.env.AUTH_COOKIE_SECURE;
  const appUrl = (process.env.NEXT_PUBLIC_APP_URL || "").trim();

  let secure = false;
  if (env !== "production") {
    secure = false;
  } else if (explicit === "true") {
    secure = true;
  } else if (explicit === "false") {
    secure = false;
  } else {
    secure = appUrl.startsWith("https://");
  }

  return {
    httpOnly: true as const,
    secure,
    sameSite: "lax" as const,
    path: "/",
  };
}
