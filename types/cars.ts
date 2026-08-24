export interface Car {
  id: string;
  make: string;
  model: string;
  year: string;
  seats: number;
  transmission: string;
  fuel: string;
  rating: string;
  price: number;
  images: string[];

  service: "Rental Office" | "Private Driver";
  style: "economy" | "suv" | "luxury";
}