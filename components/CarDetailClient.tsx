"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { axiosPost, ApiError } from "@/lib/axios";

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
    phone: string;
  };
  images: {
    url: string;
  }[];
};

type UnavailablePeriod = {
  start: string;
  end: string;
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
  const [error, setError] = useState("");
  const [unavailablePeriods, setUnavailablePeriods] = useState<UnavailablePeriod[]>([]);
  const [checkingAvailability, setCheckingAvailability] = useState(false);

  const images = car.images || [];
  const price = Number(car.pricePerDay || 0);

  const specs = [
    ["Category", car.category],
    ["Year", car.year],
    ["Seats", `${car.seats} seats`],
    ["Fuel", car.fuelType],
    ["Transmission", car.transmission],
    ["Provider", car.owner.username],
  ];

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setSubmitted(false);
    setError("");
    setUnavailablePeriods([]);

    if (!pickupDate || !returnDate) {
      setError("Please select both a start date and an end date.");
      return;
    }

    if (returnDate < pickupDate) {
      setError("The end date cannot be before the start date.");
      return;
    }

    setCheckingAvailability(true);

    try {
      const response = await axiosPost<
        { carId: number; start: string; end: string },
        {
          available: boolean;
          unavailableDates: UnavailablePeriod[];
        }
      >("/cars/availability", {
        carId: car.id,
        start: pickupDate,
        end: returnDate,
      });

      if (!response.data?.available) {
        setUnavailablePeriods(response.data?.unavailableDates ?? []);
        return;
      }

      const phone = car.owner.phone.replace(/\D/g, "");
      if (!phone) {
        setError("This rental office does not have a WhatsApp number.");
        return;
      }

      const message = [
        `Hello ${car.owner.username}, I would like to rent the ${car.brand} ${car.model} through PressDrive.`,
        `Dates: ${pickupDate} to ${returnDate}.`,
      ].join("\n\n");

      window.location.href = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    } catch (requestError) {
      setError(
        requestError instanceof ApiError
          ? requestError.message
          : "Unable to check car availability. Please try again.",
      );
    } finally {
      setCheckingAvailability(false);
    }
  };

  const formatDate = (value: string) =>
    new Date(`${value}T00:00:00Z`).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      timeZone: "UTC",
      year: "numeric",
    });

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
                Rental Office
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
              disabled={checkingAvailability}
              className="h-12 w-full rounded-xl bg-[#ffd015] text-sm font-bold text-[#151515] hover:bg-[#ffe05b]"
            >
              {checkingAvailability ? "Checking availability..." : "Book Now"}
            </button>

            {error && (
              <p className="text-center text-[10px] text-red-300">{error}</p>
            )}

            {unavailablePeriods.length > 0 && (
              <section className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-200">
                <p className="font-bold">Car unavailable</p>
                <p className="mt-2">The car is unavailable during:</p>
                <ul className="mt-2 list-disc space-y-1 pl-5">
                  {unavailablePeriods.map((period) => (
                    <li key={`${period.start}-${period.end}`}>
                      {formatDate(period.start)} → {formatDate(period.end)}
                    </li>
                  ))}
                </ul>
                <p className="mt-2">Please select different dates.</p>
              </section>
            )}

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
