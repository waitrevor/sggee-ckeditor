import { Ref } from 'vue';
import { RouteLocationNormalizedLoaded, Router } from 'vue-router';

const updateRouteParametersMpd = (searchCriteriaRef: Ref, currentPage: Ref, resultsPerPage: Ref, routeParameters: Ref, router: Router, pushRoute: boolean = false) => {
  if (searchCriteriaRef?.value && searchCriteriaRef.value.searchFields) {
    const { surname, givenname, birthpl, deathpl, individualId } = searchCriteriaRef.value.searchFields;
    const query = {} as {
      surname?: string;
      givenname?: string;
      birthpl?: string;
      deathpl?: string;
      id?: string;
      pageNum: number;
      perPage: number;
    }; 
    if (surname) {
      query.surname = surname;
    }
    if (givenname) {
      query.givenname = givenname;
    }
    if (birthpl) {
      query.birthpl = birthpl;
    }
    if (deathpl) {
      query.deathpl = deathpl;
    }
    if (individualId) {
      query.id = individualId;
    }
    query.pageNum = currentPage.value;
    query.perPage = resultsPerPage.value;
    routeParameters.value = query;
    if (pushRoute) {
      router.push({ query }); // Use router.push or router.replace based on your requirements
      /* Choose between router.push and router.replace based on your application's navigation requirements.
      If you want to maintain a history of visited pages and allow users to navigate back, use router.push. 
      If you want to replace the current page without adding a new entry to the history stack, use router.replace.
      */
    }
  }
};

// Update search criteria based on new route parameters
const updateSearchCriteriaFromRouteMpd = (searchCriteriaRef: Ref, currentPage: Ref<number>, resultsPerPage: Ref<number>, route: RouteLocationNormalizedLoaded) => {
  if (searchCriteriaRef?.value && searchCriteriaRef.value.searchFields) {
    const searchFields = searchCriteriaRef.value.searchFields;
    searchFields.surname = route.query.surname as string || '';
    searchFields.givenname = route.query.givenname as string || '';
    searchFields.birthpl = route.query.birthpl as string || '';
    searchFields.deathpl = route.query.deathpl as string || '';
    searchFields.individualId = route.query.id as string || '';
    
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
  updateRouteParametersMpd,
  updateSearchCriteriaFromRouteMpd
};