import type DriverModel from "./DriverModel";

type TourModel = {
  Id?: string;
  CustomerName: string;
  ShipmentDate: Date;
  LocationFrom: string;
  LocationTo: string;
  Driver?: DriverModel;
  DriverId?: string;
};

export default TourModel;
