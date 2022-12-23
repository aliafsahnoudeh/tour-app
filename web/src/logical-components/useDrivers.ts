import { ref, inject,onMounted, onUnmounted, reactive } from "vue";
import IDriverService from "../services/IDriverService";
import IServices from "../services/IServices";
import DriverModel from "../types/DriverModel";

export default function useDrivers() {
    let isMounted = false;
    const loading = ref(false);
    const drivers = reactive<any[]>([]);
    
    const services = inject<IServices| undefined>('services');
    let driverService: IDriverService
    if(services !== undefined)
      driverService = services.driverService
        
    const fetch = async (isMounted: boolean) => {
        try {
          loading.value = true
          const response = await driverService?.fetch()
          drivers.splice(0, drivers.length);
          response.forEach((word: DriverModel) => {
            drivers.push(word);
          });
        } catch (error) {
            console.error(error)
        } finally {
          if (isMounted) { loading.value = false; }
        }
    };

      onMounted(() => {
        isMounted = true;
        fetch(isMounted);
      });

      onUnmounted(() => {
        isMounted = false;
      });

    return { loading, drivers };
}
