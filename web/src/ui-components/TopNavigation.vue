<template>
  <Menubar :model="items" />
</template>

<script setup lang="ts">
const items = [
  {
    label: "Tours",
    icon: "pi pi-fw pi-calendar",
    href: "/",
    to: "/",
  },
  {
    label: "Drivers",
    icon: "pi pi-fw pi-user",
    href: "/drivers",
    to: "/drivers",
  },
];
</script>
