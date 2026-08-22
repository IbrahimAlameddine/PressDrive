"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import BrowseVehicleCard, { type BrowseVehicle } from "./BrowseVehicleCard";

const vehicles: BrowseVehicle[] = [
  { image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=900&q=85", provider: "Rental Office", vehicleType: "Sedan", name: "Toyota Corolla '23", detail: "City Motors · Self-drive", service: "Self-Drive", passengers: 5, price: 35 },
  { image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=900&q=85", provider: "Private Driver", vehicleType: "SUV", name: "Karim J. — SUV", detail: "Driver included", service: "With Driver", passengers: 5, price: 90 },
  { image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=900&q=85", provider: "Rental Office", vehicleType: "Luxury", name: "Mercedes E-Class", detail: "Luxury Fleet · Self-drive", service: "Self-Drive", passengers: 5, price: 120 },
  { image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=900&q=85", provider: "Private Driver", vehicleType: "Sedan", name: "Hassan M. — Sedan", detail: "Driver included", service: "With Driver", passengers: 4, price: 55 },
  { image: "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=900&q=85", provider: "Rental Office", vehicleType: "Luxury", name: "BMW 5 Series", detail: "City Motors · Both options", service: "Both options", passengers: 5, price: 145 },
  { image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=900&q=85", provider: "Rental Office", vehicleType: "SUV", name: "Mitsubishi Pajero", detail: "City Motors · Both options", service: "Both options", passengers: 7, price: 80 },
  { image: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=900&q=85", provider: "Rental Office", vehicleType: "Economy", name: "Volkswagen Golf", detail: "Downtown Fleet · Self-drive", service: "Self-Drive", passengers: 5, price: 42 },
  { image: "https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=900&q=85", provider: "Private Driver", vehicleType: "Van", name: "Maya R. — Van", detail: "Driver included", service: "With Driver", passengers: 7, price: 110 },
  { image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=85", provider: "Rental Office", vehicleType: "Luxury", name: "Porsche Cayman", detail: "Premium Fleet · Self-drive", service: "Self-Drive", passengers: 2, price: 190 },
];

export default function BrowseClient({ initialProvider }: { initialProvider: string }) {
  const [provider, setProvider] = useState(initialProvider);

  const visibleVehicles = useMemo(() => vehicles.filter((vehicle) => provider === "all" || (provider === "office" && vehicle.provider === "Rental Office") || (provider === "driver" && vehicle.provider === "Private Driver")), [provider]);

  return (
    <main className="flex-1 bg-[#090a0d]">
      <div className="mx-auto max-w-7xl px-6 py-10 sm:px-10 md:py-14">
        <div className="mb-8"><p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#ffd015]">Find your ride</p><h1 className="mt-2 text-3xl font-extrabold tracking-tight text-[#f7f7f3]">Browse Vehicles</h1><p className="mt-2 text-sm text-[#858994]">Compare rental offices and private drivers in one place.</p></div>
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="inline-flex rounded-lg border border-[#292d35] bg-[#1b1e24] p-1 text-xs font-semibold">
            {[{ value: "all", label: "All", href: "/browse" }, { value: "office", label: "Offices", href: "/browse?provider=office" }, { value: "driver", label: "Private Drivers", href: "/browse?provider=driver" }].map((tab) => <Link key={tab.value} href={tab.href} aria-current={provider === tab.value ? "page" : undefined} onClick={() => setProvider(tab.value)} className={`inline-flex cursor-pointer rounded-md px-4 py-2 transition ${provider === tab.value ? "bg-[#ffd015] text-[#151515]" : "text-[#a5a8b0] hover:text-[#f7f7f3]"}`}>{tab.label}</Link>)}
          </div>
          <span className="text-xs text-[#858994]">Showing {visibleVehicles.length} of {vehicles.length} vehicles</span>
        </div>
        <section aria-label="Available vehicles">
          {visibleVehicles.length > 0 ? <div className="grid gap-4 md:grid-cols-3">{visibleVehicles.map((vehicle) => <BrowseVehicleCard key={vehicle.name} vehicle={vehicle} />)}</div> : <div className="rounded-xl border border-dashed border-[#30343c] px-6 py-16 text-center"><h2 className="text-sm font-bold text-[#f7f7f3]">No vehicles match this choice</h2><p className="mt-2 text-xs text-[#858994]">Choose another provider to see more vehicles.</p></div>}
        </section>
      </div>
    </main>
  );
}