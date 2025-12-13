export async function getBookings(email: string) {
  const res = await fetch(`/api/bookings?email=${email}`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch bookings");
  return res.json();
}

export async function createBooking(body: {
  barberId: string;
  start: number;
  end: number;
  email: string;
}) {
  const res = await fetch(`/api/bookings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) throw new Error("Failed to create booking");
  return res.json();
}

export async function deleteBooking(id: string) {
  const res = await fetch(`/api/bookings/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Failed to delete booking");
  return res.json();
}
