<script setup lang="ts">
import { ref, Ref, reactive, onMounted, onBeforeUnmount, onBeforeMount, nextTick, watch } from 'vue';
import { useRoute, useRouter, Router, RouteLocationNormalizedLoaded } from 'vue-router';

import { topMenuOffset, updateMarginTop } from '../utilities/spacing';
import { TimeoutError } from '../graphql/errors';

import MpdSearchCriteria from '../components/search/mpd/SearchCriteria.vue';
import MpdSearchResults from '../components/search/mpd/SearchResults.vue';
import { Individual } from '../graphql/mpd/OperationsTypes';
import { fetchMpdIndividualById } from '../graphql/mpd/api';

import StPeteSearchCriteria from '../components/search/stpete/SearchCriteria.vue';
import StPeteMarriageSearchCriteria from '../components/search/stpete/SearchCriteriaMarriage.vue'
import StPeteSearchResults from '../components/search/stpete/SearchResults.vue';

import BreyerSearchCriteria from '../components/search/breyer/SearchCriteria.vue';
import BreyerSearchResults from '../components/search/breyer/SearchResults.vue';

import UkraineSearchCriteria from '../components/search/ukraine/SearchCriteria.vue';
import UkraineSearchResults from '../components/search/ukraine/SearchResults.vue';

import VolhynianBirthSearchCriteria from '../components/search/volhynian-index/SearchCriteriaBirth.vue';
import VolhynianMarriageSearchCriteria from '../components/search/volhynian-index/SearchCriteriaMarriage.vue';
import VolhynianDeathSearchCriteria from '../components/search/volhynian-index/SearchCriteriaDeath.vue';
import VolhynianBirthSearchResults from '../components/search/volhynian-index/SearchResultsBirth.vue';
import VolhynianMarriageSearchResults from '../components/search/volhynian-index/SearchResultsMarriage.vue';
import VolhynianDeathSearchResults from '../components/search/volhynian-index/SearchResultsDeath.vue';

import LublinBirthSearchCriteria from '../components/search/lublin/SearchCriteriaBirth.vue';
import LublinBirthSearchResults from '../components/search/lublin/SearchResultsBirth.vue';
import LublinMarriageSearchCriteria from '../components/search/lublin/SearchCriteriaMarriage.vue';
import LublinMarriageSearchResults from '../components/search/lublin/SearchResultsMarriage.vue';
import LublinDeathSearchCriteria from '../components/search/lublin/SearchCriteriaDeath.vue';
import LublinDeathSearchResults from '../components/search/lublin/SearchResultsDeath.vue';

import MembershipSearchCriteria from '../components/search/membership/SearchCriteria.vue';
import MembershipSearchResults from '../components/search/membership/SearchResults.vue';

import OdessaStPeteSearchCriteria from '../components/search/odessa-stpete/SearchCriteria.vue';
import OdessaStPeteSearchResults from '../components/search/odessa-stpete/SearchResults.vue';

import ParishRecordsIdxSearchCriteria from '../components/search/parish-records-idx/SearchCriteria.vue';
import ParishRecordsIdxSearchResults from '../components/search/parish-records-idx/SearchResults.vue';

import LodzTrinitySearchCriteria from '../components/search/lodz-trinity/SearchCriteria.vue';
import LodzTrinitySearchResults from '../components/search/lodz-trinity/SearchResults.vue';

import RussiaPolandSearchCriteria from '../components/search/web-map-index/SearchCriteria.vue';
import RussiaPolandSearchResults from '../components/search/web-map-index/SearchResults.vue';

import { fetchResults } from '../graphql/api';

type CombinedSearchCriteria =
  typeof MpdSearchCriteria |
  typeof StPeteSearchCriteria | typeof StPeteMarriageSearchCriteria | 
  typeof VolhynianBirthSearchCriteria | typeof VolhynianMarriageSearchResults | typeof VolhynianDeathSearchCriteria |
  typeof LublinBirthSearchCriteria | typeof LublinMarriageSearchCriteria | typeof LublinDeathSearchCriteria |
  typeof BreyerSearchCriteria |
  typeof UkraineSearchCriteria |
  typeof MembershipSearchCriteria | 
  typeof OdessaStPeteSearchCriteria |
  typeof ParishRecordsIdxSearchCriteria | 
  typeof RussiaPolandSearchCriteria | 
  typeof LodzTrinitySearchCriteria;

const props = defineProps<{
  searchPage: string,
  getMetaText: () => Promise<string>,
  updateRouteParameters: (
    searchCriteriaRef: Ref,
    currentPage: Ref<number>,
    resultsPerPage: Ref<number>,
    routeParameters: Ref,
    router: Router,
    pushRoute?: boolean
  ) => void,
  updateSearchCriteriaFromRoute: (
    searchCriteriaRef: Ref,
    currentPage: Ref,
    resultsPerPage: Ref,
    route: RouteLocationNormalizedLoaded
  ) => void,
  fetchFunction: (variables: any) => Promise<any>,
  resultsKey: keyof any
}>();

// The input fields and control flags coming from the Search Criteria component
const searchCriteriaRef = ref<CombinedSearchCriteria | null>(null);

// Vue Router hooks (used for updating search params within URL)
const route = useRoute();
const router = useRouter();
const routeParameters = ref({});

// Results and Pagination Variables
const numResultsOptions = [10, 25, 50];           // "Show X Per Page" Dropdown Options
const resultsPerPage = ref(numResultsOptions[0])  // Default # per page
const currentPage = ref(1);
const totalPages = ref(1);
const numResults = ref(0);
const databaseName = ref<String>('');

// Dynamic Top Margin for the Results
const resultsMargin = ref('0px');

// Notification message to display to the user
const notification = ref<string | null>(null);

const searchResults = reactive({
  data: [] as any[],                                   // An array containing the results from the query
  detailsCache: {} as { [individualId: string]: Individual }, // Contains the additional details for an Individual (per id)
  birthCache: {} as { [individualId: string]: Individual },
  sourceCache: {} as { [individualId: string]: Individual },
  moreDetails: Array.from({ length: 0 }).fill(false),         // Controls which additional details to show for each data element
  running: ref(false),                                        // Whether a search is currently running
  runningAdditional: Array.from({ length: 0 }).fill(false),   // Whether an additional search is running (more details)
  hasPerformedSearch: ref(false)                              // Whether a search has been performed
});

// Function to go to a specific page (in bounds)
const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
    deselectMoreDetails();
    clearMoreDetailsCache();
  }
};

// Function to show a notification and automatically hide after the specified timeout duration
const showNotification = (message: string, timeout: number = 5000) => {
  notification.value = message;
  setTimeout(() => {
    notification.value = null;
  }, timeout);
};

// Returns a boolean representing whether every searchFields is empty or not
const fieldsEmpty = (): boolean => {
  for (const key in searchCriteriaRef.value?.searchFields) {
    if (typeof searchCriteriaRef.value?.searchFields[key] === 'string') {
      if (searchCriteriaRef.value?.searchFields[key] !== '') {
        return false;
      }
    }
  }
  return true;
};

// Resets the string fields of the SearchCriteria component
const resetSearchCriteria = () => {
  if (searchCriteriaRef.value) {
    const searchFields = searchCriteriaRef.value.searchFields;
    for (const key in searchFields) {
      if (Object.prototype.hasOwnProperty.call(searchFields, key)) {
        searchFields[key as keyof typeof searchFields] = '';
      }
    }
    currentPage.value = 1;

    // Also reset sorting
    searchCriteriaRef.value?.resetSelectedFields()
  }
};

const clearMoreDetailsCache = () => {
  searchResults.detailsCache = {} as { [individualId: string]: Individual };
};

const deselectMoreDetails = () => {
  searchResults.moreDetails = Array.from({ length: 0 }).fill(false);
}

const resetSearchResults = () => {
  searchResults.data = [];
  numResults.value = 0;
  clearMoreDetailsCache();
  deselectMoreDetails();
  searchResults.running = false;
  searchResults.runningAdditional = Array.from({ length: 0 }).fill(false);
  searchResults.hasPerformedSearch = false;
};


// Performs a single query depending on the fields provided from SearchCritera
// NOTE: uses a db specific fetchResults() function
const performSearch = async () => {
  resetSearchResults();
  if (searchCriteriaRef.value && !fieldsEmpty()) {
    try {
      if (props.searchPage == 'mpd' && searchCriteriaRef.value.searchFields.individualId) {
        await fetchResults(searchResults, numResults, resultsPerPage, currentPage, searchCriteriaRef, routeParameters, router, fetchMpdIndividualById, props.resultsKey);
      } else {
        await fetchResults(searchResults, numResults, resultsPerPage, currentPage, searchCriteriaRef, routeParameters, router, props.fetchFunction, props.resultsKey);
      }
    } 
    catch (error: any) {
      if (error instanceof TimeoutError) {
        showNotification('Operation timed out. Please try again.');
        searchResults.hasPerformedSearch = false;
      } else {
        showNotification('Error performing search. '+error.message+'.');
        console.error('Error performing search:', error.message);
      }
    }
    finally {
      searchResults.running = false;
    }
  }
};

// Runs when a search has been initiated from "Search Criteria" panel
watch(() => searchCriteriaRef.value?.searchFlag, (newFlag, oldFlag) => {
  performSearch();
  currentPage.value = 1
  router.push({ query: { pageNum: currentPage.value, perPage: resultsPerPage.value } });
});

// Resets the search criteria and search results
watch(() => searchCriteriaRef.value?.resetFlag, (newFlag, oldFlag) => {
  resetSearchResults();
  resetSearchCriteria();
});

// Watch for changes to the search results and results per page, and update pagination
// Calculate the total number of pages based on the number of results and results per page
watch([numResults, resultsPerPage], ([newNumResults, newResultsPerPage]) => {
  totalPages.value = Math.ceil(newNumResults / newResultsPerPage);
  if (totalPages.value != 0 && currentPage.value > totalPages.value) {
    currentPage.value = 1;
  }
  props.updateRouteParameters(searchCriteriaRef, currentPage, resultsPerPage, routeParameters, router, true);
});

// Watch for changes in the pageNumber and reperform the search
watch(currentPage, (newPageNumber) => {
  performSearch();
});

// Watch for changes in route query parameters, and perform the search
watch(
  () => route.query,
  () => {
    props.updateSearchCriteriaFromRoute(searchCriteriaRef, currentPage, resultsPerPage, route);
    if (searchCriteriaRef.value) {
      searchCriteriaRef.value = { ...searchCriteriaRef.value } as CombinedSearchCriteria | null; // Explicitly trigger a change to ensure reactivity
    }
    performSearch();
  },
  { immediate: true, deep: true }
  // immediate => Triggers the watcher immediately on component creation 
  // deep => Ensures watcher reacts to changes within nested properties of the watched object
);

// Watch for changes in internal fields, update route parameters whenever there is a change, but don't push route just yet
watch(() => [
  searchCriteriaRef.value?.searchFields,
  currentPage.value,
  resultsPerPage.value
], () => {
  props.updateRouteParameters(searchCriteriaRef, currentPage, resultsPerPage, routeParameters, router);
}, { deep: true });


// Define the ref for the copyright section
const copyrightSection = ref<HTMLElement | null>(null);

// Method to scroll to the copyright section
const scrollToCopyright = () => {
  copyrightSection.value?.scrollIntoView({
    behavior: 'smooth',
    block: 'end'
  });
};

const resizeEventListener = () => {
  updateMarginTop();
  const header = document.querySelector('.header-container');
  if (header) {
    resultsMargin.value = `calc(${(header as HTMLElement).offsetHeight}px - 19px)`;
  }
};

onBeforeMount(() => {
  // NOTE: do further testing here later (e.g. what should be done here)
  props.updateRouteParameters(searchCriteriaRef, currentPage, resultsPerPage, routeParameters, router, true);
});

onMounted(async () => {
  databaseName.value = await props.getMetaText();
  nextTick(() => {
    resizeEventListener();
  });
  window.addEventListener('resize', resizeEventListener);
  props.updateSearchCriteriaFromRoute(searchCriteriaRef, currentPage, resultsPerPage, route);
  performSearch();
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeEventListener);
});
</script>

<template>
  <template v-if="props.searchPage == 'mpd'">
    <MpdSearchCriteria ref="searchCriteriaRef"/>
  </template>
  <template v-else-if="props.searchPage == 'stpeteBirth' || props.searchPage == 'stpeteDeath'">
    <StPeteSearchCriteria ref="searchCriteriaRef"/>
  </template>
  <template v-else-if="props.searchPage == 'stpeteMarriage'">
    <StPeteMarriageSearchCriteria ref="searchCriteriaRef"/>
  </template>
  <template v-else-if="props.searchPage == 'breyer'">
    <BreyerSearchCriteria ref="searchCriteriaRef"/>
  </template>
  <template v-else-if="props.searchPage == 'ukraine'">
    <UkraineSearchCriteria ref="searchCriteriaRef"/>
  </template>
  <template v-else-if="props.searchPage == 'volhynianBirth'">
    <VolhynianBirthSearchCriteria ref="searchCriteriaRef"/>
  </template>
  <template v-else-if="props.searchPage == 'volhynianMarriage'">
    <VolhynianMarriageSearchCriteria ref="searchCriteriaRef"/>
  </template>
  <template v-else-if="props.searchPage == 'volhynianDeath'">
    <VolhynianDeathSearchCriteria ref="searchCriteriaRef"/>
  </template>
  <template v-else-if="props.searchPage == 'lublinBirth'">
    <LublinBirthSearchCriteria ref="searchCriteriaRef"/>
  </template>
  <template v-else-if="props.searchPage == 'lublinMarriage'">
    <LublinMarriageSearchCriteria ref="searchCriteriaRef"/>
  </template>
  <template v-else-if="props.searchPage == 'lublinDeath'">
    <LublinDeathSearchCriteria ref="searchCriteriaRef"/>
  </template>
  <template v-else-if="props.searchPage == 'membership'">
    <MembershipSearchCriteria ref="searchCriteriaRef"/>
  </template>
  <template v-else-if="props.searchPage == 'odessaStPete'">
    <OdessaStPeteSearchCriteria ref="searchCriteriaRef"/>
  </template>
  <template v-else-if="props.searchPage == 'parishRecordsIdx'">
    <ParishRecordsIdxSearchCriteria ref="searchCriteriaRef"/>
  </template>
  <template v-else-if="props.searchPage == 'lodz'">
    <LodzTrinitySearchCriteria ref="searchCriteriaRef"/>
  </template>
  <template v-else-if="props.searchPage == 'russiaPolandMap'">
    <RussiaPolandSearchCriteria ref="searchCriteriaRef"/>
  </template>

  <div class="search-main-content">
    <div class="header-container" :style="{ top: `calc(${topMenuOffset})` }">

      <div class="title-container">
        <template v-if="searchResults.running">
          <h2 class="showing-text">Gathering Results</h2>
        </template>
        <template v-else-if="numResults == 0 && !fieldsEmpty() && searchResults.hasPerformedSearch">
          <h2 class="showing-text">Showing Results ({{ numResults }} total)</h2>
        </template>
        <template v-else-if="numResults == 0 || !searchResults.hasPerformedSearch">
          <h2 class="showing-text">Start a New Search</h2>
        </template>
        <template v-else-if="numResults > 0">
          <h2 class="showing-text">
            Showing Results
            <span v-if="numResults > 0">
              {{ (currentPage - 1) * resultsPerPage + 1 }} -
              {{ Math.min(currentPage * resultsPerPage, numResults) }} 
              ({{ numResults }} total)
            </span>
          </h2>
        </template>




        <p v-if="!databaseName" class="source-text"><strong>Source: </strong> Loading... </p>
        <p v-else class="source-text"><strong>Source: </strong>{{ databaseName }}</p>
      </div>

      
      <div class="dropdown-container">
        <!-- Dropdown -->
        <div> 
          Show
          <select v-model="resultsPerPage" style="margin-bottom: 0px;">
            <option v-for="val in numResultsOptions" :key="val" :value="val">{{ val }}</option>
          </select>
          per page
        </div>

        <!-- Expand/Collapse Buttons -->
        <div v-if="numResults > 0 && props.searchPage != 'mpd' && props.searchPage != 'lodz' && props.searchPage != 'membership'">
          <button @click="searchResults.moreDetails = Array.from({ length: numResults }).fill(true)" class="expand-collapse-button">
            <font-awesome-icon icon="angle-double-down" class="expand-collapse-icon"/> Expand All
          </button>
          <button @click="searchResults.moreDetails = Array.from({ length: numResults }).fill(false)" class="expand-collapse-button">
            <font-awesome-icon icon="angle-double-up" class="expand-collapse-icon"/> Collapse All
          </button>
        </div>
      </div>


    </div>

    <div class="results-container" :style="{ 'margin-top': resultsMargin }">

      <div v-if="!databaseName">
        <div> Loading... </div>
      </div>
      <div v-else-if="searchResults.running" class="message-container">
        <div class="search-message">Searching...</div>
        <div class="spinner"></div>
      </div>
      <div v-else-if="notification" class="message-container">
        {{ notification }}
      </div>
      <div v-else-if="numResults == 0 && !fieldsEmpty() && searchResults.hasPerformedSearch" class="message-container">
        <div class="search-message">
          No results found. 
        </div>
      </div>
      <div v-else-if="numResults == 0 || !searchResults.hasPerformedSearch" class="message-container">
        <div v-if="!searchCriteriaRef?.isClosed" class="search-message">
          Revise your database search by adjusting <i>keywords</i> and <i>search types</i> in the <strong>Search Criteria</strong> panel on the left, then click the <strong>Search</strong> button.
          <br>
          <br>For more guidance, see the <strong>Need more help?</strong> section on the left panel.
          <br><br>
          <template v-if="props.searchPage == 'membership'">
            Take a moment to read the <a href="#" @click.prevent="scrollToCopyright">Terms of Use</a> and <a href="#" @click.prevent="scrollToCopyright">Copyright Notice</a> below.
          </template>
          <template v-else>
            Take a moment to read the <a href="#" @click.prevent="scrollToCopyright">Copyright Notice</a> below.
          </template>
        </div>
        <div v-else class="search-message">
          Click the <font-awesome-icon :icon="['fas', 'fa-magnifying-glass']" /> icon in the top left of the screen to open the <strong>Search Criteria</strong> panel and start your search.
          <br><br>
          <template v-if="props.searchPage == 'membership'">
            Take a moment to read the <a href="#" @click.prevent="scrollToCopyright">Terms of Use</a> and <a href="#" @click.prevent="scrollToCopyright">Copyright Notice</a> below.
          </template>
          <template v-else>
            Take a moment to read the <a href="#" @click.prevent="scrollToCopyright">Copyright Notice</a> below.
          </template>
        </div>
      </div>

      <template v-if="props.searchPage == 'mpd'">
        <MpdSearchResults :searchResults="searchResults"/>
      </template>
      <template v-else-if="props.searchPage == 'stpeteBirth' || props.searchPage == 'stpeteMarriage' || props.searchPage == 'stpeteDeath'">
        <StPeteSearchResults :searchResults="searchResults"/>
      </template>
      <template v-else-if="props.searchPage == 'breyer'">
        <BreyerSearchResults :searchResults="searchResults"/>
      </template>
      <template v-else-if="props.searchPage == 'ukraine'">
        <UkraineSearchResults :searchResults="searchResults"/>
      </template>
      <template v-else-if="props.searchPage == 'volhynianBirth'">
        <VolhynianBirthSearchResults :searchResults="searchResults"/>
      </template>
      <template v-else-if="props.searchPage == 'volhynianMarriage'">
        <VolhynianMarriageSearchResults :searchResults="searchResults"/>
      </template>
      <template v-else-if="props.searchPage == 'volhynianDeath'">
        <VolhynianDeathSearchResults :searchResults="searchResults"/>
      </template>
      <template v-else-if="props.searchPage == 'lublinBirth'">
        <LublinBirthSearchResults :searchResults="searchResults"/>
      </template>
      <template v-else-if="props.searchPage == 'lublinMarriage'">
        <LublinMarriageSearchResults :searchResults="searchResults"/>
      </template>
      <template v-else-if="props.searchPage == 'lublinDeath'">
        <LublinDeathSearchResults :searchResults="searchResults"/>
      </template>
      <template v-else-if="props.searchPage == 'membership'">
        <MembershipSearchResults :searchResults="searchResults"/>
      </template>
      <template v-else-if="props.searchPage == 'odessaStPete'">
        <OdessaStPeteSearchResults :searchResults="searchResults"/>
      </template>
      <template v-else-if="props.searchPage == 'parishRecordsIdx'">
        <ParishRecordsIdxSearchResults :searchResults="searchResults"/>
      </template>
      <template v-else-if="props.searchPage == 'lodz'">
        <LodzTrinitySearchResults :searchResults="searchResults"/>
      </template>
      <template v-else-if="props.searchPage == 'russiaPolandMap'">
        <RussiaPolandSearchResults :searchResults="searchResults"/>
      </template>
    </div>
    
    <div v-if="numResults > 0" class="pagination-container">
      <div v-if="currentPage > 1" :class="{ 'arrow-button': true, 'disable-hover': currentPage === 1 }" @click="goToPage(currentPage - 1)" :disabled="currentPage === 1">
        <font-awesome-icon :icon="['fas', 'angle-left']" />
      </div>
      <span>
        Page {{ currentPage }} of {{ totalPages }}
      </span>
      <div v-if="totalPages > 1 && currentPage !== totalPages" class="arrow-button" @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages">
        <font-awesome-icon :icon="['fas', 'angle-right']" />
      </div>
      <div v-else class="arrow-button disable-hover"></div>
    </div>
  </div>

  <div class="copyright-main-content" ref="copyrightSection">
    <div class="terms" v-if="props.searchPage == 'membership'">
      <h3 class="centered-content">Terms of Use</h3>
      <p>
        SGGEE relies on the integrity of our members to respect others’ genealogical data and to refrain from sharing that data or anyone’s personal contact information in any public forum or uploading it to any genealogical database unless prior permission has been given by the member.
      </p>
      <p>
        The purpose of this member search is to allow you to contact a present or former member about shared genealogy data. You are reminded that misuse of the member contact information or the genealogy information associated with a current or former member may result in the revocation of your membership. In egregious cases, legal remedy may be sought. Reports of misuse may be reported to <a href="mailto:directors-sggee@googlegroups.com">directors-sggee@googlegroups.com</a>.
      </p>
    </div>
    <br>
    <div class="copyright">
      <h3 class="centered-content">Copyright Notice</h3>
      <p>
        © 2024 SGGEE. All rights reserved. The information and content provided in these search results are protected by copyright and other intellectual property laws. Reproduction, distribution, or modification of any content without prior written permission from SGGEE is strictly prohibited. Unauthorized use may result in legal action.
      </p>
    </div>
  </div>

</template>

<style scoped lang="scss">
@import "../scss/main";
</style>
