import { NextResponse, type NextRequest } from "next/server";

const USER = process.env.BASIC_AUTH_USER ?? "admin";
const PASS = process.env.BASIC_AUTH_PASSWORD ?? "IWMLocation2026!";

function safeEqual(a: string, b: string): boolean {
  let diff = a.length ^ b.length;
  for (let i = 0; i < Math.max(a.length, b.length); i++) diff |= (a.charCodeAt(i) || 0) ^ (b.charCodeAt(i) || 0);
  return diff === 0;
}

function authorized(req: NextRequest): boolean {
  const h = req.headers.get("authorization");
  if (!h?.startsWith("Basic ")) return false;
  try {
    const decoded = atob(h.slice(6));
    const i = decoded.indexOf(":");
    if (i < 0) return false;
    return safeEqual(decoded.slice(0, i), USER) && safeEqual(decoded.slice(i + 1), PASS);
  } catch {
    return false;
  }
}

export function middleware(req: NextRequest) {
  if (!authorized(req)) {
    return new NextResponse("Authentication required", {
      status: 401,
      headers: { "WWW-Authenticate": 'Basic realm="IWM Location - Private Preview", charset="UTF-8"' },
    });
  }
  const res = NextResponse.next();
  res.headers.set("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload");
  res.headers.set("X-Frame-Options", "DENY");
  res.headers.set("X-Content-Type-Options", "nosniff");
  res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  res.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  res.headers.set("X-Robots-Tag", "noindex, nofollow");
  return res;
}

export const config = { matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"] };
