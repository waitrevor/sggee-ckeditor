import { Ref } from 'vue';
import { RouteLocationNormalizedLoaded, Router } from 'vue-router';

const updateRouteParametersVolhynianBirth = (searchCriteriaRef: Ref, currentPage: Ref, resultsPerPage: Ref, routeParameters: Ref, router: Router, pushRoute: boolean = false) => {
  if (searchCriteriaRef?.value && searchCriteriaRef.value.searchFields) {
    const { surname, givenname, birth_place, father, mother_givenname, mother_surname, birth_year } = searchCriteriaRef.value.searchFields;
    const query = {} as {
      surname?: string;
      givenname?: string;
      birth_place?: string;
      father?: string;
      mother_givenname?: string;
      mother_surname?: string;
      birth_year?: string;
      pageNum: number;
      perPage: number;
    }; 
    if (surname) {
      query.surname = surname;
    }
    if (givenname) {
      query.givenname = givenname;
    }
    if (birth_place) {
      query.birth_place = birth_place;
    }
    if (father) {
      query.father = father;
    }
    if (mother_givenname) {
      query.mother_givenname = mother_givenname;
    }
    if (mother_surname) {
      query.mother_surname = mother_surname;
    }
    if (birth_year) {
      query.birth_year = birth_year;
    }
    query.pageNum = currentPage.value;
    query.perPage = resultsPerPage.value;
    routeParameters.value = query;
    if (pushRoute) {
      router.push({ query });
    }
  }
};

const updateSearchCriteriaFromRouteVolhynianBirth = (searchCriteriaRef: Ref, currentPage: Ref<number>, resultsPerPage: Ref<number>, route: RouteLocationNormalizedLoaded) => {
  if (searchCriteriaRef?.value && searchCriteriaRef.value.searchFields) {
    const searchFields = searchCriteriaRef.value.searchFields;
    searchFields.surname = route.query.surname as string || '';
    searchFields.givenname = route.query.givenname as string || '';
    searchFields.birth_place = route.query.birth_place as string || '';
    searchFields.father = route.query.father as string || '';
    searchFields.mother_givenname = route.query.mother_givenname as string || '';
    searchFields.mother_surname = route.query.mother_surname as string || '';
    searchFields.birth_year = route.query.birth_year as string || '';

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

const updateRouteParametersVolhynianDeath = (searchCriteriaRef: Ref, currentPage: Ref, resultsPerPage: Ref, routeParameters: Ref, router: Router, pushRoute: boolean = false) => {
  if (searchCriteriaRef?.value && searchCriteriaRef.value.searchFields) {
    const { surname, givenname, place_buried, father, mother_givenname, mother_surname, spouse, year } = searchCriteriaRef.value.searchFields;
    const query = {} as {
      surname?: string;
      givenname?: string;
      place_buried?: string;
      father?: string;
      mother_givenname?: string;
      mother_surname?: string;
      spouse?: string;
      year?: string;
      pageNum: number;
      perPage: number;
    }; 
    if (surname) {
      query.surname = surname;
    }
    if (givenname) {
      query.givenname = givenname;
    }
    if (place_buried) {
      query.place_buried = place_buried;
    }
    if (father) {
      query.father = father;
    }
    if (mother_givenname) {
      query.mother_givenname = mother_givenname;
    }
    if (mother_surname) {
      query.mother_surname = mother_surname;
    }
    if (spouse) {
      query.spouse = spouse;
    }
    if (year) {
      query.year = year;
    }
    query.pageNum = currentPage.value;
    query.perPage = resultsPerPage.value;
    routeParameters.value = query;
    if (pushRoute) {
      router.push({ query });
    }
  }
};

const updateSearchCriteriaFromRouteVolhynianDeath = (searchCriteriaRef: Ref, currentPage: Ref<number>, resultsPerPage: Ref<number>, route: RouteLocationNormalizedLoaded) => {
  if (searchCriteriaRef?.value && searchCriteriaRef.value.searchFields) {
    const searchFields = searchCriteriaRef.value.searchFields;
    searchFields.surname = route.query.surname as string || '';
    searchFields.givenname = route.query.givenname as string || '';
    searchFields.place_buried = route.query.place_buried as string || '';
    searchFields.father = route.query.father as string || '';
    searchFields.mother_givenname = route.query.mother_givenname as string || '';
    searchFields.mother_surname = route.query.mother_surname as string || '';
    searchFields.spouse = route.query.spouse as string || '';
    searchFields.year = route.query.year as string || '';

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

const updateRouteParametersVolhynianMarriage = (searchCriteriaRef: Ref, currentPage: Ref, resultsPerPage: Ref, routeParameters: Ref, router: Router, pushRoute: boolean = false) => {
  if (searchCriteriaRef?.value && searchCriteriaRef.value.searchFields) {
    const { groom_surname, groom_givenname, bride_surname, bride_givenname, place, year} = searchCriteriaRef.value.searchFields;
    const query = {} as {
      groom_surname?: string;
      groom_givenname?: string;
      bride_surname?: string;
      bride_givenname?: string;
      place?: string;
      year?: string;
      pageNum: number;
      perPage: number;
    }; 
    if (groom_surname) {
      query.groom_surname = groom_surname;
    }
    if (groom_givenname) {
      query.groom_givenname = groom_givenname;
    }
    if (bride_surname) {
      query.bride_surname = bride_surname;
    }
    if (bride_givenname) {
      query.bride_givenname = bride_givenname;
    }
    if (place) {
      query.place = place;
    }
    if (year) {
      query.year = year;
    }
    query.pageNum = currentPage.value;
    query.perPage = resultsPerPage.value;
    routeParameters.value = query;
    if (pushRoute) {
      router.push({ query });
    }
  }
};

const updateSearchCriteriaFromRouteVolhynianMarriage = (searchCriteriaRef: Ref, currentPage: Ref<number>, resultsPerPage: Ref<number>, route: RouteLocationNormalizedLoaded) => {
  if (searchCriteriaRef?.value && searchCriteriaRef.value.searchFields) {
    const searchFields = searchCriteriaRef.value.searchFields;
    searchFields.groom_surname = route.query.groom_surname as string || '';
    searchFields.groom_givenname = route.query.groom_givenname as string || '';
    searchFields.bride_surname = route.query.bride_surname as string || '';
    searchFields.bride_givenname = route.query.bride_givenname as string || '';
    searchFields.place = route.query.place as string || '';
    searchFields.year = route.query.year as string || '';
    
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
  updateRouteParametersVolhynianBirth,
  updateSearchCriteriaFromRouteVolhynianBirth,
  updateRouteParametersVolhynianMarriage,
  updateSearchCriteriaFromRouteVolhynianMarriage,
  updateRouteParametersVolhynianDeath,
  updateSearchCriteriaFromRouteVolhynianDeath
};
