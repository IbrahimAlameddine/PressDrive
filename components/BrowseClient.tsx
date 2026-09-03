"use client";

import { useState } from "react";
import Link from "next/link";
import VehicleCard, { type Vehicle } from "./VehicleCard";

type BrowseClientProps = {
  initialProvider: string;
  cars: Vehicle[];
};

export default function BrowseClient({
  initialProvider,
  cars,
}: BrowseClientProps) {
  const [provider, setProvider] = useState(initialProvider);

  const visibleVehicles = cars.filter(
    (vehicle) =>
      provider === "all" ||
      (provider === "office" && vehicle.type === "Rental Office") ||
      (provider === "driver" && vehicle.type === "Private Driver")
  );

  return (
    <main className="flex-1 bg-[#090a0d]">
      <div className="mx-auto w-full max-w-6xl px-6 py-6 sm:py-8">
        <header className="mb-8">
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#ffd015]">
            Find your ride
          </p>

          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-[#f7f7f3]">
            Browse Vehicles
          </h1>

          <p className="mt-2 text-sm text-[#858994]">
            Compare rental offices and private drivers in one place.
          </p>
        </header>

        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <nav
            aria-label="Filter vehicles"
            className="inline-flex rounded-lg border border-[#292d35] bg-[#1b1e24] p-1 text-xs font-semibold"
          >
            <Link
              href="/browse"
              onClick={() => setProvider("all")}
              className={`rounded-md px-4 py-2 ${
                provider === "all"
                  ? "bg-[#ffd015] text-[#151515]"
                  : "text-[#a5a8b0] hover:text-[#f7f7f3]"
              }`}
            >
              All
            </Link>

            <Link
              href="/browse?provider=office"
              onClick={() => setProvider("office")}
              className={`rounded-md px-4 py-2 ${
                provider === "office"
                  ? "bg-[#ffd015] text-[#151515]"
                  : "text-[#a5a8b0] hover:text-[#f7f7f3]"
              }`}
            >
              Offices
            </Link>

            <Link
              href="/browse?provider=driver"
              onClick={() => setProvider("driver")}
              className={`rounded-md px-4 py-2 ${
                provider === "driver"
                  ? "bg-[#ffd015] text-[#151515]"
                  : "text-[#a5a8b0] hover:text-[#f7f7f3]"
              }`}
            >
              Private Drivers
            </Link>
          </nav>

          <span className="text-xs text-[#858994]">
            Showing {visibleVehicles.length} of {cars.length} vehicles
          </span>
        </div>

        <section aria-label="Available vehicles">
          {visibleVehicles.length ? (
            <div className="grid gap-6 md:grid-cols-3">
              {visibleVehicles.map((vehicle) => (
                <VehicleCard key={vehicle.id} {...vehicle} />
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-[#30343c] px-6 py-16 text-center">
              <h2 className="text-sm font-bold text-[#f7f7f3]">
                No vehicles available
              </h2>

              <p className="mt-2 text-xs text-[#858994]">
                Try another provider filter.
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
