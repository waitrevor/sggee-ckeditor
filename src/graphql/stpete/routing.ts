import { Ref } from 'vue';
import { RouteLocationNormalizedLoaded, Router } from 'vue-router';

const updateRouteParametersStPete = (searchCriteriaRef: Ref, currentPage: Ref, resultsPerPage: Ref, routeParameters: Ref, router: Router, pushRoute: boolean = false) => {
  if (searchCriteriaRef?.value && searchCriteriaRef.value.searchFields) {
    const { father, mother_givenname, mother_surname, first_name, last_name, place } = searchCriteriaRef.value.searchFields;
    const query = {} as {
      father?: string;
      mother_givenname?: string;
      mother_surname?: string;
      first_name?: string;
      last_name?: string;
      place?: string;
      pageNum: number;
      perPage: number;
    }; 
    if (father) {
      query.father = father;
    }
    if (mother_givenname) {
      query.mother_givenname = mother_givenname;
    }
    if (mother_surname) {
      query.mother_surname = mother_surname;
    }
    if (first_name) {
      query.first_name = first_name;
    }
    if (last_name) {
      query.last_name = last_name;
    }
    if (place) {
      query.place = place;
    }
    query.pageNum = currentPage.value;
    query.perPage = resultsPerPage.value;
    routeParameters.value = query;
    if (pushRoute) {
      router.push({ query });
    }
  }
};

const updateRouteParametersStPeteMarriage = (searchCriteriaRef: Ref, currentPage: Ref, resultsPerPage: Ref, routeParameters: Ref, router: Router, pushRoute: boolean = false) => {
  if (searchCriteriaRef?.value && searchCriteriaRef.value.searchFields) {
    const { groom_last, groom_first, bride_last, bride_first, place } = searchCriteriaRef.value.searchFields;
    const query = {} as {
      groom_last?: string;
      groom_first?: string;
      bride_last?: string;
      bride_first?: string;
      place?: string;
      pageNum: number;
      perPage: number;
    }; 
    if (groom_last) {
      query.groom_last = groom_last;
    }
    if (groom_first) {
      query.groom_first = groom_first;
    }
    if (bride_last) {
      query.bride_last = bride_last;
    }
    if (bride_first) {
      query.bride_first = bride_first;
    }
    if (place) {
      query.place = place;
    }
    query.pageNum = currentPage.value;
    query.perPage = resultsPerPage.value;
    routeParameters.value = query;
    if (pushRoute) {
      router.push({ query });
    }
  }
};

const updateSearchCriteriaFromRouteStPete = (searchCriteriaRef: Ref, currentPage: Ref<number>, resultsPerPage: Ref<number>, route: RouteLocationNormalizedLoaded) => {
  if (searchCriteriaRef?.value && searchCriteriaRef.value.searchFields) {
    const searchFields = searchCriteriaRef.value.searchFields;
    searchFields.father = route.query.father as string || '';
    searchFields.mother_givenname = route.query.mother_givenname as string || '';
    searchFields.mother_surname = route.query.mother_surname as string || '';
    searchFields.first_name = route.query.first_name as string || '';
    searchFields.last_name = route.query.last_name as string || '';
    searchFields.place = route.query.place as string || '';

    const pageNum = parseInt(route.query.pageNum as string);
    if (!isNaN(pageNum)) {
      currentPage.value = pageNum;
    }
    
    const perPage = parseInt(route.query.perPage as string);
    if (!isNaN(perPage)) {
      resultsPerPage.value = perPage;
    }
  }
};

const updateSearchCriteriaFromRouteStPeteMarriage = (searchCriteriaRef: Ref, currentPage: Ref<number>, resultsPerPage: Ref<number>, route: RouteLocationNormalizedLoaded) => {
  if (searchCriteriaRef?.value && searchCriteriaRef.value.searchFields) {
    const searchFields = searchCriteriaRef.value.searchFields;
    searchFields.groom_last = route.query.groom_last as string || '';
    searchFields.groom_first = route.query.groom_first as string || '';
    searchFields.bride_last = route.query.bride_last as string || '';
    searchFields.bride_first = route.query.bride_first as string || '';
    searchFields.place = route.query.place as string || '';

    const pageNum = parseInt(route.query.pageNum as string);
    if (!isNaN(pageNum)) {
      currentPage.value = pageNum;
    }
    
    const perPage = parseInt(route.query.perPage as string);
    if (!isNaN(perPage)) {
      resultsPerPage.value = perPage;
    }
  }
};

export {
  updateRouteParametersStPete,
  updateRouteParametersStPeteMarriage,
  updateSearchCriteriaFromRouteStPete,
  updateSearchCriteriaFromRouteStPeteMarriage
};
