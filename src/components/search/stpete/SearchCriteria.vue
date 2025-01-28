<template>
  <BaseSearchCriteria ref="baseSearchRef" :searchFields="searchFields" :fieldLabelMap="fieldLabelMap">

    <label class="option-label" style="margin-top: -5px;">Full Name:</label>

    <input v-model="searchFields.last_name" type="text" class="filter-input" spellcheck="false" placeholder="Surname">
    <SearchTypesDropdown :options="searchTypes" :otherDropdowns="[dropdownGivenname, dropdownFathersGivenname, dropdownMothersGivenname, dropdownMothersSurname, dropdownPlace, dropdownParish]" v-model="selectedSearchTypeSurname" ref="dropdownSurname"/>
    <input v-model="searchFields.first_name" type="text" class="filter-input" spellcheck="false" placeholder="Given Name">
    <SearchTypesDropdown :options="searchTypes" :otherDropdowns="[dropdownSurname, dropdownFathersGivenname, dropdownMothersGivenname, dropdownMothersSurname, dropdownPlace, dropdownParish]" v-model="selectedSearchTypeGivenname" ref="dropdownGivenname"/>

    <label class="option-label">Parent's Names:</label>

    <input v-model="searchFields.father" type="text" class="filter-input" spellcheck="false" placeholder="Father's Given Name">
    <SearchTypesDropdown :options="searchTypes" :otherDropdowns="[dropdownSurname, dropdownGivenname, dropdownMothersGivenname, dropdownMothersSurname, dropdownPlace, dropdownParish]" v-model="selectedSearchTypeFathersGivenname" ref="dropdownFathersGivenname"/>
    <input v-model="searchFields.mother_givenname" type="text" class="filter-input" spellcheck="false" placeholder="Mother's Given Name">
    <SearchTypesDropdown :options="searchTypes" :otherDropdowns="[dropdownSurname, dropdownGivenname, dropdownFathersGivenname, dropdownMothersSurname, dropdownPlace, dropdownParish]" v-model="selectedSearchTypeMothersGivenname" ref="dropdownMothersGivenname"/>
    <input v-model="searchFields.mother_surname" type="text" class="filter-input" spellcheck="false" placeholder="Mother's Surname">
    <SearchTypesDropdown :options="searchTypes" :otherDropdowns="[dropdownSurname, dropdownGivenname, dropdownFathersGivenname, dropdownMothersGivenname, dropdownPlace, dropdownParish]" v-model="selectedSearchTypeMothersSurname" ref="dropdownMothersSurname"/>

    <label class="option-label">Other:</label>
    <input v-model="searchFields.place" type="text" class="filter-input" spellcheck="false" :placeholder="checkUrlForLabel(' Place')">
    <SearchTypesDropdown :options="searchTypesPlace" :otherDropdowns="[dropdownSurname, dropdownGivenname, dropdownFathersGivenname, dropdownMothersGivenname, dropdownMothersSurname, dropdownParish]" v-model="selectedSearchTypePlace" ref="dropdownPlace"/>

    <input v-model="searchFields.parish" type="text" class="filter-input" spellcheck="false" :placeholder="'Parish'">
    <SearchTypesDropdown :options="searchTypes" :otherDropdowns="[dropdownSurname, dropdownGivenname, dropdownFathersGivenname, dropdownMothersGivenname, dropdownMothersSurname, dropdownPlace]" v-model="selectedSearchTypeParish" ref="dropdownParish"/>

  </BaseSearchCriteria>
</template>

<script setup lang="ts">
import { ref, computed, } from 'vue';
import BaseSearchCriteria, { Dropdown } from '../SearchCriteria.vue';
import SearchTypesDropdown from '../SearchTypesDropdown.vue';
import { checkUrlForLabel } from '../../../utilities/parsing';

const searchFields = ref({
  father: '',
  mother_givenname: '',
  mother_surname: '',
  first_name: '',
  last_name: '',
  place: '',
  parish: ''
});

// The human readable mapping
const fieldLabelMap: { [key: string]: string } = {
  father: 'Father\'s Given Name',
  mother_givenname: 'Mother\'s Given Name',
  mother_surname: 'Mother\'s Surname',
  first_name: 'Given Name',
  last_name: 'Surname',
  place: 'Birth Place',
  parish: 'Parish'
};

const searchTypes = ref(['Substring', 'DM', 'Case Insensitive']);
const searchTypesPlace = ref(['Substring', 'DM']);
const selectedSearchTypeFathersGivenname = ref(searchTypes.value[0]);
const selectedSearchTypeMothersGivenname = ref(searchTypes.value[0]);
const selectedSearchTypeMothersSurname = ref(searchTypes.value[0]);
const selectedSearchTypeGivenname = ref(searchTypes.value[0]);
const selectedSearchTypeSurname = ref(searchTypes.value[0]);
const selectedSearchTypePlace = ref(searchTypesPlace.value[0]);
const selectedSearchTypeParish = ref(searchTypesPlace.value[0]);

const dropdownFathersGivenname = ref<Dropdown>({ isOpen: false });
const dropdownGivenname = ref<Dropdown>({ isOpen: false });
const dropdownSurname = ref<Dropdown>({ isOpen: false });
const dropdownMothersGivenname = ref<Dropdown>({ isOpen: false });
const dropdownMothersSurname = ref<Dropdown>({ isOpen: false });
const dropdownPlace = ref<Dropdown>({ isOpen: false });
const dropdownParish = ref<Dropdown>({ isOpen: false });

const selectedSearchTypes = computed(() => {
  return {
    last_name: selectedSearchTypeSurname.value,
    first_name: selectedSearchTypeGivenname.value,
    father: selectedSearchTypeFathersGivenname.value,
    mother_givenname: selectedSearchTypeMothersGivenname.value,
    mother_surname: selectedSearchTypeMothersSurname.value,
    place: selectedSearchTypePlace.value,
    parish: selectedSearchTypeParish.value
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
