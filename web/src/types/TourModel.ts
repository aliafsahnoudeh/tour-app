import DriverModel from "./DriverModel";

type TourModel = {
  Id: string;
  CustomerName: string;
  ShipmentDate: string;
  LocationFrom: string;
  LocationTo: string;
  Driver: DriverModel
};

export default TourModel;
