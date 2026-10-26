import { NextRequest, NextResponse } from "next/server";
import { estimate } from "@/lib/utils";
import { guard, bad } from "@/lib/api";

export async function GET(req: NextRequest) {
  const limited = guard(req, "estimate");
  if (limited) return limited;
  const p = req.nextUrl.searchParams;
  try {
    return NextResponse.json(estimate(p.get("model") ?? "", Number(p.get("days"))));
  } catch (e) {
    return bad((e as Error).message);
  }
}
