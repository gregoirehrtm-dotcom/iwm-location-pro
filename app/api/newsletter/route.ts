import { NextRequest, NextResponse } from "next/server";
import { sendMail } from "@/lib/mail";
import { sanitize, isEmail } from "@/lib/utils";
import { guard, bad } from "@/lib/api";

export async function POST(req: NextRequest) {
  const limited = guard(req, "newsletter");
  if (limited) return limited;
  const b = await req.json().catch(() => null);
  const email = sanitize(b?.email, 200);
  if (!isEmail(email)) return bad("Email invalide");
  try {
    await sendMail("Inscription newsletter", { Email: email }, email);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Envoi impossible" }, { status: 500 });
  }
}
