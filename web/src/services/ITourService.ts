import type TourModel from "../types/TourModel";

interface ITourService {
  fetch(): Promise<Array<TourModel>>;
  add(newTour: TourModel): Promise<void>;
  update(newTour: TourModel): Promise<void>;
  delete(id: string): Promise<void>;
}

export default ITourService;
