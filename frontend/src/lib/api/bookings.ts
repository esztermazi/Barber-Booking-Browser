import { BACKEND_URL, INTERNAL_API_KEY } from "../config";

export async function getBookings(email: string) {
  if (!email) {
    throw new Error("Email is required");
  }

  const url = `${BACKEND_URL}/bookings?email=${encodeURIComponent(email)}`;

  const res = await fetch(url, {
    cache: "no-store",
    headers: {
      "X-API-Key": INTERNAL_API_KEY,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch bookings");
  }

  return res.json();
}

export async function createBooking(body: {
  barberId: string;
  start: number;
  end: number;
  email: string;
}) {
  const res = await fetch(`${BACKEND_URL}/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-Key": INTERNAL_API_KEY,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) throw new Error("Failed to create booking");

  return res.json();
}

export async function deleteBooking(id: string) {
  const res = await fetch(`${BACKEND_URL}/bookings/${id}`, {
    method: "DELETE",
    headers: {
      "X-API-Key": INTERNAL_API_KEY,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to delete booking");
  }

  return res.json();
}
