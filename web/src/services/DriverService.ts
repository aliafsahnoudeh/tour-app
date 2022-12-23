import IApiService from './IApiService';
import IDriverService from './IDriverService';

import DriverModel from '../types/DriverModel';

class DriverService implements IDriverService {
  private readonly apiService: IApiService;

  constructor(apiService: IApiService) {
    this.apiService = apiService;
  }

  public async fetch(): Promise<Array<DriverModel>> {
    const {
      body,
    } = await this.apiService.request(
      'GET',
      `/driver`,
      {},
      {},
    );
    return body;
  }

  public async fetchByLocation(location: string): Promise<Array<DriverModel>> {
    const {
      body,
    } = await this.apiService.request(
      'GET',
      `/driver/location/${location}`,
      {},
      {},
    );
    return body;
  }
}

export default DriverService;
