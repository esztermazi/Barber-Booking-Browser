import { NextResponse } from "next/server";
import { requireEnv } from "@/lib/server/env";

const BACKEND_URL = requireEnv("BACKEND_URL");
const INTERNAL_API_KEY = requireEnv("INTERNAL_API_KEY");

export async function GET() {
  const res = await fetch(`${BACKEND_URL}/barbers`, {
    headers: {
      "X-API-Key": INTERNAL_API_KEY,
    },
  });

  return NextResponse.json(await res.json(), { status: res.status });
}
