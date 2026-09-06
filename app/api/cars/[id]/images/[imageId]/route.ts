import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

async function getIds(params: Promise<{ id: string; imageId: string }>) {
  const { id, imageId } = await params;
  const carId = Number(id);
  const imageIdNumber = Number(imageId);
  return Number.isInteger(carId) &&
    carId > 0 &&
    Number.isInteger(imageIdNumber) &&
    imageIdNumber > 0
    ? { carId, imageId: imageIdNumber }
    : undefined;
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string; imageId: string }> },
) {
  try {
    const ids = await getIds(params);
    if (!ids)
      return NextResponse.json(
        { status: 400, message: "Invalid car or image ID." },
        { status: 400 },
      );
    const car = await prisma.car.findUnique({ where: { id: ids.carId } });
    if (!car)
      return NextResponse.json(
        { status: 404, message: "Car not found." },
        { status: 404 },
      );
    const image = await prisma.carImage.findFirst({
      where: { id: ids.imageId, carId: ids.carId },
    });
    if (!image)
      return NextResponse.json(
        { status: 404, message: "Image not found." },
        { status: 404 },
      );
    await prisma.carImage.delete({ where: { id: ids.imageId } });
    return NextResponse.json({
      status: 200,
      message: "Image deleted successfully",
    });
  } catch (error) {
    console.error("Failed to delete car image:", error);
    return NextResponse.json({
      status: 500,
      message: "Failed to delete car image.",
    });
  }
}
