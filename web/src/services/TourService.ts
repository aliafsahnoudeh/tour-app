import type IApiService from "./IApiService";
import type ITourService from "./ITourService";

import type TourModel from "../types/TourModel";

class TourService implements ITourService {
  private readonly apiService: IApiService;

  constructor(apiService: IApiService) {
    this.apiService = apiService;
  }

  public async fetch(): Promise<Array<TourModel>> {
    const { body } = await this.apiService.request("GET", `tour`, {}, {});
    return body;
  }

  public async add(newTour: TourModel): Promise<TourModel> {
    const { body } = await this.apiService.request(
      "POST",
      `tour`,
      {},
      {
        body: newTour,
      }
    );
    return body;
  }

  public async update(payload: TourModel): Promise<void> {
    const { body } = await this.apiService.request(
      "PUT",
      `tour/${payload.Id}`,
      {},
      {
        body: payload,
      }
    );
    return body;
  }

  public async delete(id: string): Promise<void> {
    const { body } = await this.apiService.request(
      "DELETE",
      `tour/${id}`,
      {},
      {}
    );
    return body;
  }
}

export default TourService;
