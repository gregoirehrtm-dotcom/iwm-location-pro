import { getModel } from "@/lib/utils";
import { COMPANY } from "@/lib/constants";

export async function GET(_req: Request, { params }: { params: Promise<{ model: string }> }) {
  const m = getModel((await params).model);
  if (!m) return new Response("Not found", { status: 404 });
  const body = [
    `${COMPANY.name} – Fiche technique ${m.name}`, "",
    `Hauteur de travail : ${m.workingHeight}`, `Hauteur de plateforme : ${m.platformHeight}`, `Charge max : ${m.capacity}`,
    `Poids : ${m.weight}`, `Largeur : ${m.width}`, `Motorisation : ${m.power}`,
    `Prix : ${m.dailyPrice ? `CHF ${m.dailyPrice}/jour` : "sur devis"}`, "", m.description, "",
    `${COMPANY.phone} – ${COMPANY.email}`,
  ].join("\n");
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8", "Content-Disposition": `attachment; filename="iwm-${m.id}-fiche-technique.txt"` } });
}
