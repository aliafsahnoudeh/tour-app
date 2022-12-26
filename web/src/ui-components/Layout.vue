<template>
  <div class="layout">
    <TopNavigation />
    <div class="content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import TopNavigation from "./TopNavigation.vue";
</script>

<style lang="scss" scoped>
@import "./Layout.scss";
</style>
