<script setup lang="ts">
import Layout from "../ui-components/Layout.vue"
import useDrivers from "../logical-components/useDrivers"
const { loading, drivers } = useDrivers();

</script>

<template>
  <Layout>
      <div v-if="loading" class="message"> loading </div>
      <template v-else-if="drivers && drivers.length > 0">
          <div class="main">
              <div 
              v-for="(driver, index) in drivers"
              :driver="driver" :index="index" :key="driver.Id">{{ driver }}</div>
          </div>
      </template>
      <div v-else class="message">No Data To Show!</div>
    </Layout>
</template>

<style lang="scss" scoped>


</style>
