<template>
    <BaseSearchCriteria ref="baseSearchRef" :searchFields="searchFields" :fieldLabelMap="fieldLabelMap">
      <label class="option-label" style="margin-top: -5px;">Full Name:</label>

      <input v-model="searchFields.surname" type="text" class="filter-input" placeholder="Surname" spellcheck="false">
      <SearchTypesDropdown :options="searchTypes" :otherDropdowns="[dropdownGivenname]" v-model="selectedSearchTypeSurname" ref="dropdownSurname"/>
  
      <input v-model="searchFields.givenname" type="text" class="filter-input" placeholder="Given Name" spellcheck="false">
      <SearchTypesDropdown :options="searchTypes" :otherDropdowns="[dropdownSurname]" v-model="selectedSearchTypeGivenname" ref="dropdownGivenname"/>
  
      <label class="option-label">Member Details:</label>

      <input v-model="searchFields.email" type="text" class="filter-input" placeholder="Email" spellcheck="false">

      <input v-model="searchFields.memnum" type="text" class="filter-input" placeholder="Member Number" spellcheck="false">
  
    </BaseSearchCriteria>
  </template>
  
<script setup lang="ts">
import { ref, computed } from 'vue';
import BaseSearchCriteria, { Dropdown } from '../SearchCriteria.vue';
import SearchTypesDropdown from '../SearchTypesDropdown.vue';

const searchTypes = ref(['Substring', 'DM', 'Case Insensitive']);
const selectedSearchTypeSurname = ref(searchTypes.value[0]);
const selectedSearchTypeGivenname = ref(searchTypes.value[0]);

const dropdownSurname = ref<Dropdown>({ isOpen: false });
const dropdownGivenname = ref<Dropdown>({ isOpen: false });

// The input fields and control flags coming from the Search Criteria component
const searchFields = ref({
  memnum: '',
  surname: '',
  givenname: '',
  email: ''
});

// The human readable mapping
const fieldLabelMap: { [key: string]: string } = {
  memnum: 'Member Number',
  surname: 'Surname',
  givenname: 'Given Name',
  email: 'Email'
};

const selectedSearchTypes = computed(() => {
  return {
    memnum: 'Substring',
    surname: selectedSearchTypeSurname.value,
    givenname: selectedSearchTypeGivenname.value,
    email: 'Substring'
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
  