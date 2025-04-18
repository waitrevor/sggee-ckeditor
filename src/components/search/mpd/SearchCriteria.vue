<template>
  <BaseSearchCriteria ref="baseSearchRef" :searchFields="searchFields" :fieldLabelMap="fieldLabelMap">

    <label class="option-label" style="margin-top: -5px;">Full Name:</label>
    <!-- Surname -->
    <input v-if="searchFields.individualId == ''" v-model="searchFields.surname" type="text" class="filter-input" :placeholder="fieldLabelMap.surname" spellcheck="false">
    <input v-else v-model="searchFields.surname" type="text" class="filter-input" placeholder="N/A when using ID" spellcheck="false" :disabled="true">
    <SearchTypesDropdown :options="searchTypes" :otherDropdowns="[dropdownGivenname, dropdownBirthpl, dropdownDeathpl]" v-model="selectedSearchTypeSurname" ref="dropdownSurname"/>

    <!-- Given Name -->
    <input v-if="searchFields.individualId == ''" v-model="searchFields.givenname" type="text" class="filter-input" :placeholder="fieldLabelMap.givenname" spellcheck="false">
    <input v-else v-model="searchFields.givenname" type="text" class="filter-input" placeholder="N/A when using ID" spellcheck="false" :disabled="true">
    <SearchTypesDropdown :options="searchTypes" :otherDropdowns="[dropdownSurname, dropdownBirthpl, dropdownDeathpl]" v-model="selectedSearchTypeGivenName" ref="dropdownGivenname"/>

    <label class="option-label">Life Events:</label>
    <!-- Birth Place-->
    <input v-if="searchFields.individualId == ''" v-model="searchFields.birthpl" type="text" class="filter-input" :placeholder="fieldLabelMap.birthpl" spellcheck="false">
    <input v-else v-model="searchFields.birthpl" type="text" class="filter-input" placeholder="N/A when using ID" spellcheck="false" :disabled="true">
    <SearchTypesDropdown :options="searchTypesPlace" :otherDropdowns="[dropdownSurname, dropdownGivenname, dropdownDeathpl]" v-model="selectedSearchTypeBirthPlace" ref="dropdownBirthpl"/>

    <!-- Death Place -->
    <input v-if="searchFields.individualId == ''" v-model="searchFields.deathpl" type="text" class="filter-input" :placeholder="fieldLabelMap.deathpl" spellcheck="false">
    <input v-else v-model="searchFields.deathpl" type="text" class="filter-input" placeholder="N/A when using ID" spellcheck="false" :disabled="true">
    <SearchTypesDropdown :options="searchTypesPlace" :otherDropdowns="[dropdownSurname, dropdownGivenname, dropdownBirthpl]" v-model="selectedSearchTypeDeathPlace" ref="dropdownDeathpl"/>

    <label class="option-label">Other:</label>
    <!-- Individual ID -->
    <input v-if="isAnyFieldPopulated()" v-model="searchFields.individualId" type="text" class="filter-input" placeholder="N/A when using other fields" spellcheck="false" :disabled="isAnyFieldPopulated()">
    <input v-else v-model="searchFields.individualId" type="text" class="filter-input" :placeholder="fieldLabelMap.individualId" spellcheck="false">
  </BaseSearchCriteria>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import BaseSearchCriteria, { Dropdown } from '../SearchCriteria.vue';
import SearchTypesDropdown from '../SearchTypesDropdown.vue';

// The input fields and control flags coming from the Search Criteria component
const searchFields = ref({
  surname: '',
  givenname: '',
  birthpl: '',
  deathpl: '',
  individualId: ''
});

// Dropdowns
const dropdownSurname = ref<Dropdown>({ isOpen: false });
const dropdownGivenname = ref<Dropdown>({ isOpen: false });
const dropdownBirthpl = ref<Dropdown>({ isOpen: false });
const dropdownDeathpl = ref<Dropdown>({ isOpen: false });

// The human readable mapping
const fieldLabelMap: { [key: string]: string } = {
  surname: 'Surname',
  givenname: 'Given Name',
  birthpl: 'Birth Place',
  deathpl: 'Death Place',
  individualId: 'Individual\'s ID'
};

// Search Types
const searchTypes = ref(['Substring', 'DM', 'Case Insensitive']);
const searchTypesPlace = ref(['Substring', 'DM']);
const selectedSearchTypeSurname = ref(searchTypes.value[0]);
const selectedSearchTypeGivenName = ref(searchTypes.value[0]);
const selectedSearchTypeBirthPlace = ref(searchTypesPlace.value[0]);
const selectedSearchTypeDeathPlace = ref(searchTypesPlace.value[0]);

const selectedSearchTypes = computed(() => {
  return {
    surname: selectedSearchTypeSurname.value,
    givenname: selectedSearchTypeGivenName.value,
    birthpl: selectedSearchTypeBirthPlace.value,
    deathpl: selectedSearchTypeDeathPlace.value
  };
});

const isAnyFieldPopulated = (): boolean => {
  const fieldsToCheck = [searchFields.value.surname, searchFields.value.givenname, searchFields.value.birthpl, searchFields.value.deathpl];
  return fieldsToCheck.some(field => field !== '');
};

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
