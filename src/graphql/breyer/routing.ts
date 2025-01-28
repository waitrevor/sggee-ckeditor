import { Ref } from 'vue';
import { RouteLocationNormalizedLoaded, Router } from 'vue-router';

const updateRouteParametersBreyer = (searchCriteriaRef: Ref, currentPage: Ref, resultsPerPage: Ref, routeParameters: Ref, router: Router, pushRoute: boolean = false) => {
  if (searchCriteriaRef?.value && searchCriteriaRef.value.searchFields) {
    const { citytownvillagefeature, province, mapgrid } = searchCriteriaRef.value.searchFields;
    const query = {} as {
      citytownvillagefeature?: string;
      province?: string;
      mapgrid?: string;
      pageNum: number;
      perPage: number;
    }; 
    if (citytownvillagefeature) {
      query.citytownvillagefeature = citytownvillagefeature;
    }
    if (province) {
      query.province = province;
    }
    if (mapgrid) {
      query.mapgrid = mapgrid;
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
const updateSearchCriteriaFromRouteBreyer = (searchCriteriaRef: Ref, currentPage: Ref<number>, resultsPerPage: Ref<number>, route: RouteLocationNormalizedLoaded) => {
  if (searchCriteriaRef?.value && searchCriteriaRef.value.searchFields) {
    const searchFields = searchCriteriaRef.value.searchFields;
    searchFields.citytownvillagefeature = route.query.citytownvillagefeature as string || '';
    searchFields.province = route.query.province as string || '';
    searchFields.mapgrid = route.query.mapgrid as string || '';
    
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
  updateRouteParametersBreyer,
  updateSearchCriteriaFromRouteBreyer
};