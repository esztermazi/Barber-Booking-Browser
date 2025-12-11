export async function getBookings(email: string) {
  if (!email) {
    throw new Error("Email is required");
  }

  const url = `${
    process.env.NEXT_PUBLIC_BACKEND_URL
  }/bookings?email=${encodeURIComponent(email)}`;

  const res = await fetch(url, { cache: "no-store" });

  if (!res.ok) {
    throw new Error("Failed to fetch bookings");
  }

  return res.json();
}
