import { NextResponse } from "next/server";
import { bookingSchema } from "@/lib/validations";
import { clientIp, escapeHtml, estimatePrice, formatCHF, formatRow, getModel, rateLimit, sanitize, sanitizeObject } from "@/lib/utils";
import { sendMail, wrapHtml, type MailAttachment } from "@/lib/mail";

const MAX_FILE = 5 * 1024 * 1024;
const ALLOWED = ["application/pdf", "image/jpeg", "image/png"];

export async function POST(req: Request) {
  if (!rateLimit(`booking:${clientIp(req)}`, 3, 60_000)) return NextResponse.json({ error: "Trop de requêtes" }, { status: 429 });
  let raw: Record<string, unknown> = {};
  const attachments: MailAttachment[] = [];
  const type = req.headers.get("content-type") ?? "";
  try {
    if (type.includes("multipart/form-data")) {
      const form = await req.formData();
      for (const [k, v] of form.entries()) {
        if (typeof v === "string") raw[k] = v;
        else if (v.size > 0) {
          if (v.size > MAX_FILE || !ALLOWED.includes(v.type)) return NextResponse.json({ error: "Document invalide (PDF/JPG/PNG, 5 Mo max)" }, { status: 400 });
          attachments.push({ filename: sanitize(v.name).replace(/[^\w.\-]/g, "_") || "document", content: Buffer.from(await v.arrayBuffer()), contentType: v.type });
        }
      }
      raw.acceptTerms = raw.acceptTerms === "true";
    } else raw = await req.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide" }, { status: 400 });
  }
  const parsed = bookingSchema.safeParse(raw);
  if (!parsed.success) return NextResponse.json({ error: "Données invalides", issues: parsed.error.flatten().fieldErrors }, { status: 400 });
  const d = sanitizeObject(parsed.data);
  const days = Math.round((Date.parse(d.endDate) - Date.parse(d.startDate)) / 86_400_000) + 1;
  const est = estimatePrice(d.model, days);
  const model = getModel(d.model)!;
  const rows = [
    ["Modèle", model.name], ["Période", `${d.startDate} → ${d.endDate} (${days} j)`],
    ["Estimation", est.onQuote ? "Sur devis" : formatCHF(est.total!)],
    ["Livraison", d.deliveryMode === "pickup" ? "Retrait au dépôt" : `${d.address}, ${d.postalCode} ${d.city}`],
    ["Nom", d.name], ["Entreprise", d.company || "-"], ["Email", d.email], ["Téléphone", d.phone], ["Signature", d.signature],
  ].map(([l, v]) => formatRow(l, v)).join("");
  try {
    await sendMail({ subject: `Réservation ${model.name} – ${d.name}`, replyTo: d.email, attachments,
      html: wrapHtml("Nouvelle réservation", `<table>${rows}</table><p style="white-space:pre-wrap">${escapeHtml(d.notes || "")}</p>`) });
  } catch (e) {
    console.error("booking mail error", e);
    return NextResponse.json({ error: "Envoi impossible" }, { status: 500 });
  }
  return NextResponse.json({ ok: true, estimate: est });
}
