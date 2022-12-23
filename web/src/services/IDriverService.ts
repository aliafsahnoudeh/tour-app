import DriverModel from '../types/DriverModel';

interface IDriverService {
  fetch(): Promise<Array<DriverModel>>;
  fetchByLocation(location: string): Promise<Array<DriverModel>>;
}

export default IDriverService;
