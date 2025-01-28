import { Ref } from 'vue';
import { RouteLocationNormalizedLoaded, Router } from 'vue-router';

const updateRouteParametersUkraine = (searchCriteriaRef: Ref, currentPage: Ref, resultsPerPage: Ref, routeParameters: Ref, router: Router, pushRoute: boolean = false) => {
  if (searchCriteriaRef?.value && searchCriteriaRef.value.searchFields) {
    const { place, mapcoord } = searchCriteriaRef.value.searchFields;
    const query = {} as {
      place?: string;
      mapcoord?: string;
      pageNum: number;
      perPage: number;
    }; 
    if (place) {
      query.place = place;
    }
    if (mapcoord) {
      query.mapcoord = mapcoord;
    }
    query.pageNum = currentPage.value;
    query.perPage = resultsPerPage.value;
    routeParameters.value = query;
    if (pushRoute) {
      router.push({ query });
    }
  }
};

// Update search criteria based on new route parameters
const updateSearchCriteriaFromRouteUkraine = (searchCriteriaRef: Ref, currentPage: Ref<number>, resultsPerPage: Ref<number>, route: RouteLocationNormalizedLoaded) => {
  if (searchCriteriaRef?.value && searchCriteriaRef.value.searchFields) {
    const searchFields = searchCriteriaRef.value.searchFields;
    searchFields.place = route.query.place as string || '';
    searchFields.mapcoord = route.query.mapcoord as string || '';
    
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
  updateRouteParametersUkraine,
  updateSearchCriteriaFromRouteUkraine
};