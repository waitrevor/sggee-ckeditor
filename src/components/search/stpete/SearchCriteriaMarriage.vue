<template>
    <BaseSearchCriteria ref="baseSearchRef" :searchFields="searchFields" :fieldLabelMap="fieldLabelMap">
  
      <label class="option-label" style="margin-top: -5px;">Groom's Full Name:</label>
      <input v-model="searchFields.groom_last" type="text" class="filter-input" spellcheck="false" placeholder="Surname">
      <SearchTypesDropdown :options="searchTypes" :otherDropdowns="[dropdownGroomFirst, dropdownBrideLast, dropdownBrideFirst, dropdownPlace]" v-model="selectedSearchTypeGroomLast" ref="dropdownGroomLast"/>
      <input v-model="searchFields.groom_first" type="text" class="filter-input" spellcheck="false" placeholder="Given Name">
      <SearchTypesDropdown :options="searchTypesFirstName" :otherDropdowns="[dropdownGroomLast, dropdownBrideLast, dropdownBrideFirst, dropdownPlace]" v-model="selectedSearchTypeGroomFirst" ref="dropdownGroomFirst"/>
  
      <label class="option-label">Bride's Full Name:</label>
      <input v-model="searchFields.bride_last" type="text" class="filter-input" spellcheck="false" placeholder="Surname">
      <SearchTypesDropdown :options="searchTypes" :otherDropdowns="[dropdownGroomLast, dropdownGroomFirst, dropdownBrideFirst, dropdownPlace]" v-model="selectedSearchTypeBrideLast" ref="dropdownBrideLast"/>
      <input v-model="searchFields.bride_first" type="text" class="filter-input" spellcheck="false" placeholder="Given Name">
      <SearchTypesDropdown :options="searchTypesFirstName" :otherDropdowns="[dropdownGroomLast, dropdownGroomFirst, dropdownBrideLast, dropdownPlace]" v-model="selectedSearchTypeBrideFirst" ref="dropdownBrideFirst"/>

      <label class="option-label">Life Events:</label>
      <input v-model="searchFields.place" type="text" class="filter-input" spellcheck="false" :placeholder="checkUrlForLabel(' Place')">
      <SearchTypesDropdown :options="searchTypesPlace" :otherDropdowns="[dropdownGroomLast, dropdownGroomFirst, dropdownBrideLast, dropdownBrideFirst]" v-model="selectedSearchTypePlace" ref="dropdownPlace"/>
  
    </BaseSearchCriteria>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, } from 'vue';
  import BaseSearchCriteria, { Dropdown } from '../SearchCriteria.vue';
  import SearchTypesDropdown from '../SearchTypesDropdown.vue';
  import { checkUrlForLabel } from '../../../utilities/parsing';
  
  const searchFields = ref({
    groom_last: '',
    groom_first: '',
    bride_last: '',
    bride_first: '',
    place: ''
  });

  // The human readable mapping
  const fieldLabelMap: { [key: string]: string } = {
    groom_last: 'Groom\'s Surname',
    groom_first: 'Groom\'s Given Name',
    bride_last: 'Bride\'s Surname',
    bride_first: 'Bride\'s Given Name',
    place: 'Marriage Place'
  };
  
  const searchTypes = ref(['Substring', 'DM', 'Case Insensitive']);
  const searchTypesFirstName = ref(['Substring', 'DM']);
  const searchTypesPlace = ref(['Substring', 'DM']);
  const selectedSearchTypeGroomLast = ref(searchTypes.value[0]);
  const selectedSearchTypeGroomFirst = ref(searchTypesFirstName.value[0]);
  const selectedSearchTypeBrideLast = ref(searchTypes.value[0]);
  const selectedSearchTypeBrideFirst = ref(searchTypesFirstName.value[0]);
  const selectedSearchTypePlace = ref(searchTypesPlace.value[0]);
  
  const dropdownGroomLast = ref<Dropdown>({ isOpen: false });
  const dropdownGroomFirst = ref<Dropdown>({ isOpen: false });
  const dropdownBrideLast = ref<Dropdown>({ isOpen: false });
  const dropdownBrideFirst = ref<Dropdown>({ isOpen: false });
  const dropdownPlace = ref<Dropdown>({ isOpen: false });
  
  const selectedSearchTypes = computed(() => {
    return {
      groom_last: selectedSearchTypeGroomLast.value,
      groom_first: selectedSearchTypeGroomFirst.value,
      bride_last: selectedSearchTypeBrideLast.value,
      bride_first: selectedSearchTypeBrideFirst.value,
      place: selectedSearchTypePlace.value
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
