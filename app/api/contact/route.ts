import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().min(5),
  model: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const parsed = schema.safeParse(data);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Données invalides" },
        { status: 400 }
      );
    }

    console.log("Contact:", parsed.data);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
