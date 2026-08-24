import { carsDatabase } from "@/MockData/cars";
import { notFound } from "next/navigation";
import CarDetailClient from "./CarDetailClient";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  // 1. يجب استخدام await هنا لجلب الـ id الحقيقي للسيارة المطلوبة
  const { id } = await params;

  // 2. شاشة التحميل لمدة 3 ثوانٍ كاملة
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // 3. جلب بيانات السيارة بناءً على الـ id الفعلي
  const car = carsDatabase[id] || carsDatabase["1"];

  if (!car) {
    notFound();
  }

  // 4. تمرير الـ key لضمان إعادة تحديث الكومبوننت بالكامل بالصور الجديدة
  return <CarDetailClient key={id} car={car} carId={id} />;
}