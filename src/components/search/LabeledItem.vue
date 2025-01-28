<template>
  <div>
    <div>
      <strong>{{ label }}: </strong>
      <template v-if="entry[field]">
        {{ entry[field] }}
      </template>
      <template v-else>
        <span class="missing-text">{{ missingPlaceholderText }}</span>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  entry: any;
  label: string;
  field: string;
  missingPlaceholderText?: string;
}>();

const missingPlaceholderText = props.missingPlaceholderText || 'No Data';
</script>

<style scoped>
.missing-text {
  color: lightgray;
}
</style>
