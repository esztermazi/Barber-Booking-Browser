"use client";

import { useState } from "react";
import { getBookings } from "@/lib/api/bookings";
import type { Booking } from "@/types/Booking";

export default function AppointmentsPage() {
  const [email, setEmail] = useState("");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSearch() {
    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const data = await getBookings(email);
      setBookings(data);
    } catch (err) {
      setError("Failed to load appointments with error:" + err);
    }

    setLoading(false);
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Appointments</h1>

      <div className="flex gap-2 mb-4">
        <input
          type="email"
          placeholder="Enter your email…"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border px-3 py-2 rounded"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-black text-white rounded"
        >
          Search
        </button>
      </div>

      {error && <p className="text-red-600">{error}</p>}
      {loading && <p>Loading...</p>}

      <ul className="mt-4 space-y-2">
        {bookings.map((b) => (
          <li key={b.id} className="border p-3 rounded">
            <p>
              <strong>Barber:</strong> {b.barberId}
            </p>
            <p>
              <strong>Email:</strong> {b.email}
            </p>
            <p>
              <strong>Start:</strong> {new Date(b.start).toLocaleString()}
            </p>
            <p>
              <strong>End:</strong> {new Date(b.end).toLocaleString()}
            </p>
          </li>
        ))}
      </ul>

      {bookings.length === 0 && !loading && <p>No appointments found.</p>}
    </div>
  );
}
