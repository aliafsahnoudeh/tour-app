<template>
  <div class="tour-list">
    <div class="card">
      <Toolbar class="mb-4">
        <template #start>
          <Button
            label="New"
            icon="pi pi-plus"
            class="p-button-success mr-2"
            @click="openNew"
          />
          <Button
            label="Delete"
            icon="pi pi-trash"
            class="p-button-danger"
            @click="confirmDeleteSelected"
            :disabled="!selectedTours || !selectedTours.length"
          />
        </template>
      </Toolbar>

      <DataTable
        ref="dt"
        :value="tours"
        v-model:selection="selectedTours"
        dataKey="Id"
        responsiveLayout="scroll"
      >
        <template #header>
          <div
            class="table-header flex flex-column md:flex-row md:justiify-content-between"
          >
            <h5 class="mb-2 md:m-0 p-as-md-center">Manage Tours</h5>
          </div>
        </template>

        <Column
          selectionMode="multiple"
          style="width: 3rem"
          :exportable="false"
        ></Column>

        <Column
          field="CustomerName"
          header="CustomerName"
          :sortable="true"
          style="min-width: 12rem"
        ></Column>
        <Column
          field="ShipmentDate"
          header="ShipmentDate"
          :sortable="true"
          style="min-width: 10rem"
        ></Column>
        <Column
          field="LocationFrom"
          header="LocationFrom"
          :sortable="true"
          style="min-width: 10rem"
        ></Column>
        <Column
          field="LocationTo"
          header="LocationTo"
          :sortable="true"
          style="min-width: 10rem"
        ></Column>
        <Column
          field="Driver.FirstName"
          header="Driver.FirstName"
          :sortable="true"
          style="min-width: 14rem"
        ></Column>
        <Column
          field="Driver.LastName"
          header="Driver.LastName"
          :sortable="true"
          style="min-width: 14rem"
        ></Column>
        <Column :exportable="false" style="min-width: 8rem">
          <template #body="slotProps">
            <Button
              icon="pi pi-pencil"
              class="p-button-rounded p-button-success mr-2"
              @click="handleEdit(slotProps.data)"
            />
            <Button
              icon="pi pi-trash"
              class="p-button-rounded p-button-warning"
              @click="confirmDeleteDriver(slotProps.data)"
            />
          </template>
        </Column>
      </DataTable>
    </div>

    <TourDialog
      :driverDialog="dialogStore.driverDialog"
      :submitted="submitted"
      @save="handleSave"
    />

    <DeleteDriverDialog @delete="handleDelete" />

    <DeleteDriversDialog @delete="deleteSelectedTours" />
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from "vue";

import TourDialog from "../ui-components/TourDialog.vue";
import DeleteDriverDialog from "../ui-components/DeleteDriverDialog.vue";
import DeleteDriversDialog from "../ui-components/DeleteDriversDialog.vue";

import type TourModel from "../types/TourModel";
import useTours from "../logical-components/useTours";
import { useTourStore } from "../store/tour";
import { useDialogsStore } from "../store/dialogs";

const emit = defineEmits(["delete"]);

const { tours, addTour, editTour, deleteTour, deleteTours } = useTours();
const store = useTourStore();
const dialogStore = useDialogsStore();

const selectedTours = ref<TourModel[]>([]);

const submitted = ref<boolean>(false);

const deleteSelectedTours = async () => {
  await deleteTours(selectedTours.value);
  dialogStore.setDeleteDriversDialog(false);
  selectedTours.value.splice(0, selectedTours.value.length);
};

const handleDelete = async () => {
  if (store.tour !== undefined) await deleteTour(store.tour);
  dialogStore.setDeleteDriverDialog(false);
  store.setTour(undefined);
};

const handleEdit = (payload: TourModel) => {
  store.setTour(payload);
  dialogStore.setDriverDialog(true);
};

const confirmDeleteDriver = (payload: TourModel) => {
  store.setTour(payload);
  dialogStore.setDeleteDriverDialog(true);
};

const openNew = () => {
  store.setTour({
    Id: "",
    CustomerName: "",
    LocationFrom: "",
    LocationTo: "",
    Driver: undefined,
    DriverId: undefined,
    ShipmentDate: new Date(),
  } as TourModel);
  submitted.value = false;
  dialogStore.setDriverDialog(true);
};

const confirmDeleteSelected = () => {
  dialogStore.setDeleteDriversDialog(true);
};

const handleSave = async () => {
  submitted.value = true;

  if (store.tour?.CustomerName.trim()) {
    if (store.tour.Id) {
      await editTour(store.tour);
    } else {
      await addTour(store.tour);
    }

    dialogStore.setDriverDialog(false);
    store.setTour(undefined);
  }
};
</script>

<style lang="scss" scoped>
.tour-list {
  width: 100%;
}
.p-toolbar-group-left button {
  margin-right: 15px;
}
</style>
