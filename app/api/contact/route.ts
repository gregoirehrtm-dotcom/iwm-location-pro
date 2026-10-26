import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validations";
import { clientIp, escapeHtml, formatRow, rateLimit, sanitizeObject } from "@/lib/utils";
import { sendMail, wrapHtml } from "@/lib/mail";

export async function POST(req: Request) {
  if (!rateLimit(`contact:${clientIp(req)}`, 5, 60_000)) return NextResponse.json({ error: "Trop de requêtes" }, { status: 429 });
  const body = await req.json().catch(() => null);
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Données invalides", issues: parsed.error.flatten().fieldErrors }, { status: 400 });
  const d = sanitizeObject(parsed.data);
  try {
    await sendMail({
      subject: `Contact – ${d.name}`,
      replyTo: d.email,
      html: wrapHtml("Nouveau message", `<table>${formatRow("Nom", d.name)}${formatRow("Email", d.email)}${formatRow("Téléphone", d.phone || "-")}</table><p style="white-space:pre-wrap">${escapeHtml(d.message)}</p>`),
    });
  } catch (e) {
    console.error("contact mail error", e);
    return NextResponse.json({ error: "Envoi impossible" }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
