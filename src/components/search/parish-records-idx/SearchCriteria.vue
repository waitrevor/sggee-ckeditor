<template>
  <BaseSearchCriteria ref="baseSearchRef" :searchFields="searchFields" :fieldLabelMap="fieldLabelMap">
    <label class="option-label" style="margin-top: -5px;">Full Names:</label>

    <input v-model="searchFields.surname" type="text" class="filter-input" placeholder="Surname" spellcheck="false">
    <SearchTypesDropdown :options="searchTypes" :otherDropdowns="[dropdownGivenname, dropdownSpouse, dropdownExtractor, dropdownParish]" v-model="selectedSearchTypeSurname" ref="dropdownSurname"/>

    <input v-model="searchFields.name" type="text" class="filter-input" placeholder="Given Name" spellcheck="false">
    <SearchTypesDropdown :options="searchTypes" :otherDropdowns="[dropdownSurname, dropdownSpouse, dropdownExtractor, dropdownParish]" v-model="selectedSearchTypeGivenname" ref="dropdownGivenname"/>

    <input v-model="searchFields.spouse" type="text" class="filter-input" placeholder="Spouse" spellcheck="false">
    <SearchTypesDropdown :options="searchTypes" :otherDropdowns="[dropdownSurname, dropdownGivenname, dropdownExtractor, dropdownParish]" v-model="selectedSearchTypeSpouse" ref="dropdownSpouse"/>

    <input v-model="searchFields.extractor" type="text" class="filter-input" placeholder="Extractor" spellcheck="false">
    <SearchTypesDropdown :options="searchTypesOther" :otherDropdowns="[dropdownSurname, dropdownGivenname, dropdownSpouse, dropdownParish]" v-model="selectedSearchTypeExtractor" ref="dropdownExtractor"/>
    
    <label class="option-label">Other:</label>

    <input v-model="searchFields.parish" type="text" class="filter-input" placeholder="Parish" spellcheck="false">
    <SearchTypesDropdown :options="searchTypes" :otherDropdowns="[dropdownSurname, dropdownGivenname, dropdownSpouse, dropdownExtractor]" v-model="selectedSearchTypeParish" ref="dropdownParish"/>

    <!--input v-model="searchFields.recordtype" type="text" class="filter-input" placeholder="Record Type" spellcheck="false"-->

    <input v-model="searchFields.eventyear" type="text" class="filter-input" placeholder="Event Year" spellcheck="false">

    <label class="option-label" style="margin-top: 10px;">Record Type:</label>
    <div class="radio-group">
      <label v-for="option in options" :key="option.value" class="radio-label">
        <input
          type="radio"
          :value="option.value"
          v-model="selectedRecordType"
          class="radio-input"
        />
        {{ option.label }}
      </label>
    </div>

  </BaseSearchCriteria>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import BaseSearchCriteria, { Dropdown } from '../SearchCriteria.vue';
import SearchTypesDropdown from '../SearchTypesDropdown.vue';

const selectedRecordType = ref('');

const options = [
  { value: '', label: 'All' },
  { value: 'B', label: 'Birth' },
  { value: 'M', label: 'Marriage' },
  { value: 'D', label: 'Death' },
];

const searchTypes = ref(['Substring', 'DM', 'Case Insensitive']);
const searchTypesOther = ref(['Substring', 'DM']);
const selectedSearchTypeSurname = ref(searchTypes.value[0]);
const selectedSearchTypeGivenname = ref(searchTypes.value[0]);
const selectedSearchTypeSpouse = ref(searchTypesOther.value[0]);
const selectedSearchTypeParish = ref(searchTypes.value[0]);
const selectedSearchTypeExtractor = ref(searchTypesOther.value[0]);

const dropdownSurname = ref<Dropdown>({ isOpen: false });
const dropdownGivenname = ref<Dropdown>({ isOpen: false });
const dropdownSpouse = ref<Dropdown>({ isOpen: false });
const dropdownParish = ref<Dropdown>({ isOpen: false });
const dropdownExtractor = ref<Dropdown>({ isOpen: false });

// The input fields and control flags coming from the Search Criteria component
const searchFields = ref({
  surname: '',
  name: '',
  spouse: '',
  parish: '',
  extractor: '',
  eventyear: '',
  recordtype: selectedRecordType.value
});

// The human readable mapping
const fieldLabelMap: { [key: string]: string } = {
  surname: 'Surname',
  name: 'Given Name',
  eventyear: 'Event Year',
  spouse: 'Spouse',
  parish: 'Parish',
  extractor: 'Extractor'
};

const selectedSearchTypes = computed(() => {
  return {
    surname: selectedSearchTypeSurname.value,
    name: selectedSearchTypeGivenname.value,
    recordtype: 'Case Insensitive',
    eventyear: 'Case Insensitive',
    spouse: selectedSearchTypeSpouse.value,
    parish: selectedSearchTypeParish.value,
    extractor: selectedSearchTypeExtractor.value,
  };
});

// Watch for changes in selectedRecordType and update searchFields
watch(selectedRecordType, (newValue) => {
  searchFields.value.recordtype = newValue;
});

// Example: Watch searchFields to keep it in sync with selectedRecordType
watch(() => searchFields.value.recordtype, (newValue) => {
  selectedRecordType.value = newValue;
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

.radio-group {
  display: flex;
  align-items: left;
  margin-top: 3px;
}

.radio-label {
  display: flex;
  align-items: left;
  margin-right: 10px; /* Space between labels */
  margin-bottom: 0px;
}

.radio-input {
  margin-right: 5px; /* Space between radio input and label text */
  margin-top: 0px;
  margin-bottom: 0px;
}
</style>
