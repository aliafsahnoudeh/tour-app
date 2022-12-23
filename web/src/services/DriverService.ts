import type IApiService from "./IApiService";
import type IDriverService from "./IDriverService";

import type DriverModel from "../types/DriverModel";

class DriverService implements IDriverService {
  private readonly apiService: IApiService;

  constructor(apiService: IApiService) {
    this.apiService = apiService;
  }

  public async fetch(): Promise<Array<DriverModel>> {
    const { body } = await this.apiService.request("GET", `/driver`, {}, {});
    return body;
  }

  public async fetchByLocation(location: string): Promise<Array<DriverModel>> {
    const { body } = await this.apiService.request(
      "GET",
      `/driver/location/${location}`,
      {},
      {}
    );
    return body;
  }

  public async add(payload: DriverModel): Promise<void> {
    const { body } = await this.apiService.request(
      "POST",
      `/driver`,
      {},
      {
        body: payload,
      }
    );
    return body;
  }
}

export default DriverService;
