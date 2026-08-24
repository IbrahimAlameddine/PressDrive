"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { carsDatabase } from "@/MockData/cars";
import { Car } from "@/types/cars";

export default function AiRecommendationPage() {
  const [step, setStep] = useState(1);

  const [service, setService] = useState<Car["service"] | "">("");
  const [seats, setSeats] = useState(5);
  const [style, setStyle] = useState<Car["style"] | "">("");

  const [resultCar, setResultCar] = useState<Car | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  function findCar(selectedStyle: Car["style"]) {
    setStyle(selectedStyle);
    setIsAnalyzing(true);
    setStep(4);

    setTimeout(() => {
      const cars = Object.values(carsDatabase);

      let car = cars.find(
        (item) =>
          item.service === service &&
          item.style === selectedStyle &&
          item.seats >= seats
      );

      if (!car) {
        car = cars.find(
          (item) =>
            item.service === service &&
            item.seats >= seats
        );
      }

      if (!car) {
        car = cars.find(
          (item) =>
            item.style === selectedStyle &&
            item.seats >= seats
        );
      }

      if (!car) {
        car = cars[0];
      }

      setResultCar(car);
      setIsAnalyzing(false);
    }, 1200);
  }

  function startAgain() {
    setStep(1);
    setService("");
    setSeats(5);
    setStyle("");
    setResultCar(null);
  }

  return (
    <main className="min-h-[calc(100vh-5rem)] flex flex-col justify-center bg-[#090a0d] px-6 py-4 text-white">

      <div className="mx-auto w-full max-w-4xl">

        {/* Header */}
        <div className="mb-4 text-center">
          <p className="text-xs font-semibold tracking-wider text-[#ffd015]">
            PressDrive Intelligence
          </p>

          <h1 className="mt-1 text-2xl sm:text-3xl font-bold">
            AI Vehicle Matcher
          </h1>

          <p className="mt-1 text-xs sm:text-sm text-gray-400">
            Answer 3 questions and we will find the best vehicle for you.
          </p>
        </div>

        {/* Card - تم زيادة الطول عبر الـ padding وإضافة التوهج والإطار الذهبي */}
        <div className="rounded-2xl border border-[#ffd015]/40 bg-[#111318] p-8 sm:p-12 shadow-[0_0_35px_rgba(255,208,21,0.15)]">

          {/* Step 1 */}
          {step === 1 && (
            <div>
              <p className="text-xs font-medium text-[#ffd015]">
                Step 1 of 3
              </p>

              <h2 className="mt-1 text-xl font-bold">
                How would you like to travel?
              </h2>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">

                <button
                  onClick={() => {
                    setService("Rental Office");
                    setStep(2);
                  }}
                  className="rounded-xl border border-[#292d35] bg-[#090a0d] p-6 text-left transition hover:border-[#ffd015] hover:bg-[#15181f]"
                >
                  <p className="font-bold text-base">
                    🏢 Rental Office
                  </p>

                  <p className="mt-1 text-xs text-gray-400">
                    Choose a self-drive vehicle.
                  </p>
                </button>

                <button
                  onClick={() => {
                    setService("Private Driver");
                    setStep(2);
                  }}
                  className="rounded-xl border border-[#292d35] bg-[#090a0d] p-6 text-left transition hover:border-[#ffd015] hover:bg-[#15181f]"
                >
                  <p className="font-bold text-base">
                    👤 Private Driver
                  </p>

                  <p className="mt-1 text-xs text-gray-400">
                    Book a driver with a vehicle.
                  </p>
                </button>

              </div>
            </div>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <div>
              <p className="text-xs font-medium text-[#ffd015]">
                Step 2 of 3
              </p>

              <h2 className="mt-1 text-xl font-bold">
                How many seats do you need?
              </h2>

              <div className="mt-6 grid grid-cols-3 gap-4">
                {[2, 5, 7].map((number) => (
                  <button
                    key={number}
                    onClick={() => {
                      setSeats(number);
                      setStep(3);
                    }}
                    className="rounded-xl border border-[#292d35] bg-[#090a0d] py-5 font-bold transition hover:border-[#ffd015] hover:bg-[#15181f]"
                  >
                    {number} Seats
                  </button>
                ))}
              </div>

              <button
                onClick={() => setStep(1)}
                className="mt-6 text-xs text-gray-400 hover:text-white"
              >
                ← Back
              </button>
            </div>
          )}

          {/* Step 3 */}
          {step === 3 && (
            <div>
              <p className="text-xs font-medium text-[#ffd015]">
                Step 3 of 3
              </p>

              <h2 className="mt-1 text-xl font-bold">
                What is your trip style?
              </h2>

              <div className="mt-6 grid gap-4 sm:grid-cols-3">

                <button
                  onClick={() => findCar("economy")}
                  className="rounded-xl border border-[#292d35] bg-[#090a0d] p-5 text-left transition hover:border-[#ffd015] hover:bg-[#15181f]"
                >
                  <p className="font-bold">
                    Economy & City
                  </p>

                  <p className="mt-1 text-xs text-gray-400">
                    Good for daily trips.
                  </p>
                </button>

                <button
                  onClick={() => findCar("suv")}
                  className="rounded-xl border border-[#292d35] bg-[#090a0d] p-5 text-left transition hover:border-[#ffd015] hover:bg-[#15181f]"
                >
                  <p className="font-bold">
                    SUV & Family
                  </p>

                  <p className="mt-1 text-xs text-gray-400">
                    Spacious and comfortable.
                  </p>
                </button>

                <button
                  onClick={() => findCar("luxury")}
                  className="rounded-xl border border-[#292d35] bg-[#090a0d] p-5 text-left transition hover:border-[#ffd015] hover:bg-[#15181f]"
                >
                  <p className="font-bold">
                    Luxury
                  </p>

                  <p className="mt-1 text-xs text-gray-400">
                    Premium and comfortable.
                  </p>
                </button>

              </div>

              <button
                onClick={() => setStep(2)}
                className="mt-6 text-xs text-gray-400 hover:text-white"
              >
                ← Back
              </button>
            </div>
          )}

          {/* Step 4 */}
          {step === 4 && (
            <div className="py-4 text-center">

              {isAnalyzing && (
                <div className="py-12">
                  <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-gray-700 border-t-[#ffd015]" />

                  <h2 className="mt-4 font-bold text-lg">
                    AI is analyzing...
                  </h2>

                  <p className="mt-1 text-xs text-gray-400">
                    Finding the best vehicle for you.
                  </p>
                </div>
              )}

              {!isAnalyzing && resultCar && (
                <div>

                  <p className="text-sm font-bold text-[#ffd015]">
                    ✨ Best Match Found
                  </p>

                  <div className="mt-6 overflow-hidden rounded-xl border border-[#292d35] bg-[#090a0d] text-left">

                    <Image
                      src={resultCar.images[0]}
                      alt={resultCar.model}
                      width={700}
                      height={350}
                      className="h-56 w-full object-cover"
                    />

                    <div className="p-6">

                      <p className="text-xs text-[#ffd015]">
                        {resultCar.service}
                      </p>

                      <h3 className="mt-1 text-xl font-bold">
                        {resultCar.make} {resultCar.model}
                      </h3>

                      <p className="mt-1 text-xs text-gray-400">
                        {resultCar.year} · {resultCar.seats} Seats · ⭐{" "}
                        {resultCar.rating}
                      </p>

                      <div className="mt-5 flex items-center justify-between border-t border-[#292d35] pt-4">

                        <p className="font-bold text-lg text-[#ffd015]">
                          ${resultCar.price}
                          <span className="text-xs text-gray-400">
                            {" "} / day
                          </span>
                        </p>

                        <Link
                          href={`/cars/${resultCar.id}`}
                          className="rounded-lg bg-[#ffd015] px-5 py-2.5 text-xs font-bold text-black transition hover:bg-[#ffe05b]"
                        >
                          View & Book
                        </Link>

                      </div>

                    </div>
                  </div>

                  <button
                    onClick={startAgain}
                    className="mt-6 text-xs text-gray-400 underline hover:text-white"
                  >
                    Start Over
                  </button>

                </div>
              )}

            </div>
          )}

        </div>
      </div>
    </main>
  );
}