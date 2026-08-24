"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function CarDetailClient({
  car,
  carId,
}: {
  car: any;
  carId: string;
}) {
  const [image, setImage] = useState(car.images[0]);
  const [days, setDays] = useState(3);
  const [booking, setBooking] = useState(false);

  useEffect(() => {
    setImage(car.images[0]);
  }, [carId]);

  const total = days * car.price;

  return (
    <main className="min-h-screen bg-[#090a0d] p-6 text-white">

      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">

        {/* Car */}
        <div>

          {/* Main Image */}
          <div className="overflow-hidden rounded-xl transition hover:scale-[1.01] hover:shadow-[0_0_20px_rgba(255,208,21,0.12)]">
            <Image
              src={image}
              alt={car.model}
              width={700}
              height={400}
              className="w-full rounded-xl object-cover"
            />
          </div>

          {/* Thumbnails */}
          <div className="mt-3 flex gap-2">
            {car.images.map((img: string) => (
              <button
                key={img}
                onClick={() => setImage(img)}
                className="rounded-lg transition hover:scale-105 hover:ring-2 hover:ring-[#ffd015]"
              >
                <Image
                  src={img}
                  alt="Car"
                  width={90}
                  height={60}
                  className="rounded-lg object-cover"
                />
              </button>
            ))}
          </div>

          {/* Vehicle Information */}
          <div className="mt-6 rounded-xl border border-[#292d35] bg-[#111318] p-4 transition hover:border-[#ffd015] hover:shadow-[0_0_20px_rgba(255,208,21,0.12)]">

            <h2 className="mb-4 font-bold">
              Vehicle Information
            </h2>

            <div className="space-y-2 text-sm">

              <p>
                <span className="text-gray-500">Make:</span>{" "}
                <span className="font-bold text-white">
                  {car.make}
                </span>
              </p>

              <p>
                <span className="text-gray-500">Model:</span>{" "}
                <span className="font-bold text-white">
                  {car.model}
                </span>
              </p>

              <p>
                <span className="text-gray-500">Year:</span>{" "}
                <span className="font-bold text-white">
                  {car.year}
                </span>
              </p>

              <p>
                <span className="text-gray-500">Seats:</span>{" "}
                <span className="font-bold text-white">
                  {car.seats}
                </span>
              </p>

              <p>
                <span className="text-gray-500">Transmission:</span>{" "}
                <span className="font-bold text-white">
                  {car.transmission}
                </span>
              </p>

              <p>
                <span className="text-gray-500">Fuel:</span>{" "}
                <span className="font-bold text-white">
                  {car.fuel}
                </span>
              </p>

              <p>
                <span className="text-gray-500">Rating:</span>{" "}
                <span className="font-bold text-white">
                  {car.rating}
                </span>
              </p>

            </div>
          </div>

        </div>

        {/* Booking */}
        <div className="h-fit rounded-xl border border-[#292d35] bg-[#111318] p-4 transition hover:border-[#ffd015] hover:shadow-[0_0_20px_rgba(255,208,21,0.08)]">

          <h2 className="font-bold">
            Book This Vehicle
          </h2>

          <p className="mt-2 text-xl font-bold text-[#ffd015]">
            ${car.price} / day
          </p>

          <label className="mt-4 block text-sm">
            Pickup Date
          </label>

          <input
            type="date"
            className="mt-2 w-full rounded-lg bg-[#090a0d] p-2 text-sm outline-none focus:ring-2 focus:ring-[#ffd015]"
          />

          <label className="mt-4 block text-sm">
            Rental Duration
          </label>

          <input
            type="range"
            min="1"
            max="30"
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
            className="mt-2 w-full accent-[#ffd015]"
          />

          <p className="mt-2 text-sm text-gray-400">
            {days} days
          </p>

          {/* Total */}
          <div className="mt-4 flex justify-between border-t border-[#292d35] pt-3">
            <span>Total</span>

            <span className="font-bold text-[#ffd015]">
              ${total}
            </span>
          </div>

          {/* Booking Button */}
          <button
            onClick={() => setBooking(true)}
            className={`mt-4 w-full rounded-lg py-2 font-bold transition ${
              booking
                ? "bg-[#ffe05b] text-black"
                : "bg-[#ffd015] text-black hover:scale-[1.02] hover:bg-[#ffe05b] hover:shadow-[0_0_20px_rgba(255,208,21,0.25)]"
            }`}
          >
            {booking ? "Booking..." : "Confirm Booking"}
          </button>

        </div>

      </div>
    </main>
  );
}