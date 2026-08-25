import Link from "next/link";

export type Vehicle = {
  image: string;
  type: string;
  name: string;
  detail: string;
  price: string;
};

export default function VehicleCard({ image, type, name, detail, price }: Vehicle) {
  const rateUnit = type === "Private Driver" ? "/hour" : "/day";
  const detailsHref = name === "Toyota Corolla '23" ? "/browse/corolla" : "#details";

  return (
    <article className="mx-auto flex h-full w-full max-w-sm flex-col overflow-hidden rounded-xl border border-[#292d35] bg-[#111318] transition hover:border-[#665714]">
      <div className="h-64 shrink-0 bg-cover bg-center" style={{ backgroundImage: `url('${image}')` }} role="img" aria-label={name} />
      <div className="flex flex-1 flex-col p-4">
        <span className={`inline-flex w-fit rounded-full px-2.5 py-1 text-[9px] ${type === "Private Driver" ? "border border-[#7f6812] bg-[#2a260d] text-[#f4c817]" : "bg-[#282b31] text-[#b8bbc2]"}`}>{type}</span>
        <h3 className="mt-3 text-sm font-bold text-[#f3f3ef]">{name}</h3>
        <p className="mt-1 text-[11px] text-[#858994]">{detail}</p>
        <footer className="mt-auto flex items-center justify-between pt-6">
          <p className="text-sm font-bold text-[#ffd015]">
            {price}
            <span className="text-[10px] font-normal text-[#858994]">{rateUnit}</span>
          </p>
          <Link href={detailsHref} className="inline-flex items-center rounded-md bg-[#ffd015] px-3 py-2 text-[10px] font-bold text-[#151515] hover:bg-[#ffe05b]">Details</Link>
        </footer>
      </div>
    </article>
  );
}