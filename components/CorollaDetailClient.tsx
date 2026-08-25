"use client";

import Link from "next/link";
import { useState } from "react";

const gallery = [
  "/cars/corolla/corolla1.jpg",
  "/cars/corolla/corolla2.jpg",
  "/cars/corolla/corolla3.jpg",
  "/cars/corolla/corolla4.jpg",
  "/cars/corolla/corolla5.jpg",
  "/cars/corolla/corolla6.jpg",
];

const specifications = [
  ["Category", "Economy Sedan"],
  ["Year", "2023"],
  ["Seats", "5 seats"],
  ["Fuel", "Petrol"],
  ["Transmission", "Automatic"],
  ["Rating", "4.7 star"],
];

function formatDate(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function getToday() {
  return formatDate(new Date());
}

function getMaxReturnDate(dateValue: string) {
  if (!dateValue) return "";

  const [year, month, day] = dateValue.split("-").map(Number);
  const nextMonth = new Date(year, month, 1);
  const lastDay = new Date(nextMonth.getFullYear(), nextMonth.getMonth() + 1, 0).getDate();
  const date = new Date(nextMonth.getFullYear(), nextMonth.getMonth(), Math.min(day, lastDay));

  return formatDate(date);
}

function getRentalDays(pickupDate: string, returnDate: string) {
  if (!pickupDate || !returnDate) return 3;

  const difference = Date.parse(returnDate) - Date.parse(pickupDate);
  return difference > 0 ? Math.ceil(difference / 86400000) : 3;
}

export default function CorollaDetailClient() {
  const [activeImage, setActiveImage] = useState(0);
  const [pickupDate, setPickupDate] = useState(getToday);
  const [returnDate, setReturnDate] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const rentalDays = getRentalDays(pickupDate, returnDate);
  const rentalPrice = rentalDays * 35;

  return (
    <main className="flex-1 bg-[#090a0d]">
      <div className="border-b border-white/5">
        <div className="mx-auto max-w-6xl px-6 py-4 sm:px-10">
          <Link href="/browse" className="text-xs text-[#9296a0] transition hover:text-[#ffd015]">&lt;- Back to Browse</Link>
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-8 sm:px-10 lg:grid-cols-[minmax(0,1fr)_19rem] lg:gap-8 lg:py-8">
        <div className="min-w-0 space-y-5">
          <section aria-label="Toyota Corolla gallery">
            <div className="aspect-[1.8] overflow-hidden rounded-xl border border-[#292d35] bg-[#191b20] sm:aspect-[2.05]">
              <div className="h-full w-full bg-cover bg-center" style={{ backgroundImage: `url('${gallery[activeImage]}')` }} role="img" aria-label={`Toyota Corolla view ${activeImage + 1}`} />
            </div>
            <div className="mt-3 grid grid-cols-6 gap-2">
              {gallery.map((image, index) => (
                <button key={image} type="button" onClick={() => setActiveImage(index)} aria-label={`Show Corolla image ${index + 1}`} className={`aspect-[1.35] overflow-hidden rounded-md border-2 bg-[#191b20] ${activeImage === index ? "border-[#ffd015]" : "border-transparent opacity-60 hover:opacity-100"}`}>
                  <span className="block h-full w-full bg-cover bg-center" style={{ backgroundImage: `url('${image}')` }} />
                </button>
              ))}
            </div>
          </section>

          <section className="flex items-center gap-4 rounded-xl border border-[#292d35] bg-[#191919] p-4">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-[#3a3313] text-xl font-extrabold text-[#ffd015]">C</div>
            <div>
              <span className="rounded-full bg-[#2b2d31] px-2 py-1 text-[9px] text-[#c0c1c5]">Rental Office</span>
              <h1 className="mt-2 text-sm font-bold text-[#f7f7f3]">City Motors</h1>
              <p className="text-[11px] text-[#737781]">★★★★☆ 4.7 · 42 reviews</p>
            </div>
          </section>

          <section className="rounded-xl border border-[#292d35] bg-[#191919] p-5">
            <h2 className="text-lg font-bold text-[#f7f7f3]">Specifications</h2>
            <dl className="mt-5 grid gap-3 sm:grid-cols-3">
              {specifications.map(([label, value]) => (
                <div key={label} className="rounded-xl bg-[#252525] px-3.5 py-3">
                  <dt className="text-[10px] text-[#858994]">{label}</dt>
                  <dd className="mt-1 text-sm font-semibold text-[#f3f3ef]">{value}</dd>
                </div>
              ))}
            </dl>
          </section>

        </div>

        <aside className="h-fit rounded-xl border border-[#292d35] bg-[#191919] p-5 lg:sticky lg:top-5">
          <p className="text-3xl font-extrabold text-[#ffd015]">$35 <span className="text-xs font-normal text-[#858994]">/ day</span></p>
          <p className="mt-1 text-xs text-[#737781]">Simple daily pricing</p>
          <form className="mt-6 space-y-4" onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }}>
            <label className="block text-[10px] font-semibold uppercase tracking-wider text-[#858994]">Pickup Date<input required type="date" value={pickupDate} onChange={(event) => setPickupDate(event.target.value)} className="mt-2 h-10 w-full rounded-lg border border-[#383838] bg-[#252525] px-3 text-xs text-[#e8e8e4] outline-none focus:border-[#ffd015]" /></label>
            <label className="block text-[10px] font-semibold uppercase tracking-wider text-[#858994]">Return Date<input required type="date" min={pickupDate} max={getMaxReturnDate(pickupDate)} value={returnDate} onChange={(event) => setReturnDate(event.target.value)} className="mt-2 h-10 w-full rounded-lg border border-[#383838] bg-[#252525] px-3 text-xs text-[#e8e8e4] outline-none focus:border-[#ffd015]" /></label>
            <div className="rounded-xl bg-[#252525] p-3 text-xs text-[#858994]">
              <div className="flex justify-between"><span>{rentalDays} days x $35</span><span>${rentalPrice}</span></div>
              <div className="mt-3 flex justify-between border-t border-[#3a3a3a] pt-3 font-bold text-[#f7f7f3]"><span>Total</span><span className="text-[#ffd015]">${rentalPrice}</span></div>
            </div>
            <button type="submit" className="h-12 w-full rounded-xl bg-[#ffd015] text-sm font-bold text-[#151515] transition hover:bg-[#ffe05b]">Confirm Booking</button>
            <p className="text-center text-[10px] text-[#64666d]">{submitted ? "Request received. City Motors will contact you shortly." : "You will be connected with City Motors"}</p>
          </form>
        </aside>
      </div>
    </main>
  );
}