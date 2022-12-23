<template>
  <div>
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
            :disabled="!selectedDrivers || !selectedDrivers.length"
          />
        </template>
      </Toolbar>

      <DataTable
        ref="dt"
        :value="drivers"
        v-model:selection="selectedDrivers"
        dataKey="Id"
        responsiveLayout="scroll"
      >
        <template #header>
          <div
            class="table-header flex flex-column md:flex-row md:justiify-content-between"
          >
            <h5 class="mb-2 md:m-0 p-as-md-center">Manage Drivers</h5>
          </div>
        </template>

        <Column
          selectionMode="multiple"
          style="width: 3rem"
          :exportable="false"
        ></Column>

        <Column
          field="FirstName"
          header="FirstName"
          :sortable="true"
          style="min-width: 12rem"
        ></Column>
        <Column
          field="LastName"
          header="LastName"
          :sortable="true"
          style="min-width: 16rem"
        ></Column>
        <Column
          field="Location"
          header="Location"
          :sortable="true"
          style="min-width: 16rem"
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

    <DriverDialog
      :driverDialog="dialogStore.driverDialog"
      :submitted="submitted"
      @save="save"
    />

    <!-- deleteDriverDialog -->
    <Dialog
      v-model:visible="dialogStore.deleteDriverDialog"
      :style="{ width: '450px' }"
      header="Confirm"
      :modal="true"
    >
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
        <span v-if="store.driver"
          >Are you sure you want to delete
          <b>{{ store.driver.FirstName }} {{ store.driver.LastName }}</b
          >?</span
        >
      </div>
      <template #footer>
        <Button
          label="No"
          icon="pi pi-times"
          class="p-button-text"
          @click="dialogStore.deleteDriverDialog = false"
        />
        <Button
          label="Yes"
          icon="pi pi-check"
          class="p-button-text"
          @click="handleDelete"
        />
      </template>
    </Dialog>

    <!-- deleteDriversDialog -->
    <Dialog
      v-model:visible="dialogStore.deleteDriversDialog"
      :style="{ width: '450px' }"
      header="Confirm"
      :modal="true"
    >
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
        <span v-if="store.driver"
          >Are you sure you want to delete the selected drivers?</span
        >
      </div>
      <template #footer>
        <Button
          label="No"
          icon="pi pi-times"
          class="p-button-text"
          @click="dialogStore.deleteDriversDialog = false"
        />
        <Button
          label="Yes"
          icon="pi pi-check"
          class="p-button-text"
          @click="deleteSelectedDrivers"
        />
      </template>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from "vue";
import DriverDialog from "../ui-components/DriverDialog.vue";
import type DriverModel from "../types/DriverModel";
import useDrivers from "../logical-components/useDrivers";
import { useDriverStore } from "../store/driver";
import { useDialogsStore } from "../store/dialogs";

const emit = defineEmits(["delete"]);

const { loading, drivers, addDriver, editDriver } = useDrivers();
const store = useDriverStore();
const dialogStore = useDialogsStore();

// TODO remove any
const selectedDrivers = ref<DriverModel[]>([]);

const submitted = ref<boolean>(false);

const deleteSelectedDrivers = () => {
  emit(
    "delete",
    drivers.filter((val) => !selectedDrivers.value.includes(val))
  );
  dialogStore.setDeleteDriversDialog(false);
  selectedDrivers.value.splice(0, selectedDrivers.value.length);
  // TODO toast
};

const handleDelete = () => {
  emit("delete", [store.driver]);
  dialogStore.setDeleteDriversDialog(false);
  store.setDriver(undefined);
};

const handleEdit = (payload: DriverModel) => {
  store.setDriver(payload);
  dialogStore.setDriverDialog(true);
};

const confirmDeleteDriver = (payload: DriverModel) => {
  store.setDriver(payload);
  dialogStore.setDeleteDriverDialog(true);
};

const openNew = () => {
  store.setDriver({
    FirstName: "",
    LastName: "",
    Location: "",
  } as DriverModel);
  submitted.value = false;
  dialogStore.setDriverDialog(true);
};

const confirmDeleteSelected = () => {
  dialogStore.setDeleteDriversDialog(true);
};

const save = async () => {
  submitted.value = true;

  if (store.driver?.FirstName.trim()) {
    if (store.driver.Id) {
      await editDriver(store.driver);
      //   this.$toast.add({
      //     severity: "success",
      //     summary: "Successful",
      //     detail: "Driver Updated",
      //     life: 3000,
      //   });
    } else {
      await addDriver(store.driver);
      //   this.$toast.add({
      //     severity: "success",
      //     summary: "Successful",
      //     detail: "Driver Created",
      //     life: 3000,
      //   });
    }

    dialogStore.setDriverDialog(false);
    store.setDriver(undefined);
  }
};
</script>
