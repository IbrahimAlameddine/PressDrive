import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { fuelTypes, getNumber, getText, transmissions } from "./helpers";

const ownerSelect = { id: true, username: true, email: true, phone: true, role: true };

export async function GET() {
  try {
    const cars = await prisma.car.findMany({
      orderBy: { createdAt: "desc" },
      include: { owner: { select: ownerSelect } },
    });
    return NextResponse.json({ status: 200, data: cars });
  } catch (error) {
    console.error("Failed to fetch cars:", error);
    return NextResponse.json({ status: 500, message: "Failed to fetch cars." });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const brand = getText(body?.brand);
    const model = getText(body?.model);
    const category = getText(body?.category);
    const year = getNumber(body?.year);
    const seats = getNumber(body?.seats);
    const ownerId = getNumber(body?.ownerId);
    const pricePerDay = getNumber(body?.pricePerDay);
    const profitPerDay = getNumber(body?.profitPerDay);
    const transmission = getText(body?.transmission);
    const fuelType = getText(body?.fuelType);

    if (
      !brand || !model || !category || year === undefined || seats === undefined ||
      ownerId === undefined || pricePerDay === undefined || profitPerDay === undefined ||
      !transmissions.includes(transmission as (typeof transmissions)[number]) ||
      !fuelTypes.includes(fuelType as (typeof fuelTypes)[number])
    ) {
      return NextResponse.json(
        { status: 400, message: "All car fields are required and must be valid." },
        { status: 400 }
      );
    }

    const owner = await prisma.user.findUnique({ where: { id: ownerId } });
    if (!owner) return NextResponse.json({ status: 404, message: "Owner not found." }, { status: 404 });

    const car = await prisma.car.create({
      data: {
        brand, model, year, seats,
        transmission: transmission as (typeof transmissions)[number],
        pricePerDay, profitPerDay, category,
        fuelType: fuelType as (typeof fuelTypes)[number],
        owner: { connect: { id: ownerId } },
      },
      include: { owner: { select: ownerSelect } },
    });
    return NextResponse.json({ status: 201, data: car }, { status: 201 });
  } catch (error) {
    console.error("Failed to create car:", error);
    return NextResponse.json({ status: 500, message: "Failed to create car." });
  }
}