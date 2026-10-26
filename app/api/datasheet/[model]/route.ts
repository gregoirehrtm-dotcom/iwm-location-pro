import { COMPANY, getModel } from "@/lib/constants";
import { formatMeters } from "@/lib/utils";

export async function GET(_req: Request, { params }: { params: Promise<{ model: string }> }) {
  const m = getModel((await params).model);
  if (!m) return new Response("Not found", { status: 404 });
  const body = [
    `${COMPANY.name} – Fiche technique ${m.name}`,
    "",
    `Hauteur de travail: ${formatMeters(m.workingHeight)}`,
    `Hauteur de plancher: ${formatMeters(m.platformHeight)}`,
    `Capacité: ${m.capacityKg ? `${m.capacityKg} kg` : "à confirmer"}`,
    `Largeur: ${formatMeters(m.widthM)}`,
    `Tarif: ${m.pricePerDay ? `dès CHF ${m.pricePerDay}.– par jour` : "sur devis"}`,
    "",
    m.description,
    "",
    `${COMPANY.phone} · ${COMPANY.email}`,
  ].join("\n");
  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Content-Disposition": `attachment; filename="fiche-iwm-${m.slug}.txt"` },
  });
}
