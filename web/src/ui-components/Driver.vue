<script setup lang="ts">
import type DriverModel from "../types/DriverModel";

const props = defineProps<{
  driver: DriverModel;
}>();
</script>

<template>
  <Card>
    <template #header>
      <Avatar icon="pi pi-user" size="xlarge" />
    </template>
    <template #content>
      {{ driver.FirstName }}
    </template>
    <template #footer>
      <Button icon="pi pi-check" label="Save" />
      <Button
        icon="pi pi-times"
        label="Cancel"
        class="p-button-secondary"
        style="margin-left: 0.5em"
      />
    </template>
  </Card>
</template>

<style lang="scss" scoped></style>
