<template>
  <div v-for="(entry, index) in props.searchResults.data" :key="entry.id" class="card">

    <Map
      :entry="entry"
      :index="index">
    </Map>

  </div>
</template>

<script setup lang="ts">
import Map from './Map.vue';

const props = defineProps<{
  searchResults: any;
}>();
</script>


<style scoped lang="scss">
@import "../../../scss/variables";
</style>
