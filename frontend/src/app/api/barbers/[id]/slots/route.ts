import { NextResponse } from "next/server";
import { requireEnv } from "@/lib/server/env";

const BACKEND_URL = requireEnv("BACKEND_URL");
const INTERNAL_API_KEY = requireEnv("INTERNAL_API_KEY");

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const { searchParams } = new URL(req.url);
  const date = searchParams.get("date");

  if (!date) {
    return NextResponse.json(
      { error: "Date query parameter is required" },
      { status: 400 }
    );
  }

  const res = await fetch(
    `${BACKEND_URL}/barbers/${id}/slots?date=${encodeURIComponent(date)}`,
    {
      headers: {
        "X-API-Key": INTERNAL_API_KEY,
      },
    }
  );

  return NextResponse.json(await res.json(), { status: res.status });
}
