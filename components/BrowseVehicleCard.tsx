import VehicleCard, { type Vehicle } from "./VehicleCard";

export type BrowseVehicle = Vehicle;

export default function BrowseVehicleCard(props: BrowseVehicle) {
  return <VehicleCard {...props} />;
}

