import { defineStore } from "pinia";
import { ref } from "vue";

export const useDialogsStore = defineStore("dialogs", () => {
  const driverDialog = ref<boolean>(false);
  const deleteItemDialog = ref<boolean>(false);
  const deleteItemsDialog = ref<boolean>(false);

  const setDeleteItemsDialog = (input: boolean) => {
    deleteItemsDialog.value = input;
  };

  const setDeleteItemDialog = (input: boolean) => {
    deleteItemDialog.value = input;
  };

  const setDriverDialog = (input: boolean) => {
    driverDialog.value = input;
  };

  return {
    driverDialog,
    deleteItemDialog,
    deleteItemsDialog,
    setDeleteItemsDialog,
    setDriverDialog,
    setDeleteItemDialog,
  };
});
