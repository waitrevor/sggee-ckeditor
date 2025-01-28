<template>
  <BaseSearchCriteria ref="baseSearchRef" :searchFields="searchFields" :fieldLabelMap="fieldLabelMap">
    <!--label class="option-label" style="margin-top: -5px;">Full Name:</label-->
    <input v-model="searchFields.citytownvillagefeature" type="text" class="filter-input" placeholder="Village" spellcheck="false">
    <SearchTypesDropdown :options="searchTypes" :otherDropdowns="[dropdownProvince]" v-model="selectedSearchTypeCityTownVillageFeature" ref="dropdownCityTownVillageFeature"/>

    <input v-model="searchFields.province" type="text" class="filter-input" placeholder="Province" spellcheck="false">
    <SearchTypesDropdown :options="searchTypes" :otherDropdowns="[dropdownCityTownVillageFeature]" v-model="selectedSearchTypeProvince" ref="dropdownProvince"/>

    <input v-model="searchFields.mapgrid" type="text" class="filter-input" placeholder="Map Coordinate" spellcheck="false">

  </BaseSearchCriteria>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import BaseSearchCriteria, { Dropdown } from '../SearchCriteria.vue';
import SearchTypesDropdown from '../SearchTypesDropdown.vue';

const searchTypes = ref(['Substring', 'DM']);
//const searchTypesPlace = ref(['Substring', 'DM']);
const selectedSearchTypeCityTownVillageFeature = ref(searchTypes.value[0]);
const selectedSearchTypeProvince = ref(searchTypes.value[0]);

const dropdownCityTownVillageFeature = ref<Dropdown>({ isOpen: false });
const dropdownProvince = ref<Dropdown>({ isOpen: false });

// The input fields and control flags coming from the Search Criteria component
const searchFields = ref({
  citytownvillagefeature: '',
  province: '',
  mapgrid: '',
});

// The human readable mapping
const fieldLabelMap: { [key: string]: string } = {
  citytownvillagefeature: 'Village',
  province: 'Province',
  mapgrid: 'Map Coordinate',
};

const selectedSearchTypes = computed(() => {
  return {
    citytownvillagefeature: selectedSearchTypeCityTownVillageFeature.value,
    province: selectedSearchTypeProvince.value,
    mapgrid: 'Substring'
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
