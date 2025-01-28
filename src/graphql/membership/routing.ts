import { Ref } from 'vue';
import { RouteLocationNormalizedLoaded, Router } from 'vue-router';

export const updateRouteParametersMembership = (searchCriteriaRef: Ref, currentPage: Ref, resultsPerPage: Ref, routeParameters: Ref, router: Router, pushRoute: boolean = false) => {
  if (searchCriteriaRef?.value && searchCriteriaRef.value.searchFields) {
    const { memnum, surname, givenname, email } = searchCriteriaRef.value.searchFields;
    const query = {} as {
      memnum?: string;
      surname?: string;
      givenname?: string;
      email?: string;
      pageNum: number;
      perPage: number;
    }; 
    if (memnum) {
      query.memnum = memnum;
    }
    if (surname) {
      query.surname = surname;
    }
    if (givenname) {
      query.givenname = givenname;
    }
    if (email) {
      query.email = email
    }
    query.pageNum = currentPage.value;
    query.perPage = resultsPerPage.value;
    routeParameters.value = query;
    if (pushRoute) {
      router.push({ query });
    }
  }
};

export const updateSearchCriteriaFromRouteMembership = (searchCriteriaRef: Ref, currentPage: Ref<number>, resultsPerPage: Ref<number>, route: RouteLocationNormalizedLoaded) => {
  if (searchCriteriaRef?.value && searchCriteriaRef.value.searchFields) {
    const searchFields = searchCriteriaRef.value.searchFields;
    searchFields.memnum = route.query.memnum as string || '';
		searchFields.surname = route.query.surname as string || '';
		searchFields.givenname = route.query.givenname as string || '';
    searchFields.email = route.query.email as string || '';

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
