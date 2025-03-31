import { Ref } from 'vue';
import { createRouter, createWebHashHistory, Router, RouteLocationNormalizedLoaded} from 'vue-router';

import Home from '../views/Home.vue';
import PathHandler from '../views/PathHandler.vue';
import Login from '../views/Login.vue';
import Search from '../views/Search.vue';
import { useUserStore } from '../utilities/user';

import { fetchMpdMetaText, fetchMpdIndividualsByName } from '../graphql/mpd/api';
import { updateRouteParametersMpd, updateSearchCriteriaFromRouteMpd } from '../graphql/mpd/routing';

import { fetchStPeteBirthMetaText, fetchStPeteMarriageMetaText, fetchStPeteDeathMetaText, fetchStPeteBirths, fetchStPeteMarriages, fetchStPeteDeaths } from '../graphql/stpete/api';
import { updateRouteParametersStPete, updateRouteParametersStPeteMarriage, updateSearchCriteriaFromRouteStPete, updateSearchCriteriaFromRouteStPeteMarriage } from '../graphql/stpete/routing';

import { fetchBreyerMapByName, fetchBreyerMetaText } from '../graphql/breyer/api';
import { updateRouteParametersBreyer, updateSearchCriteriaFromRouteBreyer } from '../graphql/breyer/routing';

import { fetchUkraineMetaText, fetchUkraineMapByName } from '../graphql/ukraine/api';
import { updateRouteParametersUkraine, updateSearchCriteriaFromRouteUkraine } from '../graphql/ukraine/routing';

import { fetchVolhynianBirthMetaText, fetchVolhynianMarriageMetaText, fetchVolhynianDeathMetaText, fetchVolhynianBirths, fetchVolhynianMarriages, fetchVolhynianDeaths } from '../graphql/volhynian-index/api';
import { updateRouteParametersVolhynianBirth, updateSearchCriteriaFromRouteVolhynianBirth, updateRouteParametersVolhynianMarriage, updateSearchCriteriaFromRouteVolhynianMarriage, updateRouteParametersVolhynianDeath, updateSearchCriteriaFromRouteVolhynianDeath } from '../graphql/volhynian-index/routing';

import { updateRouteParametersLublinBirth, updateRouteParametersLublinDeath, updateRouteParametersLublinMarriage, updateSearchCriteriaFromRouteLublinBirth, updateSearchCriteriaFromRouteLublinDeath, updateSearchCriteriaFromRouteLublinMarriage } from '../graphql/lublin/routing';
import { fetchLublinBirthMetaText, fetchLublinBirths, fetchLublinDeathMetaText, fetchLublinDeaths, fetchLublinMarriageMetaText, fetchLublinMarriages } from '../graphql/lublin/api';

import { fetchMembershipMetaText, fetchMembership } from '../graphql/membership/api';
import { updateRouteParametersMembership, updateSearchCriteriaFromRouteMembership } from '../graphql/membership/routing';

import { fetchOdessaStPeteByName, fetchOdessaStPeteMetaText } from '../graphql/odessa-stpete/api';
import { updateRouteParametersOdessaStPete, updateSearchCriteriaFromRouteOdessaStPete } from '../graphql/odessa-stpete/routing';

import { fetchParishRecordsIdxByName, fetchParishRecordsIdxMetaText } from '../graphql/parish-records-idx/api';
import { updateRouteParametersParishRecordsIdx, updateSearchCriteriaFromRouteParishRecordsIdx } from '../graphql/parish-records-idx/routing';

import { fetchRussiaPolandMetaText, fetchRussiaPolandMapByName } from '../graphql/web-map-index/api';
import { updateRouteParametersRussiaPoland, updateSearchCriteriaFromRouteRussiaPoland } from '../graphql/web-map-index/routing';

import { fetchLodzTrinityMetaText, fetchLodzTrinityByName } from '../graphql/lodz-trinity/api';
import { updateRouteParametersLodzTrinity, updateSearchCriteriaFromRouteLodzTrinity } from '../graphql/lodz-trinity/routing';

// @ts-ignore
import FileManager from '../components/FileManager.vue';

const createSearchRoute = (
  path: string,
  name: string,
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
) => ({
  path,
  name,
  component: Search,
  props: {
    searchPage,
    getMetaText,
    updateRouteParameters,
    updateSearchCriteriaFromRoute,
    fetchFunction,
    resultsKey
  }
});


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    props: true
  },
  {
    path: "/filemanager",
    name: "FileManager",
    component: FileManager,
    props: true,
  },
  {
    path: '/:pageName(.*)',
    name: 'Root',
    component: PathHandler,
    props: true
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    props: true
  }, 
  createSearchRoute('/members/genealogy/search', 'MpdSearch', 'mpd', fetchMpdMetaText, updateRouteParametersMpd, updateSearchCriteriaFromRouteMpd, fetchMpdIndividualsByName, 'individual'),
  createSearchRoute('/stpete/birth/search', 'StPeteBirthSearch', 'stpeteBirth', fetchStPeteBirthMetaText, updateRouteParametersStPete, updateSearchCriteriaFromRouteStPete, fetchStPeteBirths, 'stpetersburgbirths'),
  createSearchRoute('/stpete/marriage/search', 'StPeteMarriageSearch', 'stpeteMarriage', fetchStPeteMarriageMetaText, updateRouteParametersStPeteMarriage, updateSearchCriteriaFromRouteStPeteMarriage, fetchStPeteMarriages, 'stpetersburgmarriages'),
  createSearchRoute('/stpete/death/search', 'StPeteDeathSearch', 'stpeteDeath', fetchStPeteDeathMetaText, updateRouteParametersStPete, updateSearchCriteriaFromRouteStPete, fetchStPeteDeaths, 'stpetersburgdeaths'),
  createSearchRoute('/breyer/map/search', 'BreyerMapSearch', 'breyer', fetchBreyerMetaText, updateRouteParametersBreyer, updateSearchCriteriaFromRouteBreyer, fetchBreyerMapByName, 'breyermap'),
  createSearchRoute('/members/ukraine/map/search', 'UkraineMapSearch', 'ukraine', fetchUkraineMetaText, updateRouteParametersUkraine, updateSearchCriteriaFromRouteUkraine, fetchUkraineMapByName, 'ukraine'),
  createSearchRoute('/members/volhynian/birth/search', 'VolhynianBirthSearch', 'volhynianBirth', fetchVolhynianBirthMetaText, updateRouteParametersVolhynianBirth, updateSearchCriteriaFromRouteVolhynianBirth, fetchVolhynianBirths, 'volhynianbirths'),
  createSearchRoute('/members/volhynian/marriage/search', 'VolhynianMarriageSearch', 'volhynianMarriage', fetchVolhynianMarriageMetaText, updateRouteParametersVolhynianMarriage, updateSearchCriteriaFromRouteVolhynianMarriage, fetchVolhynianMarriages, 'volhynianmarriages'),
  createSearchRoute('/members/volhynian/death/search', 'VolhynianDeathSearch', 'volhynianDeath', fetchVolhynianDeathMetaText, updateRouteParametersVolhynianDeath, updateSearchCriteriaFromRouteVolhynianDeath, fetchVolhynianDeaths, 'volhyniandeaths'),
  createSearchRoute('/members/lublin/birth/search', 'LublinBirthSearch', 'lublinBirth', fetchLublinBirthMetaText, updateRouteParametersLublinBirth, updateSearchCriteriaFromRouteLublinBirth, fetchLublinBirths, 'lublinbirths'),
  createSearchRoute('/members/lublin/marriage/search', 'LublinMarriageSearch', 'lublinMarriage', fetchLublinMarriageMetaText, updateRouteParametersLublinMarriage, updateSearchCriteriaFromRouteLublinMarriage, fetchLublinMarriages, 'lublinmarriages'),
  createSearchRoute('/members/lublin/death/search', 'LublinDeathSearch', 'lublinDeath', fetchLublinDeathMetaText, updateRouteParametersLublinDeath, updateSearchCriteriaFromRouteLublinDeath, fetchLublinDeaths, 'lublindeaths'),
  createSearchRoute('/members/membership/search', 'MembershipSearch', 'membership', fetchMembershipMetaText, updateRouteParametersMembership, updateSearchCriteriaFromRouteMembership, fetchMembership, 'membership'),
  createSearchRoute('/members/odessa-stpete/search', 'OdessaStpeteSearch', 'odessaStPete', fetchOdessaStPeteMetaText, updateRouteParametersOdessaStPete, updateSearchCriteriaFromRouteOdessaStPete, fetchOdessaStPeteByName, 'odessastpete'),
  createSearchRoute('/members/parish-records-idx/search', 'ParishRecordsIdxSearch', 'parishRecordsIdx', fetchParishRecordsIdxMetaText, updateRouteParametersParishRecordsIdx, updateSearchCriteriaFromRouteParishRecordsIdx, fetchParishRecordsIdxByName, 'parishrecordsidx'),
  createSearchRoute('/members/russia-poland/map/search', 'RussiaPolandMapSearch', 'russiaPolandMap', fetchRussiaPolandMetaText, updateRouteParametersRussiaPoland, updateSearchCriteriaFromRouteRussiaPoland, fetchRussiaPolandMapByName, 'russiapoland'),
  createSearchRoute('/members/lodz/search', 'LodzTrinitySearch', 'lodz', fetchLodzTrinityMetaText, updateRouteParametersLodzTrinity, updateSearchCriteriaFromRouteLodzTrinity, fetchLodzTrinityByName, 'lodztrinityindividual')
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

const protectedRoutes = [
  'MpdSearch',
  //'StPeteBirthSearch',
  //'StPeteMarriageSearch',
  //'StPeteDeathSearch',
  //'BreyerMapSearch',
  'UkraineMapSearch',
  'VolhynianBirthSearch',
  'VolhynianMarriageSearch',
  'VolhynianDeathSearch',
  'LublinBirthSearch',
  'LublinMarriageSearch',
  'LublinDeathSearch',
  'MembershipSearch',
  'OdessaStpeteSearch',
  'ParishRecordsIdxSearch',
  'RussiaPolandMapSearch',
  'LodzTrinitySearch',
  'FileManager'
];

// Navigation guard to check for authentication
router.beforeEach((to, from, next) => {
  const userStore = useUserStore();

  // Handle route name check and encoding
  const routeName = typeof to.name === 'string' ? to.name : '';

  if ((protectedRoutes.includes(routeName) || to.path.startsWith('/members')) && !userStore.username) {
    // Create the redirect state object
    const redirectState = {
      path: to.fullPath,
      queryParams: to.fullPath.includes('?') ? to.fullPath.split('?')[1] : '' // Extract query params
    };

    // Encode the redirect state
    const encodedRedirect = encodeURIComponent(JSON.stringify(redirectState));

    // Redirect to login page with encoded redirect state
    next({ name: 'Login', query: { redirect: encodedRedirect } });
  } else {
    next(); // Proceed to the route
  }
});

export {
  router
};
