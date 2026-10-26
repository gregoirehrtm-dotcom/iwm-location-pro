import { NextRequest, NextResponse } from "next/server";
import { rateLimit } from "./utils";

export function guard(req: NextRequest, name: string): NextResponse | null {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  if (!rateLimit(`${name}:${ip}`)) {
    return NextResponse.json({ error: "Trop de requêtes, réessayez dans une minute." }, { status: 429 });
  }
  return null;
}

export const bad = (error: string) => NextResponse.json({ error }, { status: 400 });
