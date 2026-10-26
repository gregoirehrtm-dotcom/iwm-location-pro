import { NextResponse } from "next/server";
import { models } from "@/lib/models";

export function GET() {
  return NextResponse.json(models);
}
