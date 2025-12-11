"use client";

import Image from "next/image";

interface BarberHeroProps {
  title: string;
  description?: string;
  imageUrl?: string;
}

export function BarberHero({ title, description, imageUrl }: BarberHeroProps) {
  return (
    <section className="w-full min-h-screen bg-black text-white py-20 px-6 flex flex-col items-center justify-center">
      <h2 className="text-4xl md:text-6xl font-bold mb-6 text-center">
        {title}
      </h2>

      {description && (
        <p className="max-w-3xl text-center text-lg md:text-xl mb-10 text-white/90">
          {description}
        </p>
      )}

      {imageUrl && (
        <Image
          src={imageUrl}
          alt={title}
          width={900}
          height={500}
          className="rounded-xl shadow-lg object-cover"
        />
      )}
    </section>
  );
}
