import { Barber } from "@/types/Barber";
import { BACKEND_URL, INTERNAL_API_KEY } from "../config";

export async function getBarbers(): Promise<Barber[]> {
  const res = await fetch(`${BACKEND_URL}/barbers`, {
    cache: "no-store",
    headers: {
      "X-API-Key": INTERNAL_API_KEY,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch barbers");
  }

  return res.json() as Promise<Barber[]>;
}

export async function getAvailableSlots(barberId: string, date: string) {
  const url = `${BACKEND_URL}/barbers/${barberId}/slots?date=${date}`;

  const res = await fetch(url, {
    cache: "no-store",
    headers: {
      "X-API-Key": INTERNAL_API_KEY,
    },
  });

  if (!res.ok) throw new Error("Failed to fetch slots");

  return res.json();
}
