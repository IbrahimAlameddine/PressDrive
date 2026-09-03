import BrowseClient from "../../components/BrowseClient";
import { prisma } from "@/lib/prisma";


export default async function BrowsePage({ searchParams }: { searchParams: Promise<{ provider?: string }> }) {
  const { provider } = await searchParams;
  const initialProvider = provider === "office" || provider === "driver" ? provider : "all";

  const cars = await prisma.car.findMany({
    where: { owner: { role: "PROVIDER" } },
    include: {
      owner: { select: { username: true } },
      images: { orderBy: { id: "asc" }, take: 1, select: { url: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  const vehicles = cars.map((car) => {
    const normalizedCategory = (car.category || "Sedan").toLowerCase();
    const type = normalizedCategory.includes("driver") || normalizedCategory.includes("private") ? "Private Driver" : "Rental Office";

    return {
      id: car.id,
      image: car.images[0].url,
      type,
      name: `${car.brand} ${car.model}`,
      detail: `${car.owner.username} · ${car.seats} seats · ${car.transmission}`,
      price: `$${Number(car.pricePerDay).toFixed(2)}`,
      provider: car.owner.username,
    };
  });

  return <BrowseClient initialProvider={initialProvider} cars={vehicles} />;
}