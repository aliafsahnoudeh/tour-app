import { defineStore } from "pinia";
import { ref } from "vue";
import type DriverModel from "../types/DriverModel";

export const useDriverStore = defineStore("driver", () => {
  const driver = ref<DriverModel | undefined>(undefined);

  const setDriver = (payload: DriverModel | undefined) => {
    driver.value = payload;
  };

  return { driver, setDriver };
});
