"use client";

import VehicleCard, { type Vehicle } from "./VehicleCard";

type BrowseClientProps = {
  cars: Vehicle[];
};

export default function BrowseClient({
  cars,
}: BrowseClientProps) {
  const visibleVehicles = cars;

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
            Compare vehicles from trusted rental offices.
          </p>
        </header>

        <div className="mb-6 flex justify-end">
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
                Check back soon for available vehicles.
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
