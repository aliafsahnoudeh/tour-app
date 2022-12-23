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
      await driverService?.add(payload);
      drivers.push(payload);
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

  return { loading, drivers, addDriver, editDriver };
}
