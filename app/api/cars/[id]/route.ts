import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { fuelTypes, getNumber, getText, transmissions } from "../helpers";

const ownerSelect = { id: true, username: true, email: true, phone: true, role: true };

async function getCarId(params: Promise<{ id: string }>) {
  const { id } = await params;
  const carId = Number(id);
  return Number.isInteger(carId) && carId > 0 ? carId : undefined;
}

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const carId = await getCarId(params);
    if (!carId) return NextResponse.json({ status: 400, message: "Invalid car ID." }, { status: 400 });
    const car = await prisma.car.findUnique({ where: { id: carId }, include: { owner: { select: ownerSelect } } });
    if (!car) return NextResponse.json({ status: 404, message: "Car not found." }, { status: 404 });
    return NextResponse.json({ status: 200, data: car });
  } catch (error) {
    console.error("Failed to fetch car:", error);
    return NextResponse.json({ status: 500, message: "Failed to fetch car." });
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const carId = await getCarId(params);
    if (!carId) return NextResponse.json({ status: 400, message: "Invalid car ID." }, { status: 400 });
    const existingCar = await prisma.car.findUnique({ where: { id: carId } });
    if (!existingCar) return NextResponse.json({ status: 404, message: "Car not found." }, { status: 404 });

    const body = await request.json();
    const data: Record<string, unknown> = {};
    for (const field of ["brand", "model", "category"] as const) {
      if (field in body) {
        const value = getText(body[field]);
        if (!value) return NextResponse.json({ status: 400, message: `${field} must be valid.` }, { status: 400 });
        data[field] = value;
      }
    }
    for (const field of ["year", "seats", "pricePerDay", "profitPerDay"] as const) {
      if (field in body) {
        const value = getNumber(body[field]);
        if (value === undefined) return NextResponse.json({ status: 400, message: `${field} must be valid.` }, { status: 400 });
        data[field] = value;
      }
    }
    if ("transmission" in body) {
      const value = getText(body.transmission);
      if (!transmissions.includes(value as (typeof transmissions)[number])) return NextResponse.json({ status: 400, message: "Invalid transmission." }, { status: 400 });
      data.transmission = value;
    }
    if ("fuelType" in body) {
      const value = getText(body.fuelType);
      if (!fuelTypes.includes(value as (typeof fuelTypes)[number])) return NextResponse.json({ status: 400, message: "Invalid fuel type." }, { status: 400 });
      data.fuelType = value;
    }
    if ("ownerId" in body) {
      const ownerId = getNumber(body.ownerId);
      if (ownerId === undefined || !(await prisma.user.findUnique({ where: { id: ownerId } }))) return NextResponse.json({ status: 404, message: "Owner not found." }, { status: 404 });
      data.owner = { connect: { id: ownerId } };
    }

    const car = await prisma.car.update({ where: { id: carId }, data: data as never, include: { owner: { select: ownerSelect } } });
    return NextResponse.json({ status: 200, data: car });
  } catch (error) {
    console.error("Failed to update car:", error);
    return NextResponse.json({ status: 500, message: "Failed to update car." });
  }
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const carId = await getCarId(params);
    if (!carId) return NextResponse.json({ status: 400, message: "Invalid car ID." }, { status: 400 });
    const car = await prisma.car.findUnique({ where: { id: carId } });
    if (!car) return NextResponse.json({ status: 404, message: "Car not found." }, { status: 404 });
    await prisma.car.delete({ where: { id: carId } });
    return NextResponse.json({ status: 200, message: "Car deleted successfully" });
  } catch (error) {
    console.error("Failed to delete car:", error);
    return NextResponse.json({ status: 500, message: "Failed to delete car." });
  }
}