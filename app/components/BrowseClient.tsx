"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import BrowseVehicleCard, { type BrowseVehicle } from "./BrowseVehicleCard";

const vehicles: BrowseVehicle[] = [
  { image: "/cars/corolla/corolla1.jpg", type: "Rental Office", name: "Toyota Corolla '23", detail: "City Motors · Self-drive · 5 seats", price: "$40" },
  { image: "/cars/suv/suv1.jpg", type: "Private Driver", name: "Anas Azzam. — SUV", detail: "Driver included · 5 seats", price: "$15" },
  { image: "/cars/e-class/e-class1.jpg", type: "Rental Office", name: "Mercedes E-Class", detail: "Luxury Fleet · Self-drive · 5 seats", price: "$200" },
  { image: "/cars/sedan//sedan1.jpg", type: "Private Driver", name: "Ibrahim Alameddine. — Sedan", detail: "Driver included · 4 seats", price: "$10" },
  { image: "/cars/sunny/sunny1.jpg", type: "Rental Office", name: "Nissan Sunny", detail: "City Motors · Both options · 5 seats", price: "$25" },
  { image: "/cars/rogue/rogue1.jpg", type: "Rental Office", name: "Nissan Rogue", detail: "City Motors · Both options · 5 seats", price: "$40" },
  { image: "/cars/pilot/pilot1.jpg", type: "Rental Office", name: "Honda Pilot", detail: "Downtown Fleet · Self-drive · 7 seats", price: "$55" },
  { image: "/cars/hyundai/hyundai1.jpg", type: "Private Driver", name: "Ahmad Sayed. — Van", detail: "Driver included · 10 seats", price: "$20" },
  { image: "/cars/bmw/bmw1.jpg", type: "Rental Office", name: "BMW ", detail: "Premium Fleet · Self-drive · 2 seats", price: "$75" },
];

export default function BrowseClient({ initialProvider }: { initialProvider: string }) {
  const [provider, setProvider] = useState(initialProvider);

  const visibleVehicles = useMemo(() => vehicles.filter((vehicle) => provider === "all" || (provider === "office" && vehicle.type === "Rental Office") || (provider === "driver" && vehicle.type === "Private Driver")), [provider]);

  return (
    <main className="flex-1 bg-[#090a0d]">
      <div className="mx-auto w-full max-w-6xl px-6 py-10 sm:px-10 md:py-14">
        <div className="mb-8"><p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#ffd015]">Find your ride</p><h1 className="mt-2 text-3xl font-extrabold tracking-tight text-[#f7f7f3]">Browse Vehicles</h1><p className="mt-2 text-sm text-[#858994]">Compare rental offices and private drivers in one place.</p></div>
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="inline-flex rounded-lg border border-[#292d35] bg-[#1b1e24] p-1 text-xs font-semibold">
            {[{ value: "all", label: "All", href: "/browse" }, { value: "office", label: "Offices", href: "/browse?provider=office" }, { value: "driver", label: "Private Drivers", href: "/browse?provider=driver" }].map((tab) => <Link key={tab.value} href={tab.href} aria-current={provider === tab.value ? "page" : undefined} onClick={() => setProvider(tab.value)} className={`inline-flex cursor-pointer rounded-md px-4 py-2 transition ${provider === tab.value ? "bg-[#ffd015] text-[#151515]" : "text-[#a5a8b0] hover:text-[#f7f7f3]"}`}>{tab.label}</Link>)}
          </div>
          <span className="text-xs text-[#858994]">Showing {visibleVehicles.length} of {vehicles.length} vehicles</span>
        </div>
        <section aria-label="Available vehicles">
          {visibleVehicles.length > 0 ? <div className="grid gap-6 md:grid-cols-[repeat(3,minmax(0,21rem))] md:justify-center">{visibleVehicles.map((vehicle) => <BrowseVehicleCard key={vehicle.name} {...vehicle} />)}</div> : <div className="rounded-xl border border-dashed border-[#30343c] px-6 py-16 text-center"><h2 className="text-sm font-bold text-[#f7f7f3]">No vehicles match this choice</h2><p className="mt-2 text-xs text-[#858994]">Choose another provider to see more vehicles.</p></div>}
        </section>
      </div>
    </main>
  );
}