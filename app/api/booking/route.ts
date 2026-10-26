import { NextResponse } from "next/server";
import { bookingSchema } from "@/lib/validations";
import { sendMail } from "@/lib/mail";
import { daysBetween, estimate } from "@/lib/utils";

const MAX_FILE = 5 * 1024 * 1024;
const ALLOWED = /^(application\/pdf|image\/(jpeg|png|webp))$/;

export async function POST(req: Request) {
  const form = await req.formData().catch(() => null);
  const raw = form?.get("data");
  let json: unknown;
  try {
    json = typeof raw === "string" ? JSON.parse(raw) : null;
  } catch {
    json = null;
  }
  const parsed = bookingSchema.safeParse(json);
  if (!form || !parsed.success) return NextResponse.json({ error: "Données invalides" }, { status: 400 });
  const d = parsed.data;

  const files = form.getAll("documents").filter((f): f is File => f instanceof File).slice(0, 4);
  if (files.some((f) => f.size > MAX_FILE || !ALLOWED.test(f.type)))
    return NextResponse.json({ error: "Fichier invalide" }, { status: 400 });

  const attachments = await Promise.all(
    files.map(async (f, i) => ({
      filename: `document-${i + 1}.${f.type === "application/pdf" ? "pdf" : f.type.split("/")[1]}`,
      content: Buffer.from(await f.arrayBuffer()),
    })),
  );

  const days = daysBetween(d.startDate, d.endDate);
  const est = estimate(d.model, days);
  try {
    await sendMail({
      subject: `Demande de réservation : nacelle ${d.model}`,
      replyTo: d.email,
      attachments,
      text: [
        `Nacelle: IWM ${d.model}`,
        `Période: ${d.startDate} → ${d.endDate} (${days} j)`,
        `Estimation: ${est.total ?? "sur devis"}`,
        `Réception: ${d.delivery === "delivery" ? `Livraison ${d.postalCode} ${d.siteAddress}` : "Retrait au dépôt"}`,
        `Client: ${d.customerType === "company" ? `Entreprise ${d.company ?? ""}` : "Particulier"}`,
        `Nom: ${d.name}\nE-mail: ${d.email}\nTéléphone: ${d.phone}`,
        `Remarques: ${d.notes || "-"}`,
        `Signature électronique: ${d.signature} (CGL acceptées) le ${new Date().toISOString()}`,
        `Documents joints: ${attachments.length}`,
      ].join("\n"),
    });
  } catch {
    return NextResponse.json({ error: "Envoi impossible" }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
