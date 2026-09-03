import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getDateRange } from "../../helpers";

async function getCarId(params: Promise<{ id: string }>) {
  const { id } = await params;
  const carId = Number(id);
  return Number.isInteger(carId) && carId > 0 ? carId : undefined;
}

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const carId = await getCarId(params);
    if (!carId) return NextResponse.json({ status: 400, message: "Invalid car ID." }, { status: 400 });
    const car = await prisma.car.findUnique({ where: { id: carId } });
    if (!car) return NextResponse.json({ status: 404, message: "Car not found." }, { status: 404 });
    const unavailableDates = await prisma.unavailableDate.findMany({ where: { carId }, orderBy: { startDate: "asc" } });
    return NextResponse.json({ status: 200, data: unavailableDates });
  } catch (error) {
    console.error("Failed to fetch unavailable dates:", error);
    return NextResponse.json({ status: 500, message: "Failed to fetch unavailable dates." });
  }
}

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const carId = await getCarId(params);
    if (!carId) return NextResponse.json({ status: 400, message: "Invalid car ID." }, { status: 400 });
    const car = await prisma.car.findUnique({ where: { id: carId } });
    if (!car) return NextResponse.json({ status: 404, message: "Car not found." }, { status: 404 });
    const body = await request.json();
    const dateRange = getDateRange(body);
    if (!dateRange) return NextResponse.json({ status: 400, message: "A valid date or date range is required." }, { status: 400 });

    const duplicate = await prisma.unavailableDate.findFirst({ where: { carId, startDate: dateRange.startDate, endDate: dateRange.endDate } });
    if (duplicate) return NextResponse.json({ status: 409, message: "This unavailable date already exists." }, { status: 409 });
    const unavailableDate = await prisma.unavailableDate.create({ data: { car: { connect: { id: carId } }, ...dateRange } });
    return NextResponse.json({ status: 201, data: unavailableDate }, { status: 201 });
  } catch (error) {
    console.error("Failed to create unavailable date:", error);
    return NextResponse.json({ status: 500, message: "Failed to create unavailable date." });
  }
}