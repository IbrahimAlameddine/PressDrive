import Link from "next/link";

export type BrowseVehicle = {
  image: string;
  provider: "Rental Office" | "Private Driver";
  vehicleType: "Sedan" | "SUV" | "Van" | "Luxury" | "Economy";
  name: string;
  detail: string;
  service: "Self-Drive" | "With Driver" | "Both options";
  passengers: number;
  price: number;
};

export default function BrowseVehicleCard({ vehicle }: { vehicle: BrowseVehicle }) {
  return (
    <article className="overflow-hidden rounded-xl border border-[#292d35] bg-[#111318] transition hover:border-[#665714]">
      <div className="h-36 bg-cover bg-center" style={{ backgroundImage: `url('${vehicle.image}')` }} role="img" aria-label={vehicle.name} />
      <div className="p-4">
        <span className={`inline-flex rounded-full px-2.5 py-1 text-[9px] ${vehicle.provider === "Private Driver" ? "border border-[#7f6812] bg-[#2a260d] text-[#f4c817]" : "bg-[#282b31] text-[#b8bbc2]"}`}>
          {vehicle.provider}
        </span>
        <h2 className="mt-3 text-sm font-bold text-[#f3f3ef]">{vehicle.name}</h2>
        <p className="mt-1 text-[11px] text-[#858994]">{vehicle.detail} · {vehicle.passengers} seats</p>
        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm font-bold text-[#ffd015]">${vehicle.price}<span className="text-[10px] font-normal text-[#858994]">/day</span></p>
          <div className="flex gap-2">
            <Link href="#details" className="inline-flex items-center rounded-md border border-[#30343c] px-2.5 py-2 text-[10px] text-[#b8bbc2] hover:border-[#ffd015] hover:text-[#ffd015]">Details</Link>
            <Link href="#book" className="inline-flex items-center rounded-md bg-[#ffd015] px-3 py-2 text-[10px] font-bold text-[#151515] hover:bg-[#ffe05b]">Book</Link>
          </div>
        </div>
      </div>
    </article>
  );
}