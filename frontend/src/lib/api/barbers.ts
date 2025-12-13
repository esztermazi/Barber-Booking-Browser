import { Barber } from "@/types/Barber";

export async function getBarbers(): Promise<Barber[]> {
  const res = await fetch("/api/barbers", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch barbers");
  }

  return res.json();
}

export async function getBarbersServer(baseUrl: string): Promise<Barber[]> {
  const res = await fetch(`${baseUrl}/api/barbers`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch barbers");
  }

  return res.json();
}

export async function getAvailableSlots(barberId: string, date: string) {
  const res = await fetch(`/api/barbers/${barberId}/slots?date=${date}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch slots");
  }

  return res.json();
}
