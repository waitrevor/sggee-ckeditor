import { Ref } from 'vue';
import { Router } from 'vue-router';
import { constructMpdQueryVars, fetchMpdIndividualById } from './mpd/api';

interface SearchCriteriaFields {
  criteria: { [key: string]: any };
  first?: number;
  skip?: number;
}

const getSearchTypes = (input: Record<string, string>) => {
  const mapping: Record<string, string> = {
    'Case Insensitive': 'ilike',
    'Substring': 'substring',
    'DM': 'dm'
  };
  const result: Record<string, string> = {};
  for (const key in input) {
    if (Object.prototype.hasOwnProperty.call(input, key)) {
      const value = input[key];
      result[key] = mapping[value] || value;
    }
  }
  return result;
};

const constructQueryVars = ({ criteria = {}, first = 10, skip = 0 }: SearchCriteriaFields) => {
  // Remove any criteria that are undefined or null
  const filteredCriteria: { [key: string]: any } = {};
  
  Object.entries(criteria).forEach(([key, val]) => {
      if (key == 'orderByFields' && Array.isArray(val)) {
        const filteredArray = val.filter(item => {
          return item.fieldName !== undefined && item.fieldName !== null && item.fieldName !== '';
        });
        if (filteredArray.length > 0) {
          filteredCriteria[key] = filteredArray; // Keep the array if valid items exist
        }
      }
      else {
        if (val.value !== undefined && val.value !== null && val.value !== '') {
          filteredCriteria[key] = val;
        }
      }
  });

  return {
    version: import.meta.env.VITE_API_VERSION,
    criteria: { ...filteredCriteria },
    pagination: { first, skip }
  };
};

const fetchResults = async <T>(
  searchResults: any,
  numResults: Ref,
  resultsPerPage: Ref,
  currentPage: Ref,
  searchCriteriaRef: Ref,
  routeParameters: Ref,
  router: Router,
  fetchFunction: (vars: T) => Promise<any>,
  key: keyof any
) => {
  searchResults.running = true;
  router.push({ query: routeParameters.value });
  
  if (searchCriteriaRef.value.searchFields.individualId) {
    // NOTE: this is only for MPD (when ID is being used)
    const vars = constructMpdQueryVars({ individualId: searchCriteriaRef.value.searchFields.individualId });
    searchResults.data = [await fetchMpdIndividualById(vars )];
    numResults.value = searchResults.data.length;
  }
  else {
    const criteria: Record<string, any> = {};
    const searchTypes = getSearchTypes(searchCriteriaRef.value.selectedSearchTypes);
    for (const fieldName in searchCriteriaRef.value.searchFields) {
      if (Object.prototype.hasOwnProperty.call(searchCriteriaRef.value.searchFields, fieldName)) {
        criteria[fieldName] = {
          value: searchCriteriaRef.value.searchFields[fieldName],
          searchType: searchTypes[fieldName]
        };
      }
    }

    // Add order by fields for Sorting
    criteria.orderByFields = searchCriteriaRef.value.selectedFields.map((field: any, index: any) => ({
      fieldName: field,
      order: searchCriteriaRef.value.sortOrders[index] || 'ASC', // Add the corresponding sort order or default to 'DESC'
    }));

    const vars = constructQueryVars({
      criteria,
      first: resultsPerPage.value,
      skip: (currentPage.value - 1) * resultsPerPage.value
    });
    
    const result = await fetchFunction(vars as T);
    numResults.value = result.pageInfo.totalCount;
    searchResults.data = result[key] || [];
  }
  searchResults.hasPerformedSearch = true;
};

export {
  constructQueryVars,
  fetchResults
};
