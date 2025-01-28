import { fetchDataWithRetry } from '../apollo';
import { findByNameMpd, findByIdMpd, getMpdMetaText, findByIdAdditionalMpd } from './queries';
import {
  SearchMpdByNameQuery,
  SearchMpdByNameQueryVariables,
  SearchMpdByIdQuery,
  SearchMpdByIdQueryVariables,
  PaginatedIndividuals,
  Query,
  MetaTextType
} from './OperationsTypes';

export interface SearchCriteria {
  value: string;
  searchType: string;
}

interface MpdVarsOptions {
  surname?: SearchCriteria;
  givenname?: SearchCriteria;
  birthpl?: SearchCriteria;
  deathpl?: SearchCriteria;
  individualId?: string;
  first?: number;
  skip?: number;
}

const isNonEmptyString = (str?: string): boolean => str !== undefined && str !== '';

const addCriteriaIfValid = (criteria: Record<string, SearchCriteria>, key: string, value?: SearchCriteria) => {
  if (value && isNonEmptyString(value.value)) {
    criteria[key] = value;
  }
};

// NOTE: this and the above interface can be removed later if adjusted for new generic constructQueryVars() function found in `api.ts` in the graphql dir
const constructMpdQueryVars = ({ surname, givenname, birthpl, deathpl, individualId, first = 10, skip = 0 }: MpdVarsOptions): any => {
  const version = import.meta.env.VITE_API_VERSION;
  if (individualId) {
    return {
      version: version,
      individualId: individualId,
    } as SearchMpdByIdQueryVariables;
  } else {
    const criteria: Record<string, SearchCriteria> = {};
    addCriteriaIfValid(criteria, 'surname', surname);
    addCriteriaIfValid(criteria, 'givenname', givenname);
    addCriteriaIfValid(criteria, 'birthpl', birthpl);
    addCriteriaIfValid(criteria, 'deathpl', deathpl);

    return {
      version: version,
      criteria: criteria,
      pagination: { first, skip },
    } as SearchMpdByNameQueryVariables;
  }
};

const fetchMpdMetaText = async (): Promise<string> => 
  fetchDataWithRetry<Query, MetaTextType>(getMpdMetaText, result => result.MpdMetaText.databaseName);

const fetchMpdIndividualsByName = async (variables: SearchMpdByNameQueryVariables): Promise<PaginatedIndividuals> => 
  fetchDataWithRetry<SearchMpdByNameQuery, SearchMpdByNameQueryVariables>(findByNameMpd, result => result.MpdIndividualByName, variables);

const fetchMpdIndividualById = async (variables: SearchMpdByIdQueryVariables): Promise<any> => 
  fetchDataWithRetry<SearchMpdByIdQuery, SearchMpdByIdQueryVariables>(findByIdMpd, result => result.MpdIndividualById, variables);


const fetchMpdIndividualByIdAdditional = async (variables: SearchMpdByIdQueryVariables): Promise<any> => 
  fetchDataWithRetry<SearchMpdByIdQuery, SearchMpdByIdQueryVariables>(findByIdAdditionalMpd, result => result.MpdIndividualById, variables);

export {
  constructMpdQueryVars,
  fetchMpdIndividualsByName,
  fetchMpdIndividualById,
  fetchMpdIndividualByIdAdditional,
  fetchMpdMetaText,
};
