import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validations";
import { sendMail } from "@/lib/mail";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Données invalides" }, { status: 400 });
  const d = parsed.data;
  if (d.website) return NextResponse.json({ ok: true }); // honeypot filled: silently drop
  try {
    await sendMail({
      subject: `Contact site web : ${d.name.replace(/[\r\n]+/g, " ")}`,
      text: `Nom: ${d.name}\nE-mail: ${d.email}\nTéléphone: ${d.phone || "-"}\n\n${d.message}`,
      replyTo: d.email,
    });
  } catch {
    return NextResponse.json({ error: "Envoi impossible" }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
