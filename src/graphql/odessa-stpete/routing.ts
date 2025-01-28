import { Ref } from 'vue';
import { RouteLocationNormalizedLoaded, Router } from 'vue-router';

export const updateRouteParametersOdessaStPete = (searchCriteriaRef: Ref, currentPage: Ref, resultsPerPage: Ref, routeParameters: Ref, router: Router, pushRoute: boolean = false) => {
  if (searchCriteriaRef?.value && searchCriteriaRef.value.searchFields) {
    const { film_or_item, register, pagenum, last_name, first_name } = searchCriteriaRef.value.searchFields;
    const query = {} as {
      film_or_item?: string;
      register?: string;
      pagenum?: string;
      last_name?: string;
      first_name?: string;
      pageNum: number;
      perPage: number;
    }; 
    if (film_or_item) {
      query.film_or_item = film_or_item;
    }
    if (register) {
      query.register = register;
    }
    if (pagenum) {
      query.pagenum = pagenum;
    }
    if (last_name) {
      query.last_name = last_name;
    }
    if (first_name) {
      query.first_name = first_name
    }
    query.pageNum = currentPage.value;
    query.perPage = resultsPerPage.value;
    routeParameters.value = query;
    if (pushRoute) {
      router.push({ query });
    }
  }
};

export const updateSearchCriteriaFromRouteOdessaStPete = (searchCriteriaRef: Ref, currentPage: Ref<number>, resultsPerPage: Ref<number>, route: RouteLocationNormalizedLoaded) => {
  if (searchCriteriaRef?.value && searchCriteriaRef.value.searchFields) {
    const searchFields = searchCriteriaRef.value.searchFields;
    searchFields.film_or_item = route.query.film_or_item as string || '';
		searchFields.register = route.query.register as string || '';
		searchFields.pagenum = route.query.pagenum as string || '';
		searchFields.last_name = route.query.last_name as string || '';
    searchFields.first_name = route.query.first_name as string || '';

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
