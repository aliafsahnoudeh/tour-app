import IApiService from './IApiService';
import ITourService from './ITourService';

import TourModel from '../types/TourModel';

class TourService implements ITourService {
  private readonly apiService: IApiService;

  constructor(apiService: IApiService) {
    this.apiService = apiService;
  }

  public async fetch(): Promise<Array<TourModel>> {
    const {
      body,
    } = await this.apiService.request(
      'GET',
      `/tour`,
      {},
      {},
    );
    return body;
  }

  public async add(newTour: TourModel): Promise<void> {
    const {
      body,
    } = await this.apiService.request(
      'POST',
      `/tour`,
      {},
      {
        body: newTour
      },
    );
    return body;
  }

  update(newTour: TourModel): Promise<void> {
    throw new Error('Method not implemented.');
  }

  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

export default TourService;
