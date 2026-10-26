import { NextResponse } from "next/server";
import { estimateSchema } from "@/lib/validations";
import { estimate } from "@/lib/utils";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = estimateSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Données invalides" }, { status: 400 });
  return NextResponse.json(estimate(parsed.data.model, parsed.data.days));
}
