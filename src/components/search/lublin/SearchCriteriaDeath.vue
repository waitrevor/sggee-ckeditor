<template>
  <BaseSearchCriteria ref="baseSearchRef" :searchFields="searchFields" :fieldLabelMap="fieldLabelMap">

    <label class="option-label" style="margin-top: -5px;">Full Names:</label>

    <input v-model="searchFields.surname" type="text" class="filter-input" spellcheck="false" placeholder="Surname">
    <SearchTypesDropdown :options="searchTypes" :otherDropdowns="[dropdownGivenname, dropdownFather, dropdownMother, dropdownSpouses, dropdownVillage]" v-model="selectedSearchTypeSurname" ref="dropdownSurname"/>
   
    <input v-model="searchFields.given_name" type="text" class="filter-input" spellcheck="false" placeholder="Given Name">
    <SearchTypesDropdown :options="searchTypes" :otherDropdowns="[dropdownSurname, dropdownFather, dropdownMother, dropdownSpouses, dropdownVillage]" v-model="selectedSearchTypeGivenname" ref="dropdownGivenname"/>
    
    <input v-model="searchFields.father_or_spouse" type="text" class="filter-input" spellcheck="false" placeholder="Father's Surname / Given Name">
    <SearchTypesDropdown :options="searchTypes" :otherDropdowns="[dropdownSurname, dropdownGivenname, dropdownMother, dropdownSpouses, dropdownVillage]" v-model="selectedSearchTypeFather" ref="dropdownFather"/>

    <input v-model="searchFields.mother_or_spouse" type="text" class="filter-input" spellcheck="false" placeholder="Mother's Surname / Given Name">
    <SearchTypesDropdown :options="searchTypes" :otherDropdowns="[dropdownSurname, dropdownGivenname, dropdownFather, dropdownSpouses, dropdownVillage]" v-model="selectedSearchTypeMother" ref="dropdownMother"/>
    
    <input v-model="searchFields.spouses" type="text" class="filter-input" spellcheck="false" placeholder="Spouse's Surname / Given Name">
    <SearchTypesDropdown :options="searchTypes" :otherDropdowns="[dropdownSurname, dropdownGivenname, dropdownFather, dropdownMother, dropdownVillage]" v-model="selectedSearchTypeSpouses" ref="dropdownSpouses"/>

    <label class="option-label">Event Details:</label>

    <input v-model="searchFields.village" type="text" class="filter-input" spellcheck="false" :placeholder="checkUrlForLabel(' Place')">
    <SearchTypesDropdown :options="searchTypesPlace" :otherDropdowns="[dropdownSurname, dropdownGivenname, dropdownFather, dropdownMother, dropdownSpouses]" v-model="selectedSearchTypeVillage" ref="dropdownVillage"/>
    
    <input v-model="searchFields.event_year" type="text" class="filter-input" spellcheck="false" :placeholder="checkUrlForLabel(' Year')">
  </BaseSearchCriteria>
</template>

<script setup lang="ts">
import { ref, computed, } from 'vue';
import BaseSearchCriteria, { Dropdown } from '../SearchCriteria.vue';
import SearchTypesDropdown from '../SearchTypesDropdown.vue';
import { checkUrlForLabel } from '../../../utilities/parsing';

const searchFields = ref({
  surname: '', 
  given_name: '',
  event_year: '',
  village: '',
  father_or_spouse: '',
  mother_or_spouse: '',
  spouses: '',
});

// The human readable mapping
const fieldLabelMap: { [key: string]: string } = {
  surname: 'Surname', 
  given_name: 'Given Name',
  event_year: 'Death Year',
  village: 'Death Place',
  father_or_spouse: 'Father\'s Surname / Given Name',
  mother_or_spouse: 'Mother\'s Surname / Given Name',
  spouses: 'Spouse\'s Surname / Given Name',
};

const searchTypes = ref(['Substring', 'DM', 'Case Insensitive']);
const searchTypesPlace = ref(['Substring', 'DM']);
const selectedSearchTypeSurname = ref(searchTypes.value[0]);
const selectedSearchTypeGivenname = ref(searchTypes.value[0]);
const selectedSearchTypeVillage = ref(searchTypesPlace.value[0]);
const selectedSearchTypeFather = ref(searchTypes.value[0]);
const selectedSearchTypeMother = ref(searchTypes.value[0]);
const selectedSearchTypeSpouses = ref(searchTypesPlace.value[0]);

const dropdownSurname = ref<Dropdown>({ isOpen: false });
const dropdownGivenname = ref<Dropdown>({ isOpen: false });
const dropdownVillage  = ref<Dropdown>({ isOpen: false });
const dropdownFather = ref<Dropdown>({ isOpen: false });
const dropdownMother = ref<Dropdown>({ isOpen: false });
const dropdownSpouses = ref<Dropdown>({ isOpen: false });

const selectedSearchTypes = computed(() => {
  return {
    surname: selectedSearchTypeSurname.value,
    given_name: selectedSearchTypeGivenname.value,
    event_year: 'Case Insensitive',
    father_or_spouse: selectedSearchTypeFather.value,
    mother_or_spouse: selectedSearchTypeMother.value,
    village: selectedSearchTypeVillage.value,
    spouses: selectedSearchTypeSpouses
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
