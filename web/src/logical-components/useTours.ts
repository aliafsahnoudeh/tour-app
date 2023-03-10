import { ref, inject, onMounted, onUnmounted, reactive } from "vue";
import type ITourService from "../services/ITourService";
import type IServices from "../services/IServices";
import type TourModel from "../types/TourModel";

export default function useTours(
  passedTourService: ITourService | undefined = undefined
) {
  let isMounted = false;
  const loading = ref(false);
  const tours = reactive<any[]>([]);

  const services = inject<IServices | null>("services");
  const tourService: ITourService | undefined =
    passedTourService !== undefined
      ? passedTourService
      : services !== undefined && services !== null
      ? services.tourService
      : undefined;

  const fetch = async (isMounted: boolean) => {
    try {
      loading.value = true;
      const response = await tourService?.fetch();
      tours.splice(0, tours.length);
      if (response !== undefined)
        response.forEach((tour: TourModel) => {
          tours.push(tour);
        });
    } catch (error) {
      console.error(error);
    } finally {
      if (isMounted) {
        loading.value = false;
      }
    }
  };

  const addTour = async (payload: TourModel) => {
    try {
      loading.value = true;
      const response = await tourService?.add(payload);
      tours.push(response);
    } catch (error) {
      console.error(error);
    } finally {
      loading.value = false;
    }
  };

  const editTour = async (payload: TourModel) => {
    try {
      loading.value = true;
      await tourService?.update(payload);
      const existed: TourModel | undefined = tours.find(
        (tour: TourModel) => tour.Id === payload.Id
      );
      if (existed !== undefined) {
        existed.CustomerName = payload.CustomerName;
        existed.Driver = payload.Driver;
        existed.LocationFrom = payload.LocationFrom;
        existed.LocationTo = payload.LocationTo;
        existed.ShipmentDate = payload.ShipmentDate;
      }
    } catch (error) {
      console.error(error);
    } finally {
      loading.value = false;
    }
  };

  const deleteTour = async (payload: TourModel) => {
    try {
      loading.value = true;
      if (!payload.Id) return;
      await tourService?.delete(payload.Id);
      const index = tours.findIndex(
        (tour: TourModel) => tour.Id === payload.Id
      );
      if (index > -1) {
        tours.splice(index, 1);
      }
    } catch (error) {
      console.error(error);
    } finally {
      loading.value = false;
    }
  };

  const deleteTours = async (payload: TourModel[]) => {
    try {
      loading.value = true;
      payload.forEach(async (tour) => {
        if (!tour.Id) return;
        await tourService?.delete(tour.Id);
        const index = tours.findIndex((d: TourModel) => tour.Id === d.Id);
        if (index > -1) {
          tours.splice(index, 1);
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
    fetch,
    loading,
    tours,
    addTour,
    editTour,
    deleteTour,
    deleteTours,
  };
}
