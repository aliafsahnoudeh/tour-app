<template>
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
        @click="dialogStore.setDeleteDriverDialog(false)"
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        class="p-button-text"
        @click="emit('delete')"
      />
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { defineEmits } from "vue";
import { useDriverStore } from "../store/driver";
import { useDialogsStore } from "../store/dialogs";

const emit = defineEmits(["delete"]);

const store = useDriverStore();
const dialogStore = useDialogsStore();
</script>
