<template>
  <div v-for="(entry, index) in searchResults.data" :key="entry.id" class="card">

    <Person
      :individual="entry"
      :moreDetails="searchResults.moreDetails"
      :toggleDetails="toggleDetails"
      :index="index"
    />

    <div v-if="searchResults.moreDetails[index]" class="details-container">
      <div class="icons-container">

        <div @mouseover="showBirthFamilyTooltip[index] = true" @mouseleave="showBirthFamilyTooltip[index] = false" style="margin-left: 10px;" @click="showBirthFamilyTooltip[index] = false"> 
          <Modal v-if="entry.siblings && entry.siblings?.length > 0"
            header="Siblings"
            :iconSrc="'Birth'"
            :siblings="entry.siblings"
            @modal-opened="handleBirthModalOpened"
            @modal-closed="handleBirthModalOpened"
          />
          <div v-if="showBirthFamilyTooltip[index] && !isBirthModalOpen" class="search-tooltip"> Birth Family </div>
        </div>

        <div @mouseover="showSourceInfoTooltip[index] = true" @mouseleave="showSourceInfoTooltip[index] = false" style="margin-left: 10px;" @click="showSourceInfoTooltip[index] = false">
          <Modal v-if="entry.sources?.length != 0"
            header="Source Info"
            :subheading="`${entry.givenname+' '+entry.surname}`"
            :individualId="entry.id"
            :info="getInfo(entry)"
            :iconSrc="'Sources'"
            @modal-opened="handleSourceModalOpened"
            @modal-closed="handleSourceModalOpened"
          />
          <div v-if="showSourceInfoTooltip[index] && !isSourceModalOpen" class="search-tooltip"> Source Info </div>
        </div>

      </div>
      <template v-if="searchResults.runningAdditional[index]">
        <div style="margin: auto; display: flex;">
          <p style="margin-right: 10px;"> Loading... </p>
          <div class="spinner"></div>
        </div>
        
      </template>
      <template v-else-if="searchResults.detailsCache && searchResults.detailsCache[entry.id]">

        <template v-if="searchResults.detailsCache[entry.id].spouses?.length == 0">
          <div class="results-card" style="padding-inline: 20px; margin: auto;"> 
            No marriage data found
          </div>
        </template>
        <template v-for="(spouse, index) of searchResults.detailsCache[entry.id].spouses">
          <Family class="results-card"
            :marriagedt="getMarriageDate(spouse.marriageinfo, entry.spousefamilyid[index])"
            :marriagepl="getMarriagePlace(spouse.marriageinfo, entry.spousefamilyid[index])"
            :spouse="spouse.givenname + ' ' + spouse.surname"
            :spouse_id="spouse.id"
            :children="getChildren(searchResults.detailsCache[entry.id].children, spouse.children)" 
          />
        </template>
      </template>
    </div> 
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Person from './Person.vue';
import Modal from './Modal.vue';
import Family from './Family.vue';
import { constructMpdQueryVars, fetchMpdIndividualByIdAdditional } from '../../../graphql/mpd/api';
import { RelationshipDetails } from '../../../graphql/mpd/OperationsTypes';

const getMarriageDate = (marriageinfo: RelationshipDetails[], spouseId: string) => {
  return marriageinfo.find(info => info.relationshipid === spouseId)?.marriagedate;
};

const getMarriagePlace = (marriageinfo: RelationshipDetails[], spouseId: string) => {
  return marriageinfo.find(info => info.relationshipid === spouseId)?.marriageplace;
};

const getChildren = (obj1: any, obj2: any) => {
  const overlap = obj1.filter((item1: { id: any; }) =>
    obj2.some((item2: { id: any; }) => item1.id === item2.id)
  );
  return overlap;
}

const props = defineProps<{
  searchResults: any;
}>();

// Variables and Functions pertaining to Birth and Source Info
const showBirthFamilyTooltip = ref(Array.from({ length: props.searchResults.data.length }).fill(false));
const showSourceInfoTooltip  = ref(Array.from({ length: props.searchResults.data.length }).fill(false));
const isBirthModalOpen = ref(false);
const isSourceModalOpen = ref(false);

const handleBirthModalOpened = (isOpen: boolean) => {
  isBirthModalOpen.value = isOpen;
};

const handleSourceModalOpened = (isOpen: boolean) => {
  isSourceModalOpen.value = isOpen;
};

interface Sources {
  sourceinfo: string;
}

const getInfo = (entry: any) => {
  return entry?.sources?.map((sources: Sources) => '• ' + sources.sourceinfo.trim()).join('\n');
};

// Toggles the "More Details" view (also fetches the details if not previously cached)
const toggleDetails = async (index: number, individualId: string) => {
  props.searchResults.moreDetails[index] = !props.searchResults.moreDetails[index];
  if (!props.searchResults.detailsCache[individualId]) {
    try {
      props.searchResults.runningAdditional[index] = true;
      const vars = constructMpdQueryVars({ individualId: individualId });
      const individual = await fetchMpdIndividualByIdAdditional(vars);
      if (individual?.spouses) {
        props.searchResults.detailsCache[individualId] = individual;
      }
    } catch (err: any) {
      console.error('Error fetching additional details:', err.message);
    } finally {
      props.searchResults.runningAdditional[index] = false;
    }
  }
};

</script>
