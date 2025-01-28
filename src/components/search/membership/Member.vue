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
    <div class="village">
      <div>
        <template v-if="entry.givenname">
          {{ entry.givenname + ' ' }}
        </template>
        <template v-if="entry.surname">
          {{ entry.surname }}
        </template>
      </div>
    </div>
    
    <div class="province">
      <LabeledItem :entry="entryData" :label="'Email'" :field="'email'"/>
    </div>

    <div class="mapgrid">
      <LabeledItem :entry="entryData" :label="'Member Number'" :field="'memnum'"/>
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

.village {
  display: flex;
  flex-direction: column;
	width: 350px;
  @media (max-width: 1150px) {
    width: 100%;
  }
}

.province {
  display: flex;
  flex-direction: column;
	width: 550px;

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
	width: 300px;
  @media (max-width: 1150px) {
    width: 100%;
    //width: 750px;
  }
}

.village div,
.province div,
.mapgrid div {
  margin-right: 8px;
}

.province div,
.mapgrid div {
  margin-bottom: 0px;
}

</style>
