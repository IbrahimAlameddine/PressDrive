import FeatureCard from "./components/FeatureCard";
import Icon from "./components/Icon";
import VehicleCard from "./components/VehicleCard";

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

const vehicles = [
  {
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=900&q=85",
    type: "Rental Office",
    name: "Toyota Corolla '23",
    detail: "City Motors · Self-drive",
    price: "$35",
  },
  {
    image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=900&q=85",
    type: "Private Driver",
    name: "Karim J. — SUV",
    detail: "Driver included · 5 seats",
    price: "$90",
  },
  {
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=900&q=85",
    type: "Rental Office",
    name: "Mercedes E-Class",
    detail: "Luxury Fleet · Self-drive",
    price: "$120",
  },
];

export default function Home() {
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
              <a href="#features" className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-[#806b10] px-5 text-xs font-medium text-[#f5ce25] transition hover:bg-[#2a250e]"><Icon name="sparkles" />Try AI Assistant</a>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-[430px] lg:mx-0 lg:justify-self-end">
            <div className="absolute -inset-5 rounded-[30px] bg-[#c3a314]/10 blur-2xl" />
            <div className="relative aspect-[1.45] overflow-hidden rounded-2xl bg-[#24251f] shadow-2xl shadow-black/40" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1000&q=85')", backgroundPosition: "center", backgroundSize: "cover" }} aria-label="Driver inside a car" role="img" />
          </div>
        </div>
      </section>

      <section id="features" className="mx-auto grid max-w-7xl gap-5 px-6 py-14 sm:px-10 md:grid-cols-3 md:py-16">
        {features.map((feature) => <FeatureCard key={feature.title} {...feature} />)}
      </section>

      <section id="available" className="border-t border-white/5 bg-[#090a0d]">
        <div className="mx-auto max-w-7xl px-6 py-14 sm:px-10 md:py-16">
          <div className="mb-6 flex items-center justify-between"><h2 className="text-lg font-bold tracking-tight text-[#f7f7f3]">Available Now</h2><a href="/browse" className="text-xs font-medium text-[#ffd015] hover:text-[#ffe47a]">View all <span aria-hidden="true">→</span></a></div>
          <div className="grid gap-4 md:grid-cols-3">{vehicles.map((vehicle) => <VehicleCard key={vehicle.name} {...vehicle} />)}</div>
        </div>
      </section>
    </main>
  );
}
