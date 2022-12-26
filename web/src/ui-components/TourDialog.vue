<template>
  <div>
    <Dialog
      v-model:visible="dialogStore.driverDialog"
      :style="{ width: '450px' }"
      header="Product Details"
      :modal="true"
      class="p-fluid"
    >
      <div class="field">
        <label for="CustomerName">CustomerName</label>
        <InputText
          id="CustomerName"
          v-if="store.tour"
          v-model.trim="store.tour.CustomerName"
          required="true"
          autofocus
          :class="{ 'p-invalid': submitted && !store.tour?.CustomerName }"
        />
        <small class="p-error" v-if="submitted && !store.tour?.CustomerName"
          >CustomerName is required.</small
        >
      </div>
      <div class="field">
        <label for="ShipmentDate">ShipmentDate</label>
        <InputText
          id="ShipmentDate"
          v-if="store.tour"
          v-model.trim="store.tour.ShipmentDate"
          required="true"
          autofocus
          :class="{ 'p-invalid': submitted && !store.tour.ShipmentDate }"
        />
        <small class="p-error" v-if="submitted && !store.tour?.ShipmentDate"
          >ShipmentDate is required.</small
        >
      </div>
      <div class="field">
        <label for="LocationFrom">LocationFrom</label>
        <InputText
          id="LocationFrom"
          v-if="store.tour"
          v-model.trim="store.tour.LocationFrom"
          required="true"
          autofocus
          :class="{ 'p-invalid': submitted && !store.tour.LocationFrom }"
          @keypress="preventNumericInput"
        />
        <small class="p-error" v-if="submitted && !store.tour?.LocationFrom"
          >LocationFrom is required.</small
        >
      </div>
      <div class="field">
        <label for="LocationTo">LocationTo</label>
        <InputText
          id="LocationTo"
          v-if="store.tour"
          v-model.trim="store.tour.LocationTo"
          required="true"
          autofocus
          :class="{ 'p-invalid': submitted && !store.tour.LocationTo }"
          @keypress="preventNumericInput"
        />
        <small class="p-error" v-if="submitted && !store.tour?.LocationTo"
          >LocationTo is required.</small
        >
      </div>

      <Dropdown
        v-model="selectedDriver"
        :options="drivers"
        optionLabel="FirstName"
        placeholder="Select a Driver"
        @change="handleChange"
      />

      <template #footer>
        <Button
          label="Cancel"
          icon="pi pi-times"
          class="p-button-text"
          @click="emit('hide')"
        />
        <Button
          label="Save"
          icon="pi pi-check"
          class="p-button-text"
          @click="emit('save')"
        />
      </template>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, watch, ref } from "vue";
import { useTourStore } from "../store/tour";
import { useDialogsStore } from "../store/dialogs";
import useDrivers from "../logical-components/useDrivers";
import type DriverModel from "../types/DriverModel";

const props = defineProps<{
  driverDialog: boolean;
  submitted: boolean;
}>();

const emit = defineEmits(["save", "hide"]);

const store = useTourStore();
const dialogStore = useDialogsStore();
const { drivers, fetchByLocation } = useDrivers(false);
const selectedDriver = ref<DriverModel>();

const preventNumericInput = (event: any) => {
  const keyCode = event.keyCode ? event.keyCode : event.which;
  if (keyCode > 47 && keyCode < 58) {
    event.preventDefault();
  }
};

watch(
  () => store.tour?.LocationFrom,
  (newValue) => {
    if (newValue !== undefined && newValue.length > 0)
      fetchByLocation(newValue);
  }
);

const handleChange = (event: any) => {
  selectedDriver.value = event.value;
  if (store.tour !== undefined) store.tour.Driver = event.value;
};
</script>
