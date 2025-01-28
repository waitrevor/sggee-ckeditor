<template>
  <BaseSearchCriteria ref="baseSearchRef" :searchFields="searchFields" :fieldLabelMap="fieldLabelMap">

    <label class="option-label" style="margin-top: -5px;">Full Names:</label>

    <input v-model="searchFields.surname" type="text" class="filter-input" spellcheck="false" placeholder="Groom's Surname">
    <SearchTypesDropdown :options="searchTypes" :otherDropdowns="[dropdownGivenname, dropdownBride, dropdownGroomsParents, dropdownBridesParents, dropdownSpouses, dropdownVillage]" v-model="selectedSearchTypeSurname" ref="dropdownSurname"/>
   
    <input v-model="searchFields.given_name" type="text" class="filter-input" spellcheck="false" placeholder="Groom's Given Name">
    <SearchTypesDropdown :options="searchTypes" :otherDropdowns="[dropdownSurname, dropdownBride, dropdownGroomsParents, dropdownBridesParents, dropdownSpouses, dropdownVillage]" v-model="selectedSearchTypeGivenname" ref="dropdownGivenname"/>
    
    <input v-model="searchFields.mother_or_spouse" type="text" class="filter-input" spellcheck="false" placeholder="Bride's Surname, Given Name">
    <SearchTypesDropdown :options="searchTypes" :otherDropdowns="[dropdownSurname, dropdownGivenname, dropdownGroomsParents, dropdownBridesParents, dropdownSpouses, dropdownVillage]" v-model="selectedSearchTypeBride" ref="dropdownBride"/>


    <input v-model="searchFields.grooms_parents" type="text" class="filter-input" spellcheck="false" placeholder="Groom's Parents">
    <SearchTypesDropdown :options="searchTypes" :otherDropdowns="[dropdownSurname, dropdownGivenname, dropdownBride, dropdownBridesParents, dropdownSpouses, dropdownVillage]" v-model="selectedSearchTypeGroomsParents" ref="dropdownGroomsParents"/>
    
    <input v-model="searchFields.brides_parents" type="text" class="filter-input" spellcheck="false" placeholder="Bride's Parents">
    <SearchTypesDropdown :options="searchTypes" :otherDropdowns="[dropdownSurname, dropdownGivenname, dropdownBride, dropdownGroomsParents, dropdownSpouses, dropdownVillage]" v-model="selectedSearchTypeBridesParents" ref="dropdownBridesParents"/>
    
    
    <input v-model="searchFields.spouses" type="text" class="filter-input" spellcheck="false" placeholder="Previous Spouses">
    <SearchTypesDropdown :options="searchTypes" :otherDropdowns="[dropdownSurname, dropdownGivenname, dropdownBride, dropdownGroomsParents, dropdownBridesParents, dropdownVillage]" v-model="selectedSearchTypeSpouses" ref="dropdownSpouses"/>

    <label class="option-label">Event Details:</label>

    <input v-model="searchFields.village" type="text" class="filter-input" spellcheck="false" placeholder="Village">
    <SearchTypesDropdown :options="searchTypesPlace" :otherDropdowns="[dropdownSurname, dropdownGivenname, dropdownBride, dropdownGroomsParents, dropdownBridesParents, dropdownSpouses]" v-model="selectedSearchTypeVillage" ref="dropdownVillage"/>
    
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
  mother_or_spouse: '', 
  brides_parents: '',
  spouses: '',
  grooms_parents: ''
});

// The human readable mapping
const fieldLabelMap: { [key: string]: string } = {
  surname: 'Groom\'s Surname',
  given_name: 'Groom\'s Given Name',
  mother_or_spouse: 'Bride\'s Surname, Given Name', 
  grooms_parents: 'Groom\'s Parents',
  brides_parents: 'Bride\'s Parents',
  spouses: 'Previous Spouses',
  village: 'Village',
  event_year: 'Marriage Year',
};

const searchTypes = ref(['Substring', 'DM', 'Case Insensitive']);
const searchTypesPlace = ref(['Substring', 'DM']);
const selectedSearchTypeSurname = ref(searchTypes.value[0]);
const selectedSearchTypeGivenname = ref(searchTypes.value[0]);
const selectedSearchTypeVillage = ref(searchTypesPlace.value[0]);
const selectedSearchTypeBride = ref(searchTypes.value[0]);
const selectedSearchTypeBridesParents = ref(searchTypes.value[0]);
const selectedSearchTypeSpouses = ref(searchTypesPlace.value[0]);
const selectedSearchTypeGroomsParents = ref(searchTypes.value[0]);

const dropdownSurname = ref<Dropdown>({ isOpen: false });
const dropdownGivenname = ref<Dropdown>({ isOpen: false });
const dropdownVillage  = ref<Dropdown>({ isOpen: false });
const dropdownBride  = ref<Dropdown>({ isOpen: false });
const dropdownBridesParents  = ref<Dropdown>({ isOpen: false });
const dropdownSpouses = ref<Dropdown>({ isOpen: false });
const dropdownGroomsParents = ref<Dropdown>({ isOpen: false });

const selectedSearchTypes = computed(() => {
  return {
    surname: selectedSearchTypeSurname.value,
    given_name: selectedSearchTypeGivenname.value,
    event_year: 'Case Insensitive',
    village: selectedSearchTypeVillage.value,
    mother_or_spouse: selectedSearchTypeBride.value,
    brides_parents: selectedSearchTypeBridesParents.value,
    spouses: selectedSearchTypeSpouses.value,
    grooms_parents: selectedSearchTypeGroomsParents.value
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
