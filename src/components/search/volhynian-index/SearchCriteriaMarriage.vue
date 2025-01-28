<template>
  <BaseSearchCriteria ref="baseSearchRef" :searchFields="searchFields" :fieldLabelMap="fieldLabelMap">

    <label class="option-label" style="margin-top: -5px;">Full Names:</label>

    <input v-model="searchFields.groom_surname" type="text" class="filter-input" spellcheck="false" placeholder="Groom's Surname">
    <SearchTypesDropdown :options="searchTypes" :otherDropdowns="[dropdownGroomGivenname, dropdownBrideSurname, dropdownBrideGivenname, dropdownPlace]" v-model="selectedSearchTypeGroomSurname" ref="dropdownGroomSurname"/>
    <input v-model="searchFields.groom_givenname" type="text" class="filter-input" spellcheck="false" placeholder="Groom's Given Name">
    <SearchTypesDropdown :options="searchTypes" :otherDropdowns="[dropdownGroomSurname, dropdownBrideSurname, dropdownBrideGivenname, dropdownPlace]" v-model="selectedSearchTypeGroomGivenname" ref="dropdownGroomGivenname"/>

    <input v-model="searchFields.bride_surname" type="text" class="filter-input" spellcheck="false" placeholder="Bride's Surname">
    <SearchTypesDropdown :options="searchTypesPlace" :otherDropdowns="[dropdownGroomSurname, dropdownGroomGivenname, dropdownBrideGivenname, dropdownPlace]" v-model="selectedSearchTypeBrideSurname" ref="dropdownBrideSurname"/>
    <input v-model="searchFields.bride_givenname" type="text" class="filter-input" spellcheck="false" placeholder="Brides's Given Name">
    <SearchTypesDropdown :options="searchTypes" :otherDropdowns="[dropdownGroomSurname, dropdownGroomGivenname, dropdownBrideSurname, dropdownPlace]" v-model="selectedSearchTypeBrideGivenname" ref="dropdownBrideGivenname"/>
    
    <label class="option-label">Life Events:</label>
    <input v-model="searchFields.place" type="text" class="filter-input" spellcheck="false" :placeholder="'Marriage Place'">
    <SearchTypesDropdown :options="searchTypesPlace" :otherDropdowns="[dropdownGroomSurname, dropdownGroomGivenname, dropdownBrideSurname, dropdownBrideGivenname]" v-model="selectedSearchTypePlace" ref="dropdownPlace"/>
    
    <input v-model="searchFields.year" type="text" class="filter-input" spellcheck="false" :placeholder="'Marriage Year'">

  </BaseSearchCriteria>
</template>

<script setup lang="ts">
import { ref, computed, } from 'vue';
import BaseSearchCriteria, { Dropdown } from '../SearchCriteria.vue';
import SearchTypesDropdown from '../SearchTypesDropdown.vue';

const searchFields = ref({
  groom_surname: '',
  groom_givenname: '',
  bride_surname: '',
  bride_givenname: '',
  place: '',
  year: ''
});

// The human readable mapping
const fieldLabelMap: { [key: string]: string } = {
  groom_surname: 'Groom\'s Surname',
  groom_givenname: 'Groom\'s Given Name',
  bride_surname: 'Bride\'s Surname',
  bride_givenname: 'Bride\'s Given Name',
  place: 'Marriage Place',
  year: 'Marriage Year'
};

const searchTypes = ref(['Substring', 'DM', 'Case Insensitive']);
const searchTypesPlace = ref(['Substring', 'DM']);
const selectedSearchTypeGroomSurname = ref(searchTypes.value[0]);
const selectedSearchTypeGroomGivenname = ref(searchTypes.value[0]);
const selectedSearchTypeBrideSurname = ref(searchTypesPlace.value[0]);
const selectedSearchTypeBrideGivenname = ref(searchTypes.value[0]);
const selectedSearchTypePlace = ref(searchTypesPlace.value[0]);

const dropdownGroomSurname = ref<Dropdown>({ isOpen: false });
const dropdownGroomGivenname = ref<Dropdown>({ isOpen: false });
const dropdownBrideSurname = ref<Dropdown>({ isOpen: false });
const dropdownBrideGivenname = ref<Dropdown>({ isOpen: false });
const dropdownPlace = ref<Dropdown>({ isOpen: false });

const selectedSearchTypes = computed(() => {
  return {
    groom_surname: selectedSearchTypeGroomSurname.value,
    groom_givenname: selectedSearchTypeGroomGivenname.value,
    bride_surname: selectedSearchTypeBrideSurname.value,
    bride_givenname: selectedSearchTypeBrideGivenname.value,
    place: selectedSearchTypePlace.value,
    year: 'Case Insensitive'
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
