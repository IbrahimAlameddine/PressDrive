import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getDate } from "../helpers";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const carId = Number(body?.carId);
    const startDate = getDate(body?.start);
    const endDate = getDate(body?.end);

    if (
      !Number.isInteger(carId) ||
      carId <= 0 ||
      !startDate ||
      !endDate ||
      endDate < startDate
    ) {
      return NextResponse.json(
        { status: 400, message: "A valid car and date range are required." },
        { status: 400 },
      );
    }

    const car = await prisma.car.findUnique({ where: { id: carId } });
    if (!car) {
      return NextResponse.json(
        { status: 404, message: "Car not found." },
        { status: 404 },
      );
    }

    const unavailableDates = await prisma.unavailableDate.findMany({
      where: {
        carId,
        startDate: { lt: endDate },
        endDate: { gt: startDate },
      },
      orderBy: { startDate: "asc" },
    });

    const available = unavailableDates.length === 0;
    const message = available
      ? "The car is available for the selected dates."
      : "This car is unavailable for the selected dates.";

    return NextResponse.json({
      status: 200,
      message,
      data: {
        available,
        message,
        unavailableDates: unavailableDates.map((unavailableDate) => ({
          start: unavailableDate.startDate.toISOString().slice(0, 10),
          end: unavailableDate.endDate.toISOString().slice(0, 10),
        })),
      },
    });
  } catch (error) {
    console.error("Failed to check car availability:", error);
    return NextResponse.json(
      { status: 500, message: "Failed to check car availability." },
      { status: 500 },
    );
  }
}