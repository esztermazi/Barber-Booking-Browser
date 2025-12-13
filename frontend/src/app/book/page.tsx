"use client";

import { useEffect, useState, useCallback } from "react";
import { getAvailableSlots, getBarbers } from "@/lib/api/barbers";
import { createBooking } from "@/lib/api/bookings";
import type { Barber } from "@/types/Barber";
import type { BarberSlot } from "@/types/Barber";
import { toast } from "sonner";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toLocalYMD } from "@/lib/utils";

export default function BookPage() {
  const [barbers, setBarbers] = useState<Barber[]>([]);
  const [barberId, setBarberId] = useState("");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [slots, setSlots] = useState<BarberSlot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<BarberSlot | null>(null);
  const [email, setEmail] = useState("");

  const [loadingSlots, setLoadingSlots] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const data = await getBarbers();
        setBarbers(data);
      } catch {
        toast.error("Failed to load barbers");
      }
    }
    load();
  }, []);

  const loadSlots = useCallback(
    async (dateStr?: string, barber?: string) => {
      const bookingDate =
        dateStr ?? (date instanceof Date ? toLocalYMD(date) : undefined);
      const bookingBarber = barber ?? barberId;

      if (!bookingDate || !bookingBarber) return;

      setLoadingSlots(true);
      setSlots([]);

      try {
        const data = await getAvailableSlots(bookingBarber, bookingDate);
        setSlots(data);

        if (data.length === 0) {
          toast.info("No available slots for this day");
        }
      } catch {
        toast.error("Failed to load slots");
      } finally {
        setLoadingSlots(false);
      }
    },
    [date, barberId]
  );

  async function handleBooking() {
    if (!selectedSlot || !email || !barberId || !date) {
      toast.error("Please select barber, date, time slot and enter email");
      return;
    }

    try {
      await createBooking({
        barberId,
        start: selectedSlot.start,
        end: selectedSlot.end,
        email,
      });

      toast.success("Appointment successfully booked 💈");

      setEmail("");
      setSelectedSlot(null);
      setSlots([]);
      setDate(undefined);
      setBarberId("");
    } catch {
      toast.error("Failed to create booking");
    }
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-4xl font-[Snell_Roundhand,Segoe_Script,'Brush_Script_MT',cursive] mb-6 text-center">
        Time for a Trim
      </h1>

      <div className="text-center">
        <Label className="block mb-2 font-medium">Choose a Barber</Label>

        <div className="flex justify-center">
          <Select
            value={barberId}
            onValueChange={(id) => {
              setBarberId(id);
              setSelectedSlot(null);

              if (date) {
                loadSlots(toLocalYMD(date), id);
              }
            }}
          >
            <SelectTrigger className="w-64 mb-6">
              <SelectValue placeholder="Select barber…" />
            </SelectTrigger>

            <SelectContent>
              {barbers.map((barber) => (
                <SelectItem key={barber.id} value={barber.id}>
                  {barber.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="text-center">
        <Label className="block mb-2 font-medium">Choose a Date</Label>

        <div className="flex justify-center">
          <Calendar
            mode="single"
            selected={date}
            disabled={{ before: new Date() }}
            onSelect={(day) => {
              if (!day) return;
              setDate(day);
              setSelectedSlot(null);

              if (barberId) {
                loadSlots(toLocalYMD(day), barberId);
              }
            }}
            className="mb-6"
          />
        </div>
      </div>

      {loadingSlots && <p className="mt-4 text-center">Loading slots…</p>}

      {slots.length > 0 && (
        <div className="mt-6">
          <h2 className="font-semibold mb-2 text-center">
            Available Time Slots
          </h2>

          <div className="grid grid-cols-2 gap-3 mt-4">
            {slots.map((slot) => {
              const isSelected = selectedSlot?.start === slot.start;

              return (
                <Button
                  key={slot.start}
                  variant={isSelected ? "default" : "outline"}
                  className="w-full text-sm py-4"
                  onClick={() => setSelectedSlot(slot)}
                >
                  {new Date(slot.start).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                  {" – "}
                  {new Date(slot.end).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Button>
              );
            })}
          </div>
        </div>
      )}

      {selectedSlot && (
        <div className="mt-6 text-center">
          <Label className="block mt-6 mb-2 font-medium">Your Email</Label>

          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="mb-4 w-full"
          />

          <Button onClick={handleBooking} className="bg-[#8B5A2B] w-full">
            Schedule Appointment
          </Button>
        </div>
      )}
    </div>
  );
}
