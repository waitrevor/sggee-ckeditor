import { fetchDataWithRetry } from '../apollo';
import { getUkraineMetaText, findByNameUkraineMap } from './queries'
import {
  UkraineFindQuery,
  UkraineFindQueryVariables,
  MetaTextType,
  Query
} from './OperationsTypes';

const fetchUkraineMetaText = async (): Promise<string> => 
  fetchDataWithRetry<Query, MetaTextType>(getUkraineMetaText, result => result.UkraineMetaText.databaseName);

const fetchUkraineMapByName = async (variables: UkraineFindQueryVariables): Promise<any> => 
  fetchDataWithRetry<UkraineFindQuery, UkraineFindQueryVariables>(findByNameUkraineMap, result => result.UkraineFind, variables);

export {
  fetchUkraineMetaText,
  fetchUkraineMapByName
};
