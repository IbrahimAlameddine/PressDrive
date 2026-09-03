import { notFound } from "next/navigation";
import CarDetailClient from "@/components/CarDetailClient";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function BrowseCarDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const carId = Number(id);

  if (!Number.isInteger(carId)) {
    notFound();
  }

  const car = await prisma.car.findFirst({
    where: {
      id: carId,
      owner: { role: "PROVIDER" },
    },
    include: {
      owner: { select: { username: true } },
      images: {
        orderBy: { id: "asc" },
        select: { url: true },
      },
    },
  });

  if (!car) {
    notFound();
  }

  return (
    <CarDetailClient
      car={{
        id: car.id,
        brand: car.brand,
        model: car.model,
        year: car.year,
        seats: car.seats,
        transmission: car.transmission,
        fuelType: car.fuelType,
        pricePerDay: Number(car.pricePerDay),
        category: car.category,
        owner: { username: car.owner.username },
        images: car.images,
      }}
    />
  );
}
