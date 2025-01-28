<template>
  <div v-for="sibling in siblings" :key="sibling.id">
    •
    <router-link  :to="'search?id=' + sibling.id + '&pageNum=1&perPage=10'">
      {{ sibling.givenname }} {{ sibling.surname }}
    </router-link>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  siblings: any;
}>();
</script>
