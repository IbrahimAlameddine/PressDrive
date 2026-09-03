import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosDelete, axiosGet, axiosPost, axiosPut } from "@/lib/axios";

export const transmissionOptions = ["AUTO", "MANUAL", "CVT", "DUALCLUTCH"] as const;
export const fuelTypeOptions = ["PETROL", "DIESEL", "ELECTRIC", "HYBRID"] as const;

export type Transmission = (typeof transmissionOptions)[number];
export type FuelType = (typeof fuelTypeOptions)[number];

export type CarOwner = {
  id: number;
  username: string;
  email: string;
  phone: string;
  role: "USER" | "ADMIN" | "PROVIDER";
};

export type Car = {
  id: number;
  brand: string;
  model: string;
  year: number;
  seats: number;
  transmission: Transmission;
  pricePerDay: number | string;
  profitPerDay: number | string;
  category: string;
  fuelType: FuelType;
  ownerId: number;
  owner?: CarOwner;
  createdAt: string;
  updatedAt: string;
};

export type CarInput = {
  brand: string;
  model: string;
  year: number;
  seats: number;
  transmission: Transmission;
  pricePerDay: number;
  profitPerDay: number;
  category: string;
  fuelType: FuelType;
  ownerId: number;
};

export type CarImage = { id: number; url: string; carId: number };
export type UnavailableDate = {
  id: number;
  carId: number;
  startDate: string;
  endDate: string;
};

async function getCars(): Promise<Car[]> {
  const response = await axiosGet<Car[]>("/cars");
  return response.data || [];
}

async function getCar(id: number): Promise<Car> {
  const response = await axiosGet<Car>(`/cars/${id}`);
  return response.data as Car;
}

async function createCar(data: CarInput): Promise<Car> {
  const response = await axiosPost<CarInput, Car>("/cars", data);
  return response.data as Car;
}

async function updateCar({ id, data }: { id: number; data: Partial<CarInput> }): Promise<Car> {
  const response = await axiosPut<Partial<CarInput>, Car>(`/cars/${id}`, data);
  return response.data as Car;
}

async function deleteCar(id: number) {
  await axiosDelete(`/cars/${id}`);
}

async function getImages(carId: number): Promise<CarImage[]> {
  const response = await axiosGet<CarImage[]>(`/cars/${carId}/images`);
  return response.data || [];
}

async function addImage({ carId, url }: { carId: number; url: string }): Promise<CarImage> {
  const response = await axiosPost<{ url: string }, CarImage>(`/cars/${carId}/images`, { url });
  return response.data as CarImage;
}

async function deleteImage({ carId, imageId }: { carId: number; imageId: number }) {
  await axiosDelete(`/cars/${carId}/images/${imageId}`);
}

async function getUnavailableDates(carId: number): Promise<UnavailableDate[]> {
  const response = await axiosGet<UnavailableDate[]>(`/cars/${carId}/unavailable-dates`);
  return response.data || [];
}

async function addUnavailableDate({
  carId,
  date,
  endDate,
}: {
  carId: number;
  date: string;
  endDate?: string;
}): Promise<UnavailableDate> {
  const response = await axiosPost<{ date: string; endDate?: string }, UnavailableDate>(
    `/cars/${carId}/unavailable-dates`,
    { date, ...(endDate ? { startDate: date, endDate } : {}) }
  );
  return response.data as UnavailableDate;
}

async function deleteUnavailableDate({ carId, dateId }: { carId: number; dateId: number }) {
  await axiosDelete(`/cars/${carId}/unavailable-dates/${dateId}`);
}

export function useCars() {
  return useQuery({ queryKey: ["cars"], queryFn: getCars });
}

export function useCar(id: number) {
  return useQuery({ queryKey: ["cars", id], queryFn: () => getCar(id), enabled: !!id });
}

export function useCreateCar() {
  const queryClient = useQueryClient();
  return useMutation({ mutationFn: createCar, onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cars"] }) });
}
export function useUpdateCar() {
  const queryClient = useQueryClient();
  return useMutation({ mutationFn: updateCar, onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cars"] }) });
}
export function useDeleteCar() {
  const queryClient = useQueryClient();
  return useMutation({ mutationFn: deleteCar, onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cars"] }) });
}
export function useCarImages(carId: number, enabled: boolean) {
  return useQuery({ queryKey: ["cars", carId, "images"], queryFn: () => getImages(carId), enabled: enabled && !!carId });
}
export function useAddCarImage() {
  const queryClient = useQueryClient();
  return useMutation({ mutationFn: addImage, onSuccess: (_, variables) => queryClient.invalidateQueries({ queryKey: ["cars", variables.carId, "images"] }) });
}
export function useDeleteCarImage() {
  const queryClient = useQueryClient();
  return useMutation({ mutationFn: deleteImage, onSuccess: (_, variables) => queryClient.invalidateQueries({ queryKey: ["cars", variables.carId, "images"] }) });
}
export function useUnavailableDates(carId: number, enabled: boolean) {
  return useQuery({ queryKey: ["cars", carId, "unavailable-dates"], queryFn: () => getUnavailableDates(carId), enabled: enabled && !!carId });
}
export function useAddUnavailableDate() {
  const queryClient = useQueryClient();
  return useMutation({ mutationFn: addUnavailableDate, onSuccess: (_, variables) => queryClient.invalidateQueries({ queryKey: ["cars", variables.carId, "unavailable-dates"] }) });
}
export function useDeleteUnavailableDate() {
  const queryClient = useQueryClient();
  return useMutation({ mutationFn: deleteUnavailableDate, onSuccess: (_, variables) => queryClient.invalidateQueries({ queryKey: ["cars", variables.carId, "unavailable-dates"] }) });
}