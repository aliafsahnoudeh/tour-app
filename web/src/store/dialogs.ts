import { defineStore } from "pinia";
import { ref } from "vue";

export const useDialogsStore = defineStore("dialogs", () => {
  const driverDialog = ref<boolean>(false);
  const deleteDriverDialog = ref<boolean>(false);
  const deleteDriversDialog = ref<boolean>(false);

  const setDeleteDriversDialog = (input: boolean) => {
    deleteDriversDialog.value = input;
  };

  const setDeleteDriverDialog = (input: boolean) => {
    deleteDriverDialog.value = input;
  };

  const setDriverDialog = (input: boolean) => {
    driverDialog.value = input;
  };

  return {
    driverDialog,
    deleteDriverDialog,
    deleteDriversDialog,
    setDeleteDriversDialog,
    setDriverDialog,
    setDeleteDriverDialog,
  };
});
