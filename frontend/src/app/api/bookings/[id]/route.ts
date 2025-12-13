import { requireEnv } from "@/lib/server/env";
import { NextResponse } from "next/server";

const BACKEND_URL = requireEnv("BACKEND_URL");
const INTERNAL_API_KEY = requireEnv("INTERNAL_API_KEY");

export async function DELETE(
  _req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const res = await fetch(`${BACKEND_URL}/bookings/${id}`, {
    method: "DELETE",
    headers: {
      "X-API-Key": INTERNAL_API_KEY,
    },
  });

  return NextResponse.json(await res.json(), { status: res.status });
}
