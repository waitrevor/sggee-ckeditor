<template>
  <BaseSearchCriteria ref="baseSearchRef" :searchFields="searchFields" :fieldLabelMap="fieldLabelMap">

    <label class="option-label" style="margin-top: -5px;">Full Name:</label>

    <input v-model="searchFields.surname" type="text" class="filter-input" spellcheck="false" placeholder="Surname">
    <SearchTypesDropdown :options="searchTypes" :otherDropdowns="[dropdownGivenname, dropdownPlaceBuried, dropdownFather, dropdownMotherGivenname, dropdownMotherSurname, dropdownSpouse]" v-model="selectedSearchTypeSurname" ref="dropdownSurname"/>
    <input v-model="searchFields.given_name" type="text" class="filter-input" spellcheck="false" placeholder="Given Name">
    <SearchTypesDropdown :options="searchTypes" :otherDropdowns="[dropdownSurname, dropdownPlaceBuried, dropdownFather, dropdownMotherGivenname, dropdownMotherSurname, dropdownSpouse]" v-model="selectedSearchTypeGivenname" ref="dropdownGivenname"/>

    <label class="option-label">Parent's Names:</label>

    <input v-model="searchFields.father" type="text" class="filter-input" spellcheck="false" placeholder="Father's Given Name">
    <SearchTypesDropdown :options="searchTypesPlace" :otherDropdowns="[dropdownSurname, dropdownGivenname, dropdownPlaceBuried, dropdownMotherGivenname, dropdownMotherSurname, dropdownSpouse]" v-model="selectedSearchTypeFather" ref="dropdownFather"/>
    <input v-model="searchFields.mother_surname" type="text" class="filter-input" spellcheck="false" placeholder="Mother's Surname">
    <SearchTypesDropdown :options="searchTypes" :otherDropdowns="[dropdownSurname, dropdownGivenname, dropdownPlaceBuried, dropdownFather, dropdownMotherGivenname, dropdownSpouse]" v-model="selectedSearchTypeMotherSurname" ref="dropdownMothersSurname"/>
    <input v-model="searchFields.mother_givenname" type="text" class="filter-input" spellcheck="false" placeholder="Mother's Given Name">
    <SearchTypesDropdown :options="searchTypes" :otherDropdowns="[dropdownSurname, dropdownGivenname, dropdownPlaceBuried, dropdownFather, dropdownMotherSurname, dropdownSpouse]" v-model="selectedSearchTypeMotherGivenname" ref="dropdownMothersGivenname"/>
    
    <label class="option-label">Life Events:</label>
    <input v-model="searchFields.place_buried" type="text" class="filter-input" spellcheck="false" :placeholder="checkUrlForLabel(' Place')">
    <SearchTypesDropdown :options="searchTypesPlace" :otherDropdowns="[dropdownSurname, dropdownGivenname, dropdownFather, dropdownMotherSurname, dropdownMotherGivenname, dropdownSpouse]" v-model="selectedSearchTypePlaceBuried" ref="dropdownPlaceBuried"/>

    <label class="option-label">Other:</label>
    <input v-model="searchFields.spouse" type="text" class="filter-input" spellcheck="false" placeholder="Spouse">
    <SearchTypesDropdown :options="searchTypesPlace" :otherDropdowns="[dropdownSurname, dropdownGivenname, dropdownPlaceBuried, dropdownFather, dropdownMotherSurname, dropdownMotherGivenname]" v-model="selectedSearchTypeSpouse" ref="dropdownSpouse"/>

    <input v-model="searchFields.year" type="text" class="filter-input" spellcheck="false" placeholder="Death Year">


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
  place_buried: '',
  father: '',
  mother_givenname: '',
  mother_surname: '',
  spouse: '',
  year: ''
});

// The human readable mapping
const fieldLabelMap: { [key: string]: string } = {
  surname: 'Surname',
  given_name: 'Given Name',
  father: 'Father\'s Given Name',
  mother_givenname: 'Mother\'s Given Name',
  mother_surname: 'Mother\'s Surname',
  place_buried: 'Death Place',
  spouse: 'Spouse',
  year: 'Death Year'
};

const searchTypes = ref(['Substring', 'DM', 'Case Insensitive']);
const searchTypesPlace = ref(['Substring', 'DM']);
const selectedSearchTypeSurname = ref(searchTypes.value[0]);
const selectedSearchTypeGivenname = ref(searchTypes.value[0]);
const selectedSearchTypePlaceBuried = ref(searchTypesPlace.value[0]);
const selectedSearchTypeFather = ref(searchTypesPlace.value[0]);
const selectedSearchTypeMotherGivenname = ref(searchTypes.value[0]);
const selectedSearchTypeMotherSurname = ref(searchTypes.value[0]);
const selectedSearchTypeSpouse = ref(searchTypesPlace.value[0]);

const dropdownSurname = ref<Dropdown>({ isOpen: false });
const dropdownGivenname = ref<Dropdown>({ isOpen: false });
const dropdownPlaceBuried = ref<Dropdown>({ isOpen: false });
const dropdownFather = ref<Dropdown>({ isOpen: false });
const dropdownMotherGivenname = ref<Dropdown>({ isOpen: false });
const dropdownMotherSurname = ref<Dropdown>({ isOpen: false });
const dropdownSpouse = ref<Dropdown>({ isOpen: false });

const selectedSearchTypes = computed(() => {
  return {
    surname: selectedSearchTypeSurname.value,
    given_name: selectedSearchTypeGivenname.value,
    birth_place: selectedSearchTypePlaceBuried.value,
    father: selectedSearchTypeFather.value,
    mother_givenname: selectedSearchTypeMotherGivenname.value,
    mother_surname: selectedSearchTypeMotherSurname.value,
    spouse: selectedSearchTypeSpouse.value,
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
