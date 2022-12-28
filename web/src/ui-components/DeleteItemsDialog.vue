<template>
  <Dialog
    v-model:visible="dialogStore.deleteItemsDialog"
    :style="{ width: '450px' }"
    header="Confirm"
    :modal="true"
    ref="delete_items_dialog"
  >
    <div class="confirmation-content">
      <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
      <span>Are you sure you want to delete the selected drivers?</span>
    </div>
    <template #footer>
      <Button
        label="No"
        icon="pi pi-times"
        class="p-button-text"
        @click="dialogStore.deleteItemsDialog = false"
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
import { useDialogsStore } from "../store/dialogs";

const emit = defineEmits(["delete"]);

const dialogStore = useDialogsStore();
</script>
