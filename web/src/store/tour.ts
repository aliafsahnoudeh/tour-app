import { defineStore } from "pinia";
import { ref } from "vue";
import type TourModel from "@/types/TourModel";

export const useTourStore = defineStore("tour", () => {
  const tour = ref<TourModel | undefined>(undefined);

  const setTour = (payload: TourModel | undefined) => {
    tour.value = payload;
  };

  return { tour, setTour };
});
