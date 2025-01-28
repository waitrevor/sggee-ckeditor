<template>
    <BaseSearchCriteria ref="baseSearchRef" :searchFields="searchFields" :fieldLabelMap="fieldLabelMap">
      <label class="option-label" style="margin-top: -5px;">Full Name:</label>

      <input v-model="searchFields.last_name" type="text" class="filter-input" placeholder="Surname" spellcheck="false">
      <SearchTypesDropdown :options="searchTypes" :otherDropdowns="[selectedSearchTypeFirstName]" v-model="selectedSearchTypeLastName" ref="dropdownLastName"/>
  
      <input v-model="searchFields.first_name" type="text" class="filter-input" placeholder="Given Name" spellcheck="false">
      <SearchTypesDropdown :options="searchTypes" :otherDropdowns="[selectedSearchTypeLastName]" v-model="selectedSearchTypeFirstName" ref="dropdownFirstName"/>
  
      <label class="option-label" style="margin-top: -5px;">Source Info:</label>

      <input v-model="searchFields.film_or_item" type="text" class="filter-input" placeholder="Film Number" spellcheck="false">
      <input v-model="searchFields.register" type="text" class="filter-input" placeholder="Register" spellcheck="false">
      <input v-model="searchFields.pagenum" type="text" class="filter-input" placeholder="Page Number" spellcheck="false">  
    </BaseSearchCriteria>
  </template>
  
  <script setup lang="ts">
  import { ref, computed } from 'vue';
  import BaseSearchCriteria, { Dropdown } from '../SearchCriteria.vue';
  import SearchTypesDropdown from '../SearchTypesDropdown.vue';
  
  const searchTypes = ref(['Substring', 'DM', 'Case Insensitive']);
  const selectedSearchTypeLastName = ref(searchTypes.value[0]);
  const selectedSearchTypeFirstName = ref(searchTypes.value[0]);
  
  const dropdownLastName = ref<Dropdown>({ isOpen: false });
  const dropdownFirstName = ref<Dropdown>({ isOpen: false });
  
  // The input fields and control flags coming from the Search Criteria component
  const searchFields = ref({
    film_or_item: '',
    register: '',
    pagenum: '',
    last_name: '',
    first_name: ''
  });

  // The human readable mapping
  const fieldLabelMap: { [key: string]: string } = {
    last_name: 'Surname',
    first_name: 'Given Name',
    film_or_item: 'Film Number',
    register: 'Register',
    pagenum: 'Page Number'
  };
  
  const selectedSearchTypes = computed(() => {
    return {
      film_or_item: 'Case Insensitive',
      register: 'Case Insensitive',
      pagenum: 'Case Insensitive',
      last_name: selectedSearchTypeLastName.value,
      first_name: selectedSearchTypeFirstName.value,
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
