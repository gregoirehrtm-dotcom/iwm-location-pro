import { NextResponse } from "next/server";
import { z } from "zod";
import { npaInfo } from "@/lib/delivery";
import { sendQuoteEmail } from "@/lib/email";
import { models } from "@/lib/models";

const slugs = models.map((m) => m.slug) as [string, ...string[]];
const isoDate = /^\d{4}-\d{2}-\d{2}$/;
const text = (max: number) => z.string().trim().max(max).optional().default("");

const schema = z
  .object({
    model: z.enum(slugs),
    startDate: z.string().regex(isoDate),
    endDate: z.string().regex(isoDate),
    mode: z.enum(["livraison", "retrait"]),
    npa: text(4),
    address: text(200),
    access: text(100),
    ground: text(100),
    passage: z.string().trim().regex(/^\d{0,4}$/).optional().default(""),
    clientType: z.enum(["entreprise", "particulier"]),
    company: text(120),
    name: z.string().trim().min(2).max(100),
    phone: z.string().trim().max(30).refine((v) => v.replace(/\D/g, "").length >= 9),
    email: z.string().trim().email().max(200),
    message: text(5000),
  })
  .superRefine((q, ctx) => {
    if (q.endDate < q.startDate) ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["endDate"] });
    if (q.mode === "livraison") {
      if (!npaInfo(q.npa).ok) ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["npa"] });
      if (q.address.length < 4) ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["address"] });
    }
    if (q.clientType === "entreprise" && !q.company) ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["company"] });
  });

export async function POST(req: Request) {
  let data: unknown;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Données invalides" },
      { status: 400 }
    );
  }

  const parsed = schema.safeParse(data);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Données invalides", fields: Object.keys(parsed.error.flatten().fieldErrors) },
      { status: 400 }
    );
  }

  try {
    await sendQuoteEmail(parsed.data);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Devis: échec de l'envoi de l'e-mail", error);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
