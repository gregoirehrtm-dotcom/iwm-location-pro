import { NextRequest, NextResponse } from "next/server";
import { sendMail } from "@/lib/mail";
import { sanitize, isEmail } from "@/lib/utils";
import { guard, bad } from "@/lib/api";

export async function POST(req: NextRequest) {
  const limited = guard(req, "contact");
  if (limited) return limited;
  const b = await req.json().catch(() => null);
  if (!b) return bad("Requête invalide");
  const name = sanitize(b.name, 100), email = sanitize(b.email, 200), message = sanitize(b.message, 3000);
  if (!name || !isEmail(email) || message.length < 5) return bad("Champs invalides");
  try {
    await sendMail("Nouveau message de contact", { Nom: name, Email: email, Téléphone: sanitize(b.phone, 40), Message: message }, email);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Envoi impossible" }, { status: 500 });
  }
}
