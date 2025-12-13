"use client";

import { useEffect, useState, useCallback } from "react";
import { z } from "zod";
import { toast } from "sonner";

import { getAvailableSlots, getBarbers } from "@/lib/api/barbers";
import { createBooking } from "@/lib/api/bookings";
import { toLocalYMD } from "@/lib/utils";

import type { Barber, BarberSlot } from "@/types/Barber";

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

const emailSchema = z
  .string()
  .min(1, "Email is required")
  .email("Please enter a valid email address");

export default function BookPage() {
  const [barbers, setBarbers] = useState<Barber[]>([]);
  const [barberId, setBarberId] = useState("");
  const [date, setDate] = useState<Date>();
  const [slots, setSlots] = useState<BarberSlot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<BarberSlot | null>(null);

  const [email, setEmail] = useState("");

  const [loadingSlots, setLoadingSlots] = useState(false);

  useEffect(() => {
    async function loadBarbers() {
      try {
        const data = await getBarbers();
        setBarbers(data);
      } catch {
        toast.error("Failed to load barbers");
      }
    }

    loadBarbers();
  }, []);

  const loadSlots = useCallback(
    async (dateStr?: string, barber?: string) => {
      const bookingDate = dateStr ?? (date ? toLocalYMD(date) : undefined);
      const bookingBarber = barber ?? barberId;

      if (!bookingDate || !bookingBarber) return;

      setLoadingSlots(true);
      setSlots([]);
      setSelectedSlot(null);

      try {
        const data = await getAvailableSlots(bookingBarber, bookingDate);
        setSlots(data);

        if (data.length === 0) {
          toast.info("No available slots for this day");
        }
      } catch {
        toast.error("Failed to load available slots");
      } finally {
        setLoadingSlots(false);
      }
    },
    [date, barberId]
  );

  async function handleBooking() {
    if (!barberId || !date || !selectedSlot) {
      toast.error("Please select barber, date and time slot");
      return;
    }

    const emailValidation = emailSchema.safeParse(email);

    if (!emailValidation.success) {
      const message = emailValidation.error.issues[0].message;
      toast.error(message);
      return;
    }

    try {
      await createBooking({
        barberId,
        start: selectedSlot.start,
        end: selectedSlot.end,
        email: emailValidation.data,
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
              if (date) loadSlots(toLocalYMD(date), id);
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
              if (barberId) loadSlots(toLocalYMD(day), barberId);
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
                  className="w-full py-4 text-sm"
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
          <Label className="block mb-2 font-medium">Your Email</Label>

          <Input
            type="email"
            value={email}
            onChange={(e) => {
              const value = e.target.value;
              setEmail(value);
            }}
            placeholder="you@example.com"
            className="w-full"
          />

          <Button onClick={handleBooking} className="bg-[#8B5A2B] w-full mt-4">
            Schedule Appointment
          </Button>
        </div>
      )}
    </div>
  );
}
