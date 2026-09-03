import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getText } from "../../helpers";

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
    const images = await prisma.carImage.findMany({ where: { carId }, orderBy: { id: "asc" } });
    return NextResponse.json({ status: 200, data: images });
  } catch (error) {
    console.error("Failed to fetch car images:", error);
    return NextResponse.json({ status: 500, message: "Failed to fetch car images." });
  }
}

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const carId = await getCarId(params);
    if (!carId) return NextResponse.json({ status: 400, message: "Invalid car ID." }, { status: 400 });
    const car = await prisma.car.findUnique({ where: { id: carId } });
    if (!car) return NextResponse.json({ status: 404, message: "Car not found." }, { status: 404 });

    const images = await prisma.carImage.findMany({ where: { carId }, select: { id: true } });
    if (images.length >= 5) return NextResponse.json({ status: 409, message: "A car can have a maximum of 5 images." }, { status: 409 });

    const body = await request.json();
    const url = getText(body?.url);
    const isRelativePath = url.startsWith("/") && !url.startsWith("//");
    let parsedUrl: URL;
    try {
      parsedUrl = new URL(url, "http://localhost");
    } catch {
      return NextResponse.json({ status: 400, message: "A valid image URL is required." }, { status: 400 });
    }
    if (!isRelativePath && parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:") {
      return NextResponse.json({ status: 400, message: "A valid image URL is required." }, { status: 400 });
    }

    const image = await prisma.carImage.create({ data: { url, car: { connect: { id: carId } } } });
    return NextResponse.json({ status: 201, data: image }, { status: 201 });
  } catch (error) {
    console.error("Failed to create car image:", error);
    return NextResponse.json({ status: 500, message: "Failed to create car image." });
  }
}