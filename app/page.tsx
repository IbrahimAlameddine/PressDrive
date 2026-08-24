import Link from "next/link";

import FeatureCard from "@/components/FeatureCard";
import Icon from "@/components/Icon";
import VehicleCard from "@/components/VehicleCard";

const features = [
  {
    icon: "building",
    title: "Rental Offices",
    description:
      "Browse fleets from multiple offices. Choose self-drive or request an office driver.",
  },
  {
    icon: "user",
    title: "Private Drivers",
    description:
      "Book a private driver with their own vehicle. All-in-one service for any trip.",
  },
  {
    icon: "brain",
    title: "AI Recommendation",
    description:
      "Answer a few questions and the AI suggests the best vehicle for your needs.",
  },
];

const vehicles = [
  {
    image: "/cars/corolla/corolla1.jpg",
    type: "Rental Office",
    name: "Toyota Corolla '23",
    detail: "City Motors · Self-drive",
    price: "$35",
  },
  {
    image: "/cars/suv/suv1.jpg",
    type: "Private Driver",
    name: "Anas Azzam. — SUV",
    detail: "Driver included · 5 seats",
    price: "$15",
  },
  {
    image: "/cars/e-class/e-class1.jpg",
    type: "Rental Office",
    name: "Mercedes E-Class",
    detail: "Luxury Fleet · Self-drive",
    price: "$200",
  },
];

export default function Home() {
  return (
    <main>

      {/* Hero */}
      <section className="bg-[#090a0d] px-6 py-20 text-white">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2">

          <div>
            <p className="text-xs text-[#ffd015]">
              Car Rental Platform
            </p>

            <h1 className="mt-3 text-5xl font-bold">
              PressDrive
            </h1>

            <p className="mt-4 max-w-md text-sm text-gray-400">
              Connecting customers with rental offices and private drivers.
            </p>

            <div className="mt-6 flex gap-3">

              <Link
                href="/browse"
                className="rounded-lg bg-[#ffd015] px-5 py-3 text-xs font-bold text-black"
              >
                Browse Vehicles
              </Link>

              <Link
                href="/ai"
                className="rounded-lg border border-[#806b10] px-5 py-3 text-xs font-bold text-[#ffd015]"
              >
                Try AI Assistant
              </Link>

            </div>
          </div>

          <div className="h-80 rounded-xl bg-cover bg-center"
            style={{
              backgroundImage: "url('/home.png')",
            }}
          />

        </div>
      </section>

      {/* Features */}
      <section className="mx-auto grid max-w-7xl gap-5 px-6 py-14 md:grid-cols-3">

        {features.map((feature) => (
          <FeatureCard
            key={feature.title}
            {...feature}
          />
        ))}

      </section>

      {/* Available Cars */}
      <section className="bg-[#090a0d] px-6 py-14">

        <div className="mx-auto max-w-7xl">

          <div className="mb-6 flex justify-between">
            <h2 className="font-bold text-white">
              Available Now
            </h2>

            <Link
              href="/browse"
              className="text-xs text-[#ffd015]"
            >
              View All →
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-3">

            {vehicles.map((vehicle) => (
              <VehicleCard
                key={vehicle.name}
                {...vehicle}
              />
            ))}

          </div>

        </div>

      </section>

    </main>
  );
}