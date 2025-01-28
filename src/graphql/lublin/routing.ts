import { Ref } from 'vue';
import { RouteLocationNormalizedLoaded, Router } from 'vue-router';

const updateRouteParametersLublinBirth = (searchCriteriaRef: Ref, currentPage: Ref, resultsPerPage: Ref, routeParameters: Ref, router: Router, pushRoute: boolean = false) => {
  if (searchCriteriaRef?.value && searchCriteriaRef.value.searchFields) {
    const { surname, given_name, event_year, father_or_spouse, mother_or_spouse, village } = searchCriteriaRef.value.searchFields;
    const query = {} as {
      surname?: string;
      given_name?: string;
      event_year?: string;
      father_or_spouse?: string;
      mother_or_spouse?: string;
      village?: string;
      pageNum: number;
      perPage: number;
    }; 
    if (surname) {
      query.surname = surname;
    }
    if (given_name) {
      query.given_name = given_name;
    }
    if (event_year) {
      query.event_year = event_year;
    }
    if (father_or_spouse) {
      query.father_or_spouse = father_or_spouse;
    }
    if (mother_or_spouse) {
      query.mother_or_spouse = mother_or_spouse;
    }
    if (village) {
      query.village = village;
    }
    query.pageNum = currentPage.value;
    query.perPage = resultsPerPage.value;
    routeParameters.value = query;
    if (pushRoute) {
      router.push({ query });
    }
  }
};

const updateSearchCriteriaFromRouteLublinBirth = (searchCriteriaRef: Ref, currentPage: Ref<number>, resultsPerPage: Ref<number>, route: RouteLocationNormalizedLoaded) => {
  if (searchCriteriaRef?.value && searchCriteriaRef.value.searchFields) {
    const searchFields = searchCriteriaRef.value.searchFields;
    
    searchFields.surname = route.query.surname as string || '';
    searchFields.given_name = route.query.given_name as string || '';
    searchFields.event_year = route.query.event_year as string || '';
    searchFields.father_or_spouse = route.query.father_or_spouse as string || '';
    searchFields.mother_or_spouse = route.query.mother_or_spouse as string || '';
    searchFields.village = route.query.village as string || '';
    
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



const updateRouteParametersLublinMarriage = (searchCriteriaRef: Ref, currentPage: Ref, resultsPerPage: Ref, routeParameters: Ref, router: Router, pushRoute: boolean = false) => {
  if (searchCriteriaRef?.value && searchCriteriaRef.value.searchFields) {
    const { surname, given_name, event_year, village, mother_or_spouse, brides_parents, spouses, grooms_parents } = searchCriteriaRef.value.searchFields;
    const query = {} as {
      surname?: string;
      given_name?: string;
      event_year?: string;
      village?: string;
      mother_or_spouse?: string;
      brides_parents?: string;
      spouses?: string;
      grooms_parents?: string;
      pageNum: number;
      perPage: number;
    };

    if (surname) {
      query.surname = surname;
    }
    if (given_name) {
      query.given_name = given_name;
    }
    if (event_year) {
      query.event_year = event_year;
    }
    if (village) {
      query.village = village;
    }
    if (mother_or_spouse) {
      query.mother_or_spouse = mother_or_spouse;
    }
    if (brides_parents) {
      query.brides_parents = brides_parents;
    }
    if (spouses) {
      query.spouses = spouses;
    }
    if (grooms_parents) {
      query.grooms_parents = grooms_parents;
    }
  
    query.pageNum = currentPage.value;
    query.perPage = resultsPerPage.value;
    routeParameters.value = query;
    if (pushRoute) {
      router.push({ query });
    }
  }
};

const updateSearchCriteriaFromRouteLublinMarriage = (searchCriteriaRef: Ref, currentPage: Ref<number>, resultsPerPage: Ref<number>, route: RouteLocationNormalizedLoaded) => {
  if (searchCriteriaRef?.value && searchCriteriaRef.value.searchFields) {
    const searchFields = searchCriteriaRef.value.searchFields;

    searchFields.surname = route.query.surname as string || '';
    searchFields.given_name = route.query.given_name as string || '';
    searchFields.event_year = route.query.event_year as string || '';
    searchFields.village = route.query.village as string || '';
    searchFields.mother_or_spouse = route.query.mother_or_spouse as string || '';
    searchFields.brides_parents = route.query.brides_parents as string || '';
    searchFields.spouses = route.query.spouses as string || '';
    searchFields.grooms_parents = route.query.grooms_parents as string || '';

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

const updateRouteParametersLublinDeath = (searchCriteriaRef: Ref, currentPage: Ref, resultsPerPage: Ref, routeParameters: Ref, router: Router, pushRoute: boolean = false) => {
  if (searchCriteriaRef?.value && searchCriteriaRef.value.searchFields) {
    const { surname, given_name, event_year, village, father_or_spouse, mother_or_spouse, spouses } = searchCriteriaRef.value.searchFields;
    const query = {} as {
      surname?: string;
      given_name?: string;
      event_year?: string;
      village?: string;
      father_or_spouse?: string;
      mother_or_spouse?: string;
      spouses?: string;
      pageNum: number;
      perPage: number;
    };

    if (surname) {
      query.surname = surname;
    }
    if (given_name) {
      query.given_name = given_name;
    }
    if (event_year) {
      query.event_year = event_year;
    }
    if (village) {
      query.village = village;
    }
    if (father_or_spouse) {
      query.father_or_spouse = father_or_spouse;
    }
    if (mother_or_spouse) {
      query.mother_or_spouse = mother_or_spouse;
    }
    if (spouses) {
      query.spouses = spouses;
    }

    query.pageNum = currentPage.value;
    query.perPage = resultsPerPage.value;
    routeParameters.value = query;
    if (pushRoute) {
      router.push({ query });
    }
  }
};

const updateSearchCriteriaFromRouteLublinDeath = (searchCriteriaRef: Ref, currentPage: Ref<number>, resultsPerPage: Ref<number>, route: RouteLocationNormalizedLoaded) => {
  if (searchCriteriaRef?.value && searchCriteriaRef.value.searchFields) {
    const searchFields = searchCriteriaRef.value.searchFields;

    searchFields.surname = route.query.surname as string || '';
    searchFields.given_name = route.query.given_name as string || '';
    searchFields.event_year = route.query.event_year as string || '';
    searchFields.village = route.query.village as string || '';
    searchFields.father_or_spouse = route.query.father_or_spouse as string || '';
    searchFields.mother_or_spouse = route.query.mother_or_spouse as string || '';
    searchFields.spouses = route.query.spouses as string || '';
    
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
  updateRouteParametersLublinBirth,
  updateSearchCriteriaFromRouteLublinBirth,
  updateRouteParametersLublinMarriage,
  updateSearchCriteriaFromRouteLublinMarriage,
  updateRouteParametersLublinDeath,
  updateSearchCriteriaFromRouteLublinDeath
};