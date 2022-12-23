<script setup lang="ts">
import { provide } from 'vue'
import services from "./services";

provide("services", services)
</script>

<template>
  <RouterView />
</template>

<style lang="scss">
@import "./assets/styles/index.scss";
</style>
