import { NextResponse } from "next/server";
import { z } from "zod";
import { sendContactEmail } from "@/lib/email";

const schema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().max(30).optional(),
  message: z.string().trim().min(5).max(5000),
  model: z.string().max(20).optional(),
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
      { error: "Données invalides" },
      { status: 400 }
    );
  }

  try {
    await sendContactEmail(parsed.data);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact: échec de l'envoi de l'e-mail", error);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
