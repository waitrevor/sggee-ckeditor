<template>
  <div v-for="(entry, index) in props.searchResults.data" :key="entry.id" class="card">

    <Person
      :individual="entry"
      :moreDetails="searchResults.moreDetails"
      :toggleDetails="toggleDetails"
      :index="index"
    />

    <div v-if="searchResults.moreDetails[index]" class="details-container">
      <div style="margin-left: 10px; margin-bottom: 10px;">

        <LabeledItem :entry="entry" :label="'Disk'" :field="'on_disk'"/>
        <LabeledItem :entry="entry" :label="'File'" :field="'in_file'"/>
        <LabeledItem :entry="entry" :label="'Reg#'" :field="'reg'"/>
        <LabeledItem :entry="entry" :label="'Folder'" :field="'folder'"/>
        
      </div>

      <div class="offset-section">
        <LabeledItem :entry="entry" :label="'Groom\'s Parents'" :field="'grooms_parents'"/>
        <LabeledItem :entry="entry" :label="'Bride\'s Parents'" :field="'brides_parents'"/>
      </div>

      <div class="offset-section">
        <LabeledItem :entry="entry" :label="'Special Notes'" :field="'special_notes'"/>
      </div>

    </div>

  </div>
</template>

<script setup lang="ts">
import LabeledItem from '../LabeledItem.vue';
import Person from './Person.vue';

const props = defineProps<{
  searchResults: any;
}>();

const toggleDetails = async (index: number) => {
  props.searchResults.moreDetails[index] = !props.searchResults.moreDetails[index];
};
</script>


<style scoped lang="scss">
@import "../../../scss/variables";

.offset-section {
    margin-left: 60px;
    @media (max-width: 1150px) {
      margin-left: 10px;
    }
  }
  
</style>
