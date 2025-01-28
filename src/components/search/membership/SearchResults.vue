<template>
  <div v-for="(entry, index) in props.searchResults.data" :key="entry.id" class="card">

    <Member
      :entry="entry"
      :index="index">
    </Member>

  </div>
</template>

<script setup lang="ts">
import Member from './Member.vue';

const props = defineProps<{
  searchResults: any;
}>();
</script>


<style scoped lang="scss">
@import "../../../scss/variables";
</style>
