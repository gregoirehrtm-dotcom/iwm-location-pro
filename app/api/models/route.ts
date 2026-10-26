import { NextResponse } from "next/server";
import { MODELS } from "@/lib/constants";

export function GET() {
  return NextResponse.json({ models: MODELS });
}
