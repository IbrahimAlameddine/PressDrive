<<<<<<< HEAD
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
=======
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <Image
          className="dark:invert h-5 w-[100px]"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            To get started, edit the{" "}
            <code className="rounded bg-black/[.06] px-1.5 py-0.5 font-mono text-[0.9em] dark:bg-white/[.08]">
              page.tsx
            </code>{" "}
            file.
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Looking for a starting point or more instructions? Head over to{" "}
            <a
              href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Templates
            </a>{" "}
            or the{" "}
            <a
              href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Learning
            </a>{" "}
            center.
          </p>
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <a
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert h-[14px] w-4"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={16}
              height={14}
            />
            Deploy Now
          </a>
          <a
            className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
        </div>
      </main>
    </div>
  );
}
>>>>>>> 8800b54234da290b8f4f91ee0b9921a19c4c9907
