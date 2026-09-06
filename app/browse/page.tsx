import BrowseClient from "../../components/BrowseClient";
import { prisma } from "@/lib/prisma";


export default async function BrowsePage() {
  const cars = await prisma.car.findMany({
    where: { owner: { role: "PROVIDER" } },
    include: {
      owner: { select: { username: true } },
      images: { orderBy: { id: "asc" }, take: 1, select: { url: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  const vehicles = cars.map((car) => {
    return {
      id: car.id,
      image: car.images[0]?.url ?? "/cars/sedan/sedan1.jpg",
      type: "Rental Office",
      name: `${car.brand} ${car.model}`,
      detail: `${car.owner.username} · ${car.seats} seats · ${car.transmission}`,
      price: `$${Number(car.pricePerDay).toFixed(2)}`,
      provider: car.owner.username,
    };
  });

  return <BrowseClient cars={vehicles} />;
}