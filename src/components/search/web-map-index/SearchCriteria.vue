<template>
  <BaseSearchCriteria ref="baseSearchRef" :searchFields="searchFields" :fieldLabelMap="fieldLabelMap">
    <!--label class="option-label" style="margin-top: -5px;">Full Name:</label-->

    <input v-model="searchFields.place" type="text" class="filter-input" placeholder="Place" spellcheck="false">
    <SearchTypesDropdown :options="searchTypes" :otherDropdowns="[]" v-model="selectedSearchTypePlace" ref="dropdownPlace"/>

    <input v-model="searchFields.mapcoord" type="text" class="filter-input" placeholder="Map Coordinate" spellcheck="false">

  </BaseSearchCriteria>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import BaseSearchCriteria, { Dropdown } from '../SearchCriteria.vue';
import SearchTypesDropdown from '../SearchTypesDropdown.vue';

const searchTypes = ref(['Substring', 'DM']);
//const searchTypesPlace = ref(['Substring', 'DM']);
const selectedSearchTypePlace = ref(searchTypes.value[0]);
const selectedSearchTypeMapCoord = ref(searchTypes.value[0]);

const dropdownPlace = ref<Dropdown>({ isOpen: false });

// The input fields and control flags coming from the Search Criteria component
const searchFields = ref({
  place: '',
  mapcoord: ''
});

// The human readable mapping
const fieldLabelMap: { [key: string]: string } = {
  place: 'Place',
  mapcoord: 'Map Coordinate'
};

const selectedSearchTypes = computed(() => {
  return {
    place: selectedSearchTypePlace.value,
    mapcoord: 'Substring'
  };
});

// Accessing from base SearchCriteria via the component reference
const baseSearchRef = ref<InstanceType<typeof BaseSearchCriteria> | null>(null);
const searchFlag = computed(() => baseSearchRef.value?.searchFlag);
const resetFlag = computed(() => baseSearchRef.value?.resetFlag);
const isClosed = computed(() => baseSearchRef.value?.isClosed);
const selectedFields = computed(() => baseSearchRef.value?.selectedFields);
const sortOrders = computed(() => baseSearchRef.value?.sortOrders);

const resetSelectedFields = () => {
  baseSearchRef.value?.resetSelectedFields();
};

defineExpose({
  searchFields,
  selectedSearchTypes,
  searchFlag,
  resetFlag,
  isClosed,
  selectedFields,
  fieldLabelMap,
  sortOrders,
  resetSelectedFields
});
</script>

<style scoped lang="scss">
@import '../../../scss/search.scss';
</style>
