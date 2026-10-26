import { NextRequest, NextResponse } from "next/server";
import { sendMail } from "@/lib/mail";
import { sanitize, isEmail, estimate } from "@/lib/utils";
import { guard, bad } from "@/lib/api";

export async function POST(req: NextRequest) {
  const limited = guard(req, "booking");
  if (limited) return limited;
  const b = await req.json().catch(() => null);
  if (!b) return bad("Requête invalide");
  const name = sanitize(b.name, 100), email = sanitize(b.email, 200);
  const model = sanitize(b.model, 10), start = sanitize(b.start, 10), end = sanitize(b.end, 10);
  const s = Date.parse(start), e = Date.parse(end);
  if (!name || !isEmail(email) || Number.isNaN(s) || Number.isNaN(e) || e < s) return bad("Champs invalides");
  let est;
  try {
    est = estimate(model, Math.round((e - s) / 86_400_000) + 1);
  } catch (err) {
    return bad((err as Error).message);
  }
  try {
    await sendMail("Nouvelle demande de réservation", {
      Nom: name, Email: email, Téléphone: sanitize(b.phone, 40), Société: sanitize(b.company, 150),
      Modèle: model, Début: start, Fin: end, Jours: String(est.days),
      Estimation: est.onQuote ? "Sur devis" : `CHF ${est.total?.toFixed(2)}`,
      Livraison: sanitize(b.delivery, 300), Remarques: sanitize(b.notes, 2000),
    }, email);
    return NextResponse.json({ ok: true, estimate: est });
  } catch {
    return NextResponse.json({ error: "Envoi impossible" }, { status: 500 });
  }
}
