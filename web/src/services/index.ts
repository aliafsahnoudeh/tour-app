import IocContainer from "../IocContainer";
import ApiService from "./ApiService";
import DriverService from "./DriverService";
import TourService from "./TourService";

const iocContainer = new IocContainer();

iocContainer.service(
  "ApiService",
  () => new ApiService(import.meta.env.VITE_BACKEND_URL)
);

iocContainer.service(
  "DriverService",
  (c: any) => new DriverService(c.ApiService)
);

iocContainer.service("TourService", (c: any) => new TourService(c.ApiService));

export const container = iocContainer;

export default {
  driverService: iocContainer.get("DriverService"),
  tourService: iocContainer.get("TourService"),
};
