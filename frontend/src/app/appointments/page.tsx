"use client";

import { useState } from "react";
import { getBookings, deleteBooking } from "@/lib/api/bookings";
import type { Booking } from "@/types/Booking";

export default function AppointmentsPage() {
  const [email, setEmail] = useState("");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

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
      setError("Failed to load appointments: " + err);
    }

    setLoading(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this appointment?")) {
      return;
    }

    setDeletingId(id);
    setError("");

    try {
      const success = await deleteBooking(id);

      if (!success) {
        setError("Could not delete booking.");
        return;
      }

      const updated = await getBookings(email);
      setBookings(updated);
    } catch (err) {
      setError("Failed to delete booking: " + err);
    }

    setDeletingId(null);
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
          <li key={b.id} className="border p-3 rounded flex justify-between">
            <div>
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
            </div>

            <button
              onClick={() => handleDelete(b.id)}
              disabled={deletingId === b.id}
              className="text-white bg-red-600 px-3 py-1 rounded h-10 self-center"
            >
              {deletingId === b.id ? "Deleting..." : "Delete"}
            </button>
          </li>
        ))}
      </ul>

      {bookings.length === 0 && !loading && <p>No appointments found.</p>}
    </div>
  );
}
