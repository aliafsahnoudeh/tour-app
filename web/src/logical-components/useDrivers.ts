import { ref, inject, onMounted, onUnmounted, reactive } from "vue";
import type IDriverService from "../services/IDriverService";
import type IServices from "../services/IServices";
import type DriverModel from "../types/DriverModel";

export default function useDrivers() {
  let isMounted = false;
  const loading = ref(false);
  const drivers = reactive<any[]>([]);

  const services = inject<IServices | null>("services");
  let driverService: IDriverService;
  if (services !== undefined) driverService = services.driverService;

  const fetch = async (isMounted: boolean) => {
    try {
      loading.value = true;
      const response = await driverService?.fetch();
      drivers.splice(0, drivers.length);
      response.forEach((word: DriverModel) => {
        drivers.push(word);
      });
    } catch (error) {
      console.error(error);
    } finally {
      if (isMounted) {
        loading.value = false;
      }
    }
  };

  const addDriver = async (payload: DriverModel) => {
    try {
      loading.value = true;
      await driverService?.add(payload);
      // TODO add it with new Id
      drivers.push(payload);
    } catch (error) {
      console.error(error);
    } finally {
      loading.value = false;
    }
  };

  const editDriver = async (payload: DriverModel) => {
    try {
      loading.value = true;
      await driverService?.update(payload);
      const existed: DriverModel | undefined = drivers.find(
        (driver: DriverModel) => driver.Id === payload.Id
      );
      if (existed !== undefined) {
        existed.FirstName = payload.FirstName;
        existed.LastName = payload.LastName;
        existed.Location = payload.Location;
      }
    } catch (error) {
      console.error(error);
    } finally {
      loading.value = false;
    }
  };

  const deleteDriver = async (payload: DriverModel) => {
    try {
      loading.value = true;
      await driverService?.delete(payload.Id);
      const index = drivers.findIndex(
        (driver: DriverModel) => driver.Id === payload.Id
      );
      if (index > -1) {
        drivers.splice(index, 1);
      }
    } catch (error) {
      console.error(error);
    } finally {
      loading.value = false;
    }
  };

  const deleteDrivers = async (payload: DriverModel[]) => {
    try {
      loading.value = true;
      payload.forEach(async (driver) => {
        console.log(driver);
        await driverService?.delete(driver.Id);
        const index = drivers.findIndex((d: DriverModel) => driver.Id === d.Id);
        if (index > -1) {
          drivers.splice(index, 1);
        }
      });
    } catch (error) {
      console.error(error);
    } finally {
      loading.value = false;
    }
  };

  onMounted(() => {
    isMounted = true;
    fetch(isMounted);
  });

  onUnmounted(() => {
    isMounted = false;
  });

  return {
    loading,
    drivers,
    addDriver,
    editDriver,
    deleteDriver,
    deleteDrivers,
  };
}
