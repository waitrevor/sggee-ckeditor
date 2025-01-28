import { Ref } from 'vue';
import { RouteLocationNormalizedLoaded, Router } from 'vue-router';

export const updateRouteParametersParishRecordsIdx = (searchCriteriaRef: Ref, currentPage: Ref, resultsPerPage: Ref, routeParameters: Ref, router: Router, pushRoute: boolean = false) => {
  if (searchCriteriaRef?.value && searchCriteriaRef.value.searchFields) {
    const { surname, name, /*recordtype,*/ eventyear, spouse, parish, extractor } = searchCriteriaRef.value.searchFields;
    const query = {} as {
      surname?: string;
      name?: string;
      //recordtype?: string;
      eventyear?: string;
      spouse?: string;
      parish?: string;
      extractor?: string;
      pageNum: number;
      perPage: number;
    }; 
    if (surname) {
      query.surname = surname;
    }
    if (name) {
      query.name = name;
    }
    //if (recordtype) {
    //  query.recordtype = recordtype;
    //}
    if (eventyear) {
      query.eventyear = eventyear;
    }
    if (spouse) {
      query.spouse = spouse
    }
    if (parish) {
      query.parish = parish
    }
    if (extractor) {
      query.extractor = extractor
    }
    query.pageNum = currentPage.value;
    query.perPage = resultsPerPage.value;
    routeParameters.value = query;
    if (pushRoute) {
      router.push({ query });
    }
  }
};

export const updateSearchCriteriaFromRouteParishRecordsIdx = (searchCriteriaRef: Ref, currentPage: Ref<number>, resultsPerPage: Ref<number>, route: RouteLocationNormalizedLoaded) => {
  if (searchCriteriaRef?.value && searchCriteriaRef.value.searchFields) {
    const searchFields = searchCriteriaRef.value.searchFields;
    searchFields.surname = route.query.surname as string || '';
    searchFields.name = route.query.name as string || '';
    searchFields.recordtype = route.query.recordtype as string || '';
    //searchFields.eventyear = route.query.eventyear as string || '';
    searchFields.spouse = route.query.spouse as string || '';
    searchFields.parish = route.query.parish as string || '';
    searchFields.extractor = route.query.extractor as string || '';

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
