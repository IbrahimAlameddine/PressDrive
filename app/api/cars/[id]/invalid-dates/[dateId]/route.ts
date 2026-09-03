import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string; dateId: string }> }) {
  try {
    const { id, dateId } = await params;
    const carId = Number(id);
    const unavailableDateId = Number(dateId);
    if (!Number.isInteger(carId) || carId <= 0 || !Number.isInteger(unavailableDateId) || unavailableDateId <= 0) {
      return NextResponse.json({ status: 400, message: "Invalid car or date ID." }, { status: 400 });
    }
    const car = await prisma.car.findUnique({ where: { id: carId } });
    if (!car) return NextResponse.json({ status: 404, message: "Car not found." }, { status: 404 });
    const unavailableDate = await prisma.unavailableDate.findFirst({ where: { id: unavailableDateId, carId } });
    if (!unavailableDate) return NextResponse.json({ status: 404, message: "Unavailable date not found." }, { status: 404 });
    await prisma.unavailableDate.delete({ where: { id: unavailableDateId } });
    return NextResponse.json({ status: 200, message: "Unavailable date deleted successfully" });
  } catch (error) {
    console.error("Failed to delete unavailable date:", error);
    return NextResponse.json({ status: 500, message: "Failed to delete unavailable date." });
  }
}