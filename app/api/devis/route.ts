import { NextResponse } from "next/server";
import { getMachine } from "@/lib/machines";
import { quoteSchema } from "@/lib/quote-schema";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "JSON invalide" }, { status: 400 });
  }

  const parsed = quoteSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Données invalides", issues: parsed.error.flatten().fieldErrors }, { status: 422 });
  }

  const quote = parsed.data;
  const machine = getMachine(quote.machine);

  // TODO : brancher un service d'e-mail (Resend, SMTP…) ou un CRM pour transmettre la demande.
  console.info("[devis] nouvelle demande", { ...quote, machineName: machine?.name });

  return NextResponse.json({ ok: true });
}
