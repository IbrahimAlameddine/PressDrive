import CorollaDetailClient from "../../../components/CorollaDetailClient";

export const metadata = {
  title: "Toyota Corolla '23 | PressDrive",
  description: "Book the Toyota Corolla from City Motors.",
};

export const dynamic = "force-dynamic";

export default async function CorollaPage() {
  await new Promise((resolve) => setTimeout(resolve, 450));

  return <CorollaDetailClient />;
}