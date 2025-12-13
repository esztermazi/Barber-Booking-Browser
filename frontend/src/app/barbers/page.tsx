import { getBarbersServer } from "@/lib/api/barbers";
import { BarberHero } from "@/components/sections/BarberHero";
import { BarberSchedule } from "@/components/sections/BarberSchedule";
import { headers } from "next/headers";

export default async function BarbersPage() {
  const headersList = await headers();
  const host = headersList.get("host");

  if (!host) {
    throw new Error("Host header is missing");
  }

  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";

  const baseUrl = `${protocol}://${host}`;

  const barbers = await getBarbersServer(baseUrl);

  return (
    <div className="w-full">
      <BarberHero
        title="Meet Our Barbers"
        description="Our talented team brings years of expertise, precision, and passion to every cut. Discover the professionals behind the chair."
        imageUrl="/barber.jpg"
      />
      <section
        id="barbers-schedule"
        className="max-w-4xl mx-auto px-4 space-y-8 pb-20"
      >
        {barbers.map((barber) => (
          <BarberSchedule barber={barber} key={barber.id} />
        ))}
      </section>
    </div>
  );
}
