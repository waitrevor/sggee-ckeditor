<script setup lang="ts">
import { ref } from 'vue';
import { removeNullAndEmptyArrays } from '../../../utilities/parsing';
import LabeledItem from '../LabeledItem.vue';

// Extract the props with inline type annotations
const props = defineProps<{
  entry: any;
	index: number;
}>();

const entryData = ref(removeNullAndEmptyArrays(props.entry));
</script>

<template>
  <div class="map-card">
    <div class="place">
      <LabeledItem :entry="entryData" :label="'Place'" :field="'place'"/>
    </div>
    
    <div class="mapcoord">
      <LabeledItem :entry="entryData" :label="'Map Coordinate'" :field="'mapcoord'"/>
    </div>
	
  </div>
</template>

<style scoped lang="scss">
@import "../../../scss/variables";

.map-card {
	position: relative;
  display: flex;
  flex-direction: row;
  padding: 16px;
  margin: 0 auto;
  padding-left: 8px;
	padding-right: 45px;
  min-width: 300px;

  @media (max-width: 1150px) {
    flex-direction: column;
  }

  @media (max-width: 300px) {
    min-width: 0px;
  }
}

.place {
  display: flex;
  flex-direction: column;
	width: 700px;
  @media (max-width: 1150px) {
    width: 100%;
  }
}

.mapcoord {
  display: flex;
  flex-direction: column;
	width: 500px;

  @media (max-width: 1411px) {
    width: 200px;
    //width: 750px;
  }

  @media (max-width: 1150px) {
    width: 100%;
    //width: 750px;
  }
}

.mapgrid {
  display: flex;
  flex-direction: column;
	width: 400px;
  @media (max-width: 1150px) {
    width: 100%;
    //width: 750px;
  }
}

.place div,
.mapcoord div {
  margin-right: 8px;
}
</style>
