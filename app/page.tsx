import FeatureCard from "../components/FeatureCard";
import Icon from "../components/Icon";
import VehicleCard from "../components/VehicleCard";
import { prisma } from "@/lib/prisma";

const features = [
  {
    icon: "building",
    title: "Rental Offices",
    description: "Browse fleets from multiple offices. Choose self-drive or request an office driver.",
  },
  {
    icon: "user",
    title: "Private Drivers",
    description: "Book a private driver with their own vehicle. All-in-one service for any trip.",
  },
  {
    icon: "brain",
    title: "AI Recommendation",
    description: "Answer a few questions and the AI suggests the best vehicle for your needs.",
  },
] as const;

const fallbackImages = [
  "/cars/corolla/corolla1.jpg",
  "/cars/suv/suv1.jpg",
  "/cars/e-class/e-class1.jpg",
  "/cars/sedan/sedan1.jpg",
  "/cars/sunny/sunny1.jpg",
  "/cars/rogue/rogue1.jpg",
  "/cars/pilot/pilot1.jpg",
  "/cars/hyundai/hyundai1.jpg",
  "/cars/bmw/bmw1.jpg",
];

export default async function Home() {
  const cars = await prisma.car.findMany({
    where: { owner: { role: "PROVIDER" } },
    include: {
      owner: { select: { username: true } },
      images: { orderBy: { id: "asc" }, take: 1, select: { url: true } },
    },
    orderBy: { createdAt: "desc" },
    take: 3,
  });

  const vehicles = cars.map((car) => {
    const normalizedCategory = (car.category || "Sedan").toLowerCase();
    const type = normalizedCategory.includes("driver") || normalizedCategory.includes("private") ? "Private Driver" : "Rental Office";

    return {
      id: car.id,
      image: car.images[0]?.url ?? fallbackImages[car.id % fallbackImages.length],
      type,
      name: `${car.brand} ${car.model}`,
      detail: `${car.owner.username} · ${car.seats} seats · ${car.transmission}`,
      price: `$${Number(car.pricePerDay).toFixed(2)}`,
      provider: car.owner.username,
    };
  });

  return (
    <main className="flex-1">
      <section className="relative overflow-hidden border-b border-white/5 bg-[radial-gradient(circle_at_68%_38%,rgba(255,204,0,0.07),transparent_28%),linear-gradient(115deg,#090a0d_35%,#12130f_100%)]">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 sm:px-10 lg:grid-cols-[1fr_1fr] lg:gap-16 lg:py-24">
          <div className="max-w-md">
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#ffd000]">Car rental platform</p>
            <h1 className="font-sans text-5xl font-extrabold tracking-[-0.05em] text-[#fffdf4] sm:text-6xl">PressDrive</h1>
            <p className="mt-5 max-w-sm text-sm leading-6 text-[#a5a8b0]">Connecting customers with rental offices and private drivers — all in one place.</p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a href="/browse" className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#ffd015] px-5 text-xs font-bold text-[#111216] transition hover:bg-[#ffe05b]"><Icon name="search" />Browse Vehicles</a>
              <a href="#ai-assistant" className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-[#806b10] px-5 text-xs font-medium text-[#f5ce25] transition hover:bg-[#2a250e]"><Icon name="sparkles" />Try AI Assistant</a>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-[430px] lg:mx-0 lg:max-w-[520px] lg:justify-self-end">
            <div className="absolute -inset-5 rounded-[30px] bg-[#c3a314]/10 blur-2xl" />
            <div className="relative aspect-[1.45] overflow-hidden rounded-2xl bg-[#24251f] shadow-2xl shadow-black/40 lg:h-[320px] lg:aspect-auto" style={{ backgroundImage: "url('home.png')", backgroundPosition: "center", backgroundSize: "cover" }} aria-label="Driver inside a car" role="img" />
          </div>
        </div>
      </section>

      <section id="features" className="mx-auto grid max-w-7xl gap-5 px-6 py-14 sm:px-10 md:grid-cols-3 md:py-16">
        {features.map((feature) => (
          <FeatureCard key={feature.title} {...feature} />
        ))}
      </section>

      <section id="available" className="border-t border-white/5 bg-[#090a0d]">
        <div className="mx-auto max-w-7xl px-6 py-14 sm:px-10 md:py-16">
          <header className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-bold tracking-tight text-[#f7f7f3]">Available Now</h2>
            <a href="/browse" className="text-xs font-medium text-[#ffd015] hover:text-[#ffe47a]">
              View all <span aria-hidden="true">-&gt;</span>
            </a>
          </header>
          <div className="grid gap-4 md:grid-cols-3">
            {vehicles.length > 0 ? vehicles.map((vehicle) => (
              <VehicleCard key={vehicle.id ?? vehicle.name} {...vehicle} />
            )) : (
              <div className="md:col-span-3 rounded-xl border border-dashed border-[#30343c] px-6 py-12 text-center text-sm text-[#858994]">
                No vehicles are available yet. Add a provider car in the dashboard to populate the site.
              </div>
            )}
          </div>
        </div>
      </section>

      <section id="ai-assistant" className="border-y border-white/5 bg-[#0d0e10]">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 sm:px-10 md:py-20 lg:grid-cols-[1fr_360px] lg:gap-24">
          <div className="max-w-md">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#ffd015]">Smart recommendation</p>
            <h2 className="mt-5 text-4xl font-extrabold leading-[1.08] tracking-tight text-[#f7f7f3] sm:text-5xl">Not sure which<br />car to pick?</h2>
            <p className="mt-6 max-w-sm text-sm leading-6 text-[#9296a0]">Our AI asks about your destination, passengers, budget, and driver preference — then recommends the perfect vehicle.</p>
            <a href="/ai-assistant" className="mt-7 inline-flex h-11 items-center gap-2 rounded-full bg-[#ffd015] px-5 text-xs font-bold text-[#151515] transition hover:bg-[#ffe05b]"><Icon name="sparkles" />Try AI Assistant</a>
          </div>

          <div className="rounded-2xl border border-[#303238] bg-[#191a1b] p-5 shadow-2xl shadow-black/20">
            <header className="flex items-center justify-between border-b border-[#303238] pb-4">
              <div className="flex items-center gap-2 text-sm font-bold text-[#f7f7f3]"><span className="grid h-8 w-8 place-items-center rounded-lg bg-[#ffd015] text-[#151515]"><Icon name="sparkles" className="h-4 w-4" /></span>AI Assistant</div>
              <span className="h-2 w-2 rounded-full bg-[#15d982]" aria-label="Assistant online" />
            </header>
            <div className="space-y-3 pt-4 text-xs">
              <p className="w-fit rounded-full bg-[#2a2b2e] px-3 py-2 text-[#b0b2b8]">Where are you traveling?</p>
              <p className="ml-auto w-fit rounded-full bg-[#ffd015] px-3 py-2 text-[#151515]">Mountains, 3h from Beirut.</p>
              <p className="w-fit rounded-full bg-[#2a2b2e] px-3 py-2 text-[#b0b2b8]">How many passengers?</p>
              <p className="ml-auto w-fit rounded-full bg-[#ffd015] px-3 py-2 text-[#151515]">4 people</p>
              <div className="mt-5 rounded-xl border border-[#806b10] bg-[#302c18] p-4">
                <p className="text-[10px] font-semibold text-[#ffd015]">* Best Match</p>
                <p className="mt-2 text-sm font-bold text-[#f7f7f3]">Mitsubishi Pajero</p>
                <p className="mt-1 text-[11px] text-[#a9a596]">SUV 4x4 · 7 seats · $75/day</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
