import type IDriverService from "./IDriverService";
import type ITourService from "./ITourService";

type IServices = {
  driverService: IDriverService;
  tourService: ITourService;
};

export default IServices;
