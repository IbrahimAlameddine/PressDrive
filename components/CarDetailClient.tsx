"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";

type CarDetail = {
  id: number;
  brand: string;
  model: string;
  year: number;
  seats: number;
  transmission: string;
  fuelType: string;
  pricePerDay: number | string;
  category: string;
  owner: {
    username: string;
  };
  images: {
    url: string;
  }[];
};

export default function CarDetailClient({
  car,
}: {
  car: CarDetail;
}) {
  const [activeImage, setActiveImage] = useState(0);
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const images = car.images || [];
  const price = Number(car.pricePerDay || 0);

  const provider =
    /driver|private/i.test(car.category)
      ? "Private Driver"
      : "Rental Office";

  const specs = [
    ["Category", car.category],
    ["Year", car.year],
    ["Seats", `${car.seats} seats`],
    ["Fuel", car.fuelType],
    ["Transmission", car.transmission],
    ["Provider", car.owner.username],
  ];

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="flex-1 bg-[#090a0d]">
      {/* Back */}
      <div className="border-b border-white/5">
        <div className="mx-auto max-w-6xl px-6 py-4 sm:px-10">
          <Link
            href="/browse"
            className="text-xs text-[#9296a0] hover:text-[#ffd015]"
          >
            ← Back to Browse
          </Link>
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-8 sm:px-10 lg:grid-cols-[minmax(0,1fr)_19rem]">
        {/* Vehicle */}
        <div className="min-w-0 space-y-5">
          {/* Images */}
          <section>
            {images.length ? (
              <>
                <div className="aspect-[1.8] overflow-hidden rounded-xl border border-[#292d35] bg-[#191b20]">
                  <img
                    src={images[activeImage].url}
                    alt={`${car.brand} ${car.model}`}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="mt-3 grid grid-cols-6 gap-2">
                  {images.map((image, index) => (
                    <button
                      key={image.url}
                      type="button"
                      onClick={() => setActiveImage(index)}
                      className={`aspect-[1.35] overflow-hidden rounded-md border-2 ${
                        activeImage === index
                          ? "border-[#ffd015]"
                          : "border-transparent opacity-60 hover:opacity-100"
                      }`}
                    >
                      <img
                        src={image.url}
                        alt={`${car.brand} ${car.model}`}
                        className="h-full w-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <div className="flex aspect-[1.8] items-center justify-center rounded-xl border border-[#292d35] bg-[#191b20] text-sm text-[#737781]">
                No images available
              </div>
            )}
          </section>

          {/* Provider */}
          <section className="flex items-center gap-4 rounded-xl border border-[#292d35] bg-[#191919] p-4">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-[#3a3313] text-xl font-extrabold text-[#ffd015]">
              {car.brand[0]}
            </div>

            <div>
              <span className="rounded-full bg-[#2b2d31] px-2 py-1 text-[9px] text-[#c0c1c5]">
                {provider}
              </span>

              <h1 className="mt-2 text-sm font-bold text-[#f7f7f3]">
                {car.owner.username}
              </h1>
            </div>
          </section>

          {/* Car information */}
          <section className="rounded-xl border border-[#292d35] bg-[#191919] p-5">
            <h2 className="text-lg font-bold text-[#f7f7f3]">
              {car.brand} {car.model}
            </h2>

            <dl className="mt-5 grid gap-3 sm:grid-cols-3">
              {specs.map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-xl bg-[#252525] px-3.5 py-3"
                >
                  <dt className="text-[10px] text-[#858994]">
                    {label}
                  </dt>

                  <dd className="mt-1 text-sm font-semibold text-[#f3f3ef]">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        </div>

        {/* Booking */}
        <aside className="h-fit rounded-xl border border-[#292d35] bg-[#191919] p-5 lg:sticky lg:top-5">
          <p className="text-3xl font-extrabold text-[#ffd015]">
            ${price.toFixed(2)}
            <span className="text-xs font-normal text-[#858994]">
              {" "}
              / day
            </span>
          </p>

          <p className="mt-1 text-xs text-[#737781]">
            Price per day
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-6 space-y-4"
          >
            <label className="block text-[10px] font-semibold uppercase tracking-wider text-[#858994]">
              Pickup Date

              <input
                required
                type="date"
                value={pickupDate}
                onChange={(event) =>
                  setPickupDate(event.target.value)
                }
                className="mt-2 h-10 w-full rounded-lg border border-[#383838] bg-[#252525] px-3 text-xs text-[#e8e8e4] outline-none focus:border-[#ffd015]"
              />
            </label>

            <label className="block text-[10px] font-semibold uppercase tracking-wider text-[#858994]">
              Return Date

              <input
                required
                type="date"
                min={pickupDate}
                value={returnDate}
                onChange={(event) =>
                  setReturnDate(event.target.value)
                }
                className="mt-2 h-10 w-full rounded-lg border border-[#383838] bg-[#252525] px-3 text-xs text-[#e8e8e4] outline-none focus:border-[#ffd015]"
              />
            </label>

            <div className="rounded-xl bg-[#252525] p-3 text-xs text-[#858994]">
              <div className="flex justify-between">
                <span>Price per day</span>
                <span>${price.toFixed(2)}</span>
              </div>

              <div className="mt-3 flex justify-between border-t border-[#3a3a3a] pt-3 font-bold text-[#f7f7f3]">
                <span>Total</span>
                <span className="text-[#ffd015]">
                  Calculated after booking
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="h-12 w-full rounded-xl bg-[#ffd015] text-sm font-bold text-[#151515] hover:bg-[#ffe05b]"
            >
              Confirm Booking
            </button>

            {submitted && (
              <p className="text-center text-[10px] text-[#64666d]">
                Booking request submitted.
              </p>
            )}
          </form>
        </aside>
      </div>
    </main>
  );
}
