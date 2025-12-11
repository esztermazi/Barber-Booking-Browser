"use client";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import type { Barber } from "@/types/Barber";

export function BarberSchedule({ barber }: { barber: Barber }) {
  const schedule = barber.workSchedule;

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="schedule" className="bg-[#1a1a1a] rounded-lg px-4">
        <AccordionTrigger className="text-xl font-bold text-center text-white hover:text-gray-300 no-underline py-4 [&>svg]:scale-150 [&>svg]:text-white [&]:cursor-pointer">
          {barber.name}
        </AccordionTrigger>

        <AccordionContent>
          <div className="mt-6 grid grid-cols-1 gap-3">
            {Object.entries(schedule).map(([day, hours]) => (
              <div
                key={day}
                className="flex justify-between border-b border-white/10 py-2 text-white/90"
              >
                <span className="capitalize">{day}</span>

                {hours.start && hours.end ? (
                  <span>
                    {hours.start} – {hours.end}
                  </span>
                ) : (
                  <span className="text-red-400">Closed</span>
                )}
              </div>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
