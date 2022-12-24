import type DriverModel from "../types/DriverModel";

interface IDriverService {
  fetch(): Promise<Array<DriverModel>>;
  fetchByLocation(location: string): Promise<Array<DriverModel>>;
  add(payload: DriverModel): Promise<DriverModel>;
  update(payload: DriverModel): Promise<void>;
  delete(id: string): Promise<void>;
}

export default IDriverService;
