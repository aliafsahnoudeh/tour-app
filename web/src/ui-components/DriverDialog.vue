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
        <label for="FirstName">FirstName</label>
        <InputText
          id="FirstName"
          v-if="store.driver"
          v-model.trim="store.driver.FirstName"
          required="true"
          autofocus
          :class="{ 'p-invalid': submitted && !store.driver?.FirstName }"
        />
        <small class="p-error" v-if="submitted && !store.driver?.FirstName"
          >FirstName is required.</small
        >
      </div>
      <div class="field">
        <label for="LastName">LastName</label>
        <InputText
          id="LastName"
          v-if="store.driver"
          v-model.trim="store.driver.LastName"
          required="true"
          autofocus
          :class="{ 'p-invalid': submitted && !store.driver.LastName }"
        />
        <small class="p-error" v-if="submitted && !store.driver?.LastName"
          >LastName is required.</small
        >
      </div>
      <div class="field">
        <label for="Location">Location</label>
        <InputText
          id="Location"
          v-if="store.driver"
          v-model.trim="store.driver.Location"
          required="true"
          autofocus
          :class="{ 'p-invalid': submitted && !store.driver.Location }"
        />
        <small class="p-error" v-if="submitted && !store.driver?.Location"
          >Location is required.</small
        >
      </div>
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
import { defineEmits } from "vue";
import { useDriverStore } from "../store/driver";
import { useDialogsStore } from "../store/dialogs";

const props = defineProps<{
  driverDialog: boolean;
  submitted: boolean;
}>();

const emit = defineEmits(["save", "hide"]);

const store = useDriverStore();
const dialogStore = useDialogsStore();
</script>
