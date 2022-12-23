import type DriverModel from "../types/DriverModel";

interface IDriverService {
  fetch(): Promise<Array<DriverModel>>;
  fetchByLocation(location: string): Promise<Array<DriverModel>>;
  add(payload: DriverModel): Promise<void>;
}

export default IDriverService;
