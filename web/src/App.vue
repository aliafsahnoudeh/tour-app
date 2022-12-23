<script setup lang="ts">
import { provide } from 'vue'
import services from "./services";

import "primevue/resources/themes/vela-green/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";

provide("services", services)
</script>

<template>
  <RouterView />
</template>

<style lang="scss">
@import "./assets/styles/index.scss";
</style>
