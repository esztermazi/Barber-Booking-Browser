import { NextResponse } from "next/server";
import { requireEnv } from "@/lib/server/env";

const BACKEND_URL = requireEnv("BACKEND_URL");
const INTERNAL_API_KEY = requireEnv("INTERNAL_API_KEY");

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json(
      { error: "Email query parameter is required" },
      { status: 400 }
    );
  }

  const res = await fetch(
    `${BACKEND_URL}/bookings?email=${encodeURIComponent(email)}`,
    {
      headers: {
        "X-API-Key": INTERNAL_API_KEY,
      },
    }
  );

  return NextResponse.json(await res.json(), { status: res.status });
}

export async function POST(req: Request) {
  const body = await req.json();

  const res = await fetch(`${BACKEND_URL}/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-Key": INTERNAL_API_KEY,
    },
    body: JSON.stringify(body),
  });

  return NextResponse.json(await res.json(), { status: res.status });
}
